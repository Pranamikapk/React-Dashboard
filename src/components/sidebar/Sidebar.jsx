import React from "react";
import { Sheet, SheetContent } from "../ui/Sheet";
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./SidebarProvider";
import { SidebarTrigger } from "./SidebarTrigger";

export const Sidebar = React.forwardRef(
  ({ side = "left", variant = "sidebar", collapsible = "offcanvas", className = "", children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <aside
          ref={ref}
          className={`flex h-screen w-[var(--sidebar-width)] shrink-0 flex-col border-r border-sidebar-border/60 bg-sidebar text-sidebar-foreground ${className}`}
          data-state={state}
          data-variant={variant}
          data-side={side}
          {...props}
        >
          {children}
        </aside>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className={`w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground shadow-2xl [&>button]:hidden ${className}`}
            style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

   return (
  <>
    {/* Spacer to reserve layout width */}
    <div
      className={`
        hidden
        md:block
        shrink-0
        transition-all
        duration-300
        ease-in-out
        ${
          state === "collapsed"
            ? "w-[var(--sidebar-width-icon)]"
            : "w-[var(--sidebar-width)]"
        }
      `}
    />

    {/* Fixed Sidebar */}
    <aside
      ref={ref}
      className={`
        fixed
        top-0
        left-0
        z-40
        hidden
        h-screen
        bg-sidebar
        text-sidebar-foreground
        border-r
        border-sidebar-border/60
        shadow-sm
        transition-all
        duration-300
        ease-in-out
        md:flex
        ${
          state === "collapsed"
            ? "w-[var(--sidebar-width-icon)]"
            : "w-[var(--sidebar-width)]"
        }
        ${className}
      `}
      data-state={state}
      data-collapsible={state === "collapsed" ? "icon" : "expanded"}
      data-variant={variant}
      data-side={side}
      {...props}
    >
      {/* Always-visible collapse button */}
      <div className="absolute -right-3 top-5 z-50">
        <SidebarTrigger />
      </div>

      {/* Sidebar Content */}
      <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </aside>
  </>
);
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
