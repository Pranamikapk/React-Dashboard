import React from "react"

const SidebarGroupContent = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={`w-full text-sm ${className}`}
      {...props}
    />
  )
})

export default SidebarGroupContent