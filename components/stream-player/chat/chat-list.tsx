"use client";
import React from "react";

import { ReceivedChatMessage } from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";

import ChatMessage from "./chat-message";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = (props: ChatListProps) => {
  const { messages, isHidden } = props;
  if (isHidden || !messages || !messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>{isHidden ? "Chat is disabled" : "Welcome to chat!"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => {
        return <ChatMessage key={message.timestamp} data={message} />;
      })}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};