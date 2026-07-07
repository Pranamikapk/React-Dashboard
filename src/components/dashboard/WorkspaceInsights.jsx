import { CheckCircle2 } from "lucide-react"

const BAR_COLOR = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
}

const HEALTH_STYLES = {
  Excellent: "bg-emerald-500/10 text-emerald-600",
  Good: "bg-blue-500/10 text-blue-600",
  "Needs Attention": "bg-amber-500/10 text-amber-600",
}

/**
 * @param {string} health - "Excellent" | "Good" | "Needs Attention"
 * @param {Array<{label: string, value: number, accent: keyof BAR_COLOR}>} metrics - value is 0-100
 */
const WorkspaceInsights = ({ health = "Excellent", metrics }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Workspace Health</span>
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${HEALTH_STYLES[health] ?? HEALTH_STYLES.Good}`}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          {health}
        </span>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="dashboard-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium">{metric.label}</span>
              <span className="text-muted-foreground">{metric.value}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${BAR_COLOR[metric.accent] ?? BAR_COLOR.blue} transition-all duration-700 ease-out`}
                style={{ width: `${Math.min(100, Math.max(0, metric.value))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkspaceInsights