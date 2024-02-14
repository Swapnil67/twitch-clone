"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import React from "react";

interface FollowingProps {
  data: (Follow & { following: User })[];
}

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state)

  if(!data.length) {
    return null
  }

  return (
    <div>
      {
        !collapsed && (
          <div className="pl-6 mb-4">
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        )
      }
    </div>
  )
};

export default Following;
