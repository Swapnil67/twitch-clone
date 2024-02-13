"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserAvatar from "@/components/user-avatar";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive: boolean;
}

const UserItem = (props: UserItemProps) => {
  const { username, imageUrl, isLive } = props;

  const pathname = usePathname();

  const { collapsed } = useSidebar((state) => state);

  const href = `/${username}`;

  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            username={username}
            imageUrl={imageUrl}
            isLive={true}
            showBadge
          />
          <p>{username}</p>
        </div>
      </Link>
    </Button>
  );
};

export default UserItem;
