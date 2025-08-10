import { PanelLeft } from 'lucide-react'
import React from "react"
import Button from "../ui/Button"
import { useSidebar } from "./SidebarProvider"

export const SidebarTrigger = React.forwardRef(({ className = "", onClick, ...props },
    ref) => {
    const { toggleSidebar } = useSidebar()
    return (
        <Button
            ref={ref}
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className={`h-7 w-7 ${className}`}
            onClick={(event) => {
                onClick?.(event)
                toggleSidebar()
            }}
            {...props}
        >
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}
)


