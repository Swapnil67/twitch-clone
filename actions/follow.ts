"use server";

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);
    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return { status: true, followedUser };
  } catch (err: any) {
    console.log("onFollow Error: ", err);

    let msg = "Internal Error";
    if(err.message) msg = err.message;
    return { status: false, msg }
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const unFollowedUser = await unFollowUser(id);
    revalidatePath("/");

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`);
    }

    return { status: true, unFollowedUser };
  } catch (err: any) {
    console.log("onUnFollow Error: ", err);
    
    let msg = "Internal Error";
    if(err.message) msg = err.message;
    return { status: false, msg }
  }
};
