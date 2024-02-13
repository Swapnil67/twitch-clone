"use client";

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


  const onClick = () => {
    if(isFollowing) {
      handleUnfollow()
    }
    else {
      handleFollow();
    }
  }

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
};

export default Actions;
