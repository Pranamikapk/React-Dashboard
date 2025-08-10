import React from "react"

const SidebarGroup = React.forwardRef(({ className= "", ...props},ref) => {
  return (
    <div
        ref={ref}
        data-sidebar="group"
        className={`relative flex w-full min-w-0 flex-col p-2 
             ${className}`}
        {...props}
    />
  )
})

export default SidebarGroup