import React from "react";

const SidebarHeader = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={`flex items-center justify-between gap-2 p-2 transition-all duration-300 ${className}`}
      {...props}
    />
  );
});

SidebarHeader.displayName = "SidebarHeader";

export default SidebarHeader;