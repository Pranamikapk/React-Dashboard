import React from "react";

const SidebarContent = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={`flex min-h-0 flex-1 flex-col gap-2 overflow-auto transition-all duration-300 ${className}`}
      {...props}
    />
  );
});

SidebarContent.displayName = "SidebarContent";

export default SidebarContent;