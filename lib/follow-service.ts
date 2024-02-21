import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import console from "console";

/**
 * Returns the list of users following you
 * @param id
 */
export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();
    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true
              }
            }
          }
        },
      },
    });
    return followedUsers;
  } catch (err) {
    console.log("getFollowedUsers err ", err);
    return [];
  }
};

/**
 * Check if we are following the other user
 * @param id
 * @returns
 */
export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  // * Check if user exists
  const otherUser = await db.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }

  // * Check if trying to follow self
  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }

  // * Check if already following
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  // * Follow the user [Create the follow row]
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};

export const unFollowUser = async (id: string) => {
  const self = await getSelf();

  // * Check if user exists
  const otherUser = await db.user.findUnique({
    where: { id },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }

  // * Check if trying to follow self
  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }

  // * Check if already following
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  // * Unfollow the user [delete the follow row]
  const unfollow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return unfollow;
};
