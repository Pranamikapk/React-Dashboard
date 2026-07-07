import { ArrowUpRight } from "lucide-react"

const GRADIENT = {
  blue: "from-blue-500/10 via-blue-500/5",
  emerald: "from-emerald-500/10 via-emerald-500/5",
  purple: "from-purple-500/10 via-purple-500/5",
  amber: "from-amber-500/10 via-amber-500/5",
}

const ICON_COLOR = {
  blue: "text-blue-600 bg-blue-500/10",
  emerald: "text-emerald-600 bg-emerald-500/10",
  purple: "text-purple-600 bg-purple-500/10",
  amber: "text-amber-600 bg-amber-500/10",
}

/**
 * @param {Array<{icon: React.ComponentType, title: string, description: string, accent: keyof GRADIENT, onClick?: () => void}>} actions
 */
const QuickActions = ({ actions }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {actions.map((action, index) => (
        <button
          key={action.title}
          type="button"
          onClick={action.onClick}
          style={{ animationDelay: `${index * 60}ms` }}
          className={`dashboard-fade-in group relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br ${GRADIENT[action.accent] ?? GRADIENT.blue} to-transparent p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        >
          <div className="flex items-start justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${ICON_COLOR[action.accent] ?? ICON_COLOR.blue}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          </div>
          <div className="mt-3">
            <div className="font-semibold leading-tight">{action.title}</div>
            <div className="mt-0.5 text-sm text-muted-foreground">{action.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default QuickActions