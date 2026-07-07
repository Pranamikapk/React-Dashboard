import { ChevronDown } from 'lucide-react'
import { createContext, useContext, useEffect, useState } from 'react'

const SelectContext = createContext()

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")
  
  useEffect(() => {
    setSelectedValue(value || "")
  }, [value])

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider value={{ 
      isOpen, 
      setIsOpen, 
      selectedValue, 
      handleValueChange 
    }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = ({ children, className = "", ...props }) => {
  const { isOpen, setIsOpen } = useContext(SelectContext)
  
  return (
    <button 
      type='button'
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

const SelectValue = ({ placeholder }) => {
  const { selectedValue } = useContext(SelectContext)
  return <span>{selectedValue || placeholder}</span>
}

const SelectContent = ({ children, className = "" }) => {
  const { isOpen } = useContext(SelectContext)
  if (!isOpen) return null

  return (
    <div
      role="listbox"
      className={[
        "absolute left-0 top-full z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border",
        "shadow-2xl ring-1 ring-black/5",
        // Opaque enough to hide text behind, with nice blur
        "bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
        "backdrop-saturate-150",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

const SelectItem = ({ children, value, className = "" }) => {
  const { handleValueChange, selectedValue } = useContext(SelectContext)
  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      data-selected={isSelected}
      className={[
        "relative flex w-full items-center gap-2 rounded-sm py-2 pl-8 pr-3 text-sm",
        "transition-colors duration-150 outline-none",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground",
        "active:bg-muted/80",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        className,
      ].join(" ")}
      onClick={() => handleValueChange(value)}
    >
      {/* Selected dot indicator */}
      {isSelected && <span className="absolute left-2 h-1.5 w-1.5 rounded-full bg-primary" />}
      {children}
    </button>
  )
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
}

