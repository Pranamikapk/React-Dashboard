import React from "react"

const SidebarMenu = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu"
      className={`flex w-full min-w-0 flex-col gap-1  ${className}`}
      {...props}
    />
  )
})

export default SidebarMenu