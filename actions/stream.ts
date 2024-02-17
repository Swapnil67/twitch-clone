'use server'


import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { getSelf } from "@/lib/auth-service"
import { Stream } from "@prisma/client"


export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: { userId: self.id }
    })

    if(!selfStream) {
      return { status: false, message: 'Stream not found' };
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id
      },
      data: {
        ...validData
      }
    })

    revalidatePath(`/u/${self.username}/chat`)
    revalidatePath(`/u/${self.username}`)
    revalidatePath(`/${self.username}`)

    return { status: true, message: 'Stream updated', stream };
  } catch (err: any) {
    console.log("updateStream Error: ", err);

    let msg = "Internal Error";
    if(err.message) msg = err.message;
    return { status: false, msg }
  }
}