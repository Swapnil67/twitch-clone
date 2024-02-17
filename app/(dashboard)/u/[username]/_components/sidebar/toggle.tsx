'use client'
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";

const Toggle = () => {
  const { collapsed, onExpand, onCollapase } = useCreatorSidebar(
    (state) => state
  );
  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button className="h-auto p-2" variant="ghost" onClick={onExpand}>
              <ArrowRightFromLine className="app-icon-xs" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="text-primary font-semibold">For You</p>
          <Hint label={label} side="right" asChild>
            <Button
              variant="ghost"
              onClick={onCollapase}
              className="h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className="app-icon-xs" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
