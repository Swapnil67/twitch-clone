import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  aligh?: "start" | "center" | "end";
}

export const Hint = (props: HintProps) => {
  const { label, children, asChild, side, aligh } = props;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={aligh}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
