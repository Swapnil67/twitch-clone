import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";
import { Hint } from "../hint";
import { Button } from "../ui/button";

const ChatToggle = () => {
  const { collapsed, onExpand, onCollapase } = useChatSidebar((state) => state);
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapase();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="app-icon-xs" />
      </Button>
    </Hint>
  );
};

export default ChatToggle;
