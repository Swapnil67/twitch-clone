import React from "react";

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "@/components/hint";

interface FullscreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

const FullscreenControl = (props: FullscreenControlProps) => {
  const { isFullScreen, onToggle } = props;
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit fullscreen" : "Enter fullscreen";
  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="app-icon-sm" />
        </button>
      </Hint>
    </div>
  );
};

export default FullscreenControl;
