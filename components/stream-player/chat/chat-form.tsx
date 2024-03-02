import React, { FormEvent, useState } from "react";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import ChatInfo from "./chat.info";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
  isFollowersOnly: boolean;
}

const ChatForm = (props: ChatFormProps) => {
  const {
    value,
    onSubmit,
    onChange,
    isHidden,
    isDelayed,
    isFollowersOnly,
    isFollowing,
  } = props;

  const [isDelayBlocked, setIsDelayedBlocked] = useState(false);
  const isFolowersOnlyNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayBlocked || isFolowersOnlyNotFollowing;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return false;

    if (isDelayed && isDelayBlocked) {
      // * Delay the chat
      setIsDelayedBlocked(true);
      setTimeout(() => {
        setIsDelayedBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  // if (isHidden) {
  //   return null;
  // }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            isFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button
          size={"sm"}
          type="submit"
          variant={"primary"}
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  <div className="flex flex-col items-center gap-y-4 p-3">
    <Skeleton className="w-full h-10" />
    <div className="flex items-center gap-x-2 ml-auto">
      <Skeleton className="app-icon-lg" />
      <Skeleton className="h-7 w-12" />
    </div>
  </div>;
};

export default ChatForm;
