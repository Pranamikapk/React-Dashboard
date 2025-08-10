import React from "react"

const SidebarContent = React.forwardRef(({ className= "", ...props},ref) => {
  return (
    <div
        ref={ref}
        data-sidebar="content"
        className={`flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden
             ${className}`}
        {...props}
    />
  )
})

export default SidebarContent