import React, { useMemo } from "react";
import { Hint } from "../../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

const ChatInfo = (props: ChatInfoProps) => {
  const { isDelayed, isFollowersOnly } = props;

  const hint = useMemo(() => {
    if (isDelayed && isFollowersOnly) {
      return "Only followers can chat. Messages are delayed by 3 seconds";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }

    if (!isDelayed && isFollowersOnly) {
      return "Only followers can chat";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isDelayed && isFollowersOnly) {
      return "Followers Only.";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Slow Mode";
    }

    if (!isDelayed && isFollowersOnly) {
      return "Followers only and slow mode";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-3 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="app-icon-xs" />
      </Hint>
        <p className="text-xs text-semibold">{label}</p>
    </div>
  );
};

export default ChatInfo;
