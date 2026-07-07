import React from "react";

const SidebarGroupLabel = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group-label"
      className={`flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-all duration-300 ease-linear focus-visible:ring-2 ${className}`}
      {...props}
    />
  );
});

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export default SidebarGroupLabel;