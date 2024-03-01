"use client";
import { useEffect, useMemo, useState } from "react";

import { useMediaQuery } from "usehooks-ts";

import { ConnectionState } from "livekit-client";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import ChatHeader from "./chat-header";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import ChatForm from "./chat-form";


interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = (props: ChatProps) => {
  const {
    hostName,
    viewerName,
    isFollowing,
    hostIdentity,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
  } = props;
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  // * Auto adjust the chat sidebar (responsiveness)
  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reverserdMessages = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;
    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      { variant === ChatVariant.CHAT && (
        <ChatForm
          value={value}
          onSubmit={onSubmit}
          onChange={onChange}
          isHidden={isHidden}
          isDelayed={isChatDelayed}
          isFollowing={isFollowing}
          isFollowersOnly={isChatFollowersOnly}
        />
      ) }
      {
        variant === ChatVariant.COMMUNITY && (
          <p>Community</p>
        )
      }
    </div>
  );
};

export default Chat;
