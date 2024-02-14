"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

const Actions = ({ userId, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
      const follow = await onFollow(userId);
      const { status } = follow;
      if (status) {
        toast.success(
          `You are now following ${follow.followedUser?.following.username}`
        );
      } else {
        toast.error(follow.msg);
      }
    });
  };

  const handleUnfollow = () => {
    startTransition(async () => {
      const follow = await onUnFollow(userId);
      const { status } = follow;
      if (status) {
        toast.success(
          `You have unfollowed ${follow.unFollowedUser?.following.username}`
        );
      } else {
        toast.error(follow.msg);
      }
    });
  };

  const handleBlock = () => {
    startTransition(async () => {
      const block = await onBlock(userId);
      const { status } = block;
      if (status) {
        toast.success(
          `Blocked the user ${block.blockedkUser?.blocked.username}`
        );
      } else {
        toast.error(block.msg);
      }
    });
  };

  const handleUnblock = () => {
    startTransition(async () => {
      const unblock = await onUnblock(userId);
      const { status } = unblock;
      if (status) {
        toast.success(
          `Unblocked the user ${unblock.unBlockedkUser?.blocked.username}`
        );
      } else {
        toast.error(unblock.msg);
      }
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      {/* <Button disabled={isPending} onClick={handleBlock}>Block</Button> */}
      <Button disabled={isPending} onClick={handleUnblock}>Unblock</Button>
    </>
  );
};

export default Actions;
