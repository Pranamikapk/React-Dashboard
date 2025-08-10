import React from "react"

const SidebarHeader = React.forwardRef(({ className= "", ...props},ref) => {
  return (
    <div
        ref={ref}
        data-sidebar="header"
        className={`flex flex-col gap-2 p-2 ${className}`}
        {...props}
    />
  )
})

export default SidebarHeader