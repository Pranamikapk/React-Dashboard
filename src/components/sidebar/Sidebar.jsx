import React from "react"
import { Sheet, SheetContent } from "../ui/Sheet"
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./SidebarProvider"

export const Sidebar = React.forwardRef(({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className = "",
    children,
    ...props
}, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
        return (
            <div className={`flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        )
    }

    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                <SheetContent
                    data-sidebar="sidebar"
                    data-mobile="true"
                    className={`w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden ${className}`}
                    style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
                    side={side}
                >
                    <div className="flex h-full w-full flex-col">{children}</div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div
            ref={ref}
            className={`group peer hidden md:block text-sidebar-foreground ${className}`}
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
            >
            <div className="duration-200 relative h-screen w-[--sidebar-width] bg-transparent transition-[width] ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180" />
            <div className="duration-200 fixed inset-y-0 z-10 hidden h-screen w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l">
                <div
                data-sidebar="sidebar"
                className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
                >
                {children}
                </div>
            </div>
        </div>
    )
})

export default Sidebar