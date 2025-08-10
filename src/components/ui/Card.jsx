import React from "react"

const Card = React.forwardRef(({ className = "", ...props }, ref) => (
    <div
        ref={ref}
        className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
        {...props}
    />
))

const CardHeader = React.forwardRef(({ className = "", ...props }, ref) => (
    <div
        ref={ref}
        className={`flex flex-col space-y-1.5 p-6 ${className}`}
        {...props}
    />
))

const CardTitle = React.forwardRef(({ className = "", ...props }, ref) => (
    <div
        ref={ref}
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
        {...props}
    />
))

const CardDescription = React.forwardRef(({ className = "", ...props }, ref) => (
    <div
        ref={ref}
        className={`ext-sm text-muted-foreground  ${className}`}
        {...props}
    />
))

const CardContent = React.forwardRef(({ className = "", ...props }, ref) => (
    <div
        ref={ref}
        className={`p-6 pt-0  ${className}`}
        {...props}
    />
))

const CardFooter = React.forwardRef(({ className = "", ...props }, ref) => (
    <div
        ref={ref}
        className={`flex items-center p-6 pt-0  ${className}`}
        {...props}
    />
))

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }

