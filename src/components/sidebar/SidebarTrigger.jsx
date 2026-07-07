import { ChevronLeft, ChevronRight, PanelLeftClose } from "lucide-react";
import React from "react";
import Button from "../ui/Button";
import { useSidebar } from "./SidebarProvider";

export const SidebarTrigger = React.forwardRef(({ className = "", onClick, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
  ref={ref}
  variant="ghost"
  size="icon"
  onClick={(e) => {
    onClick?.(e);
    toggleSidebar();
  }}
  className="
    h-7
    w-7
    rounded-full
    border
    border-border
    bg-background
    shadow-md
    transition-all
    hover:bg-accent
  "
  {...props}
>
 <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border">
  {state === "expanded" ? (
    <ChevronLeft className="h-3.5 w-3.5" />
  ) : (
    <ChevronRight className="h-3.5 w-3.5" />
  )}
</span>
</Button>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";


