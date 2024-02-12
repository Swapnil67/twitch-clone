"use client";

import { User } from "@prisma/client";
import React from "react";

import { useSidebar } from "@/store/use-sidebar";
import UserItem from "./user-item";
import { UserItemSkeleton } from "@/components/user-avatar";

interface RecommendedProps {
  data: User[];
}

const Recommended = (props: RecommendedProps) => {
  const { data } = props;

  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={true}
            key={user.id}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {
        [...Array(3)].map((_,i) => (
          <UserItemSkeleton key={i} />
        ))
      }
    </ul>
  )
}


export default Recommended;
