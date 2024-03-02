"use client";
import React from "react";

import { ReceivedChatMessage } from "@livekit/components-react";

import { stringToColor } from "@/lib/utils";

import { format } from "date-fns";

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { data } = props;
  const color = stringToColor(data.from?.name || "");

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-sm text-white.40">{format(data.timestamp, "HH:MM")}</p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
          :
        </p>
        <div className="text-sm break-all">{data.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
