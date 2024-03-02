import React, { useTransition } from "react";
import { toast } from "sonner";

import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

const CommunityItem = (props: CommunityItemProps) => {
  const { hostName, viewerName, participantName, participantIdentity } = props;

  // ** Hooks
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");

  const isSelf = viewerName === participantName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(async () => {
      const block = await onBlock(participantIdentity);
      const { status } = block;
      if (status) {
        toast.success(`Blocked the user ${participantName}`);
      } else {
        toast.error(block.msg);
      }
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {/* {isHost && !isSelf && ( */}
        <Hint label="Block">
          <Button
          variant='ghost'
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="app-icon-xs text-muted-foreground" />
          </Button>
        </Hint>
      {/* )} */}
    </div>
  );
};

export default CommunityItem;
