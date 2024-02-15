import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import React from "react";
import Actions from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = params;

  const user = await getUserByUsername(username);
  if (!user) {
    notFound();
  }
  
  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id);

  return (
    <div className="flex flex-col gap-y-4 p-5">
      <p>userId: {user.id}</p>
      <p>username: {user.username}</p>
      <p>Is following: {`${isFollowing}`}</p>
      <p>Is Blocked by {username}: {`${isBlocked}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
