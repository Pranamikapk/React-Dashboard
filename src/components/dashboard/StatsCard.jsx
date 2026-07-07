import { ArrowDownRight, ArrowUpRight } from "lucide-react"

// Central palette so every KPI card, badge, and chart in the dashboard
// draws from the same semantic colors.
export const ACCENT = {
  blue: {
    border: "border-l-blue-500",
    icon: "text-blue-600",
    iconBg: "bg-blue-500/10",
    trendUp: "text-blue-600 bg-blue-500/10",
  },
  emerald: {
    border: "border-l-emerald-500",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
    trendUp: "text-emerald-600 bg-emerald-500/10",
  },
  purple: {
    border: "border-l-purple-500",
    icon: "text-purple-600",
    iconBg: "bg-purple-500/10",
    trendUp: "text-purple-600 bg-purple-500/10",
  },
  amber: {
    border: "border-l-amber-500",
    icon: "text-amber-600",
    iconBg: "bg-amber-500/10",
    trendUp: "text-amber-600 bg-amber-500/10",
  },
  rose: {
    border: "border-l-rose-500",
    icon: "text-rose-600",
    iconBg: "bg-rose-500/10",
    trendUp: "text-rose-600 bg-rose-500/10",
  },
  slate: {
    border: "border-l-slate-400",
    icon: "text-slate-600",
    iconBg: "bg-slate-500/10",
    trendUp: "text-slate-600 bg-slate-500/10",
  },
}

/**
 * @param {string} title
 * @param {string|number} value
 * @param {React.ComponentType} icon - lucide icon component
 * @param {keyof ACCENT} accent
 * @param {string} [change] - e.g. "+12%"
 * @param {"up"|"down"|null} [trend]
 * @param {number} [progress] - optional 0-100 mini progress bar under the value
 * @param {number} [delay] - animation delay in ms for stagger
 */
const StatsCard = ({ title, value, icon: Icon, accent = "blue", change, trend, progress, delay = 0 }) => {
  const colors = ACCENT[accent] ?? ACCENT.blue
  const TrendIcon = trend === "down" ? ArrowDownRight : ArrowUpRight

  return (
    <div
      className={`dashboard-fade-in group relative overflow-hidden rounded-xl border border-l-4 border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 ${colors.border}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`h-4 w-4 ${colors.icon}`} />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
        {change && (
          <span className={`mb-0.5 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${trend === "down" ? "bg-rose-500/10 text-rose-600" : colors.trendUp}`}>
            <TrendIcon className="h-3 w-3" />
            {change}
          </span>
        )}
      </div>

      {typeof progress === "number" && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${colors.icon.replace("text-", "bg-")} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default StatsCard