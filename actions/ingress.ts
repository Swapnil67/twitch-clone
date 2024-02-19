"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import {
  IngressAudioEncodingPreset,
  IngressInfo,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  IngressInput,
  type CreateIngressOptions,
  IngressVideoOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models_pb";
import { revalidatePath } from "next/cache";

const livekitHost = process.env.LIVEKIT_API_URL!;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!;

const roomService = new RoomServiceClient(
  livekitHost,
  LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(
  livekitHost,
  LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET
);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  // * Remove all previous ingresses and rooms
  await resetIngresses(self.id);

  // const options: CreateIngressOptions = {
  //   name: self.username,
  //   roomName: self.id,
  //   participantName: self.username,
  //   participantIdentity: self.id,
  // };
  const commonIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  let ingressOptions = {};

  if (ingressType === IngressInput.WHIP_INPUT) {
    // * This means that the audio and video media sent by the WHIP encoder will be forwarded unmodified to the LiveKit clients
    ingressOptions = {
      ...commonIngressOptions,
      bypassTranscoding: true,
    };
    // options.bypassTranscoding = true;
  } else {
    ingressOptions = {
      ...commonIngressOptions,
      video: {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
      audio: {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      },
    };
  }

  const ingress = await ingressClient.createIngress(
    ingressType,
    ingressOptions
  );
  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });
  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
};
