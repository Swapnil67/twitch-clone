import { db } from "@/lib/db";
import { headers } from "next/headers";
import { WebhookReceiver } from 'livekit-server-sdk';
import { NextResponse } from "next/server";


const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!

const receiver = new WebhookReceiver(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization")

  if(!authorization) {
    return new NextResponse('No authorization header', { status: 400 })
  }

  const event = await receiver.receive(body, authorization);
  console.log("event: ", event);
  
  
  if(event.event == 'ingress_started') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      },
      data: {
        isLive: true
      }
    })
  }

  if(event.event == 'ingress_ended') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId
      },
      data: {
        isLive: false
      }
    })
  }

  return new NextResponse('ok', { status: 200 })

}
