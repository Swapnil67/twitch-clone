import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

/**
 * Checks if user is blocked by any specific user
 * @param id
 */
export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    // * Cannot block yourself [return false]
    if (otherUser.id === self.id) {
      return false;
    }

    // * Check if blocked in db
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });
    return !!existingBlock;
  } catch (err) {
    return false;
  }
};

/**
 * Block the user
 * @param id 
 * @returns 
 */
export const blockUser = async (id: string) => {
  try {
    const self = await getSelf();
    if (id === self.id) {
      throw new Error("Cannot block yourself");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    // * Check if already blocked
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (existingBlock) {
      throw new Error("Already Blocked");
    }

    const block = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
      include: {
        blocked: true,
      },
    });

    return block;
  } catch (err) {
    console.log("blockUser Error ", err);
    throw err;
  }
};


/**
 * Un-block the user
 * @param id 
 * @returns 
 */
export const unBlockUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (id === self.id) {
      throw new Error("Cannot unblock yourself");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    // * Check if already blocked
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (!existingBlock) {
      throw new Error("Not Blocked");
    }

    const unblock = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocked: true,
      },
    });

    return unblock;
  } catch (err) {
    throw err;
  }
};
