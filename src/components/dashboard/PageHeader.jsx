import { Calendar } from "lucide-react"

const today = new Date()
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
})

/**
 * Hero-style page header used at the top of every dashboard section.
 *
 * @param {string} title - Large headline, e.g. "Good morning 👋" or "Tasks"
 * @param {string} subtitle - Muted supporting line
 * @param {React.ReactNode} actions - Buttons rendered on the right (desktop) / below (mobile)
 * @param {boolean} showDate - Whether to show the "Today · <date>" chip
 */
const PageHeader = ({ title, subtitle, actions, showDate = true }) => {
  return (
    <div className="dashboard-fade-in flex flex-col gap-5 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        {showDate && (
          <div className="flex items-center gap-1.5 pt-1 text-xs font-medium text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Today · {formattedDate}
          </div>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageHeader