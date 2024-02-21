"use server";

import { v4 as uuidv4 } from 'uuid';

import { getUserById } from "@/lib/user-service";
import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { AccessToken } from 'livekit-server-sdk';

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch (err) {
    // * For Guest (Logged Out) Users
    const id = uuidv4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }
  
  // * Check the host
  const host = await getUserById(hostIdentity);
  if (!host) {
    throw new Error("User not found");
  }

  // * Check if user is blocked
  const isBlocked = await isBlockedByUser(hostIdentity);
  if (isBlocked) {
    throw new Error("User is blocked");
  }

  // * Check is host viewing his own stream
  const isHost = self.id === hostIdentity;

  // * Livekit tokens
  const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!;
  const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!;

  // * Create a access token from livekit
  const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: isHost ? `host-${self.id}` : self.id,
    name: self.username,
    ttl: '10m',
  });


  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await token.toJwt();
  // return await Promise.resolve(token.toJwt());
};
