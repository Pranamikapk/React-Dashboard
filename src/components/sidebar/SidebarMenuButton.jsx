import React from "react";

const SidebarMenuButton = React.forwardRef(
  ({ isActive = false, variant = "default", size = "default", className = "", children, showLabel = true, title, ...props }, ref) => {
    const baseClasses =
      "peer/menu-button flex w-full items-center justify-start gap-2 overflow-hidden rounded-xl p-2.5 text-left text-sm outline-none transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

    const variantClasses = {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
    };

    const sizeClasses = {
      default: "h-10 text-sm",
      sm: "h-8 text-xs",
      lg: "h-12 text-sm",
    };

    return (
      <button
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${showLabel ? "justify-start" : "justify-center px-2"} ${className}`}
        title={title}
        {...props}
      >
        {children}
      </button>
    );
  },
);

SidebarMenuButton.displayName = "SidebarMenuButton";

export default SidebarMenuButton;