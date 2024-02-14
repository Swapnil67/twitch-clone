'use server'
import { blockUser, unBlockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  try {
    // TODO adapt to disconnect from live stream
    // TODO allow ability to kick the guest
    console.log("Block the user");
    
    const blockedkUser = await blockUser(id);
    if (blockedkUser) {
      revalidatePath(`/${blockedkUser.blocked.username}`);
    }
    return { status: true, blockedkUser };
  } catch (err: any) {
    console.log("onBlock Error: ", err);
    let msg = "Internal Error";
    if (err.message) msg = err.message;
    return { status: false, msg };
  }
};

export const onUnblock = async (id: string) => {
  try {
    const unBlockedkUser = await unBlockUser(id);
    if (unBlockedkUser) {
      revalidatePath(`/${unBlockedkUser.blocked.username}`);
    }

    return { status: true, unBlockedkUser };
  } catch (err: any) {
    console.log("onFollow Error: ", err);

    let msg = "Internal Error";
    if (err.message) msg = err.message;
    return { status: false, msg };
  }
};
