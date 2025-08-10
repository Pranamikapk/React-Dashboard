import React from "react"

const SidebarMenuItem = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-item"
      className={`group/menu-item relative  ${className}`}
      {...props}
    />
  )
})

export default SidebarMenuItem