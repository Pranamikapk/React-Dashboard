import {
  Activity,
  BarChart3,
  CheckSquare,
  FileText,
  Plus,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react"
import Button from "../ui/Button"
import PageHeader from "../dashboard/PageHeader"
import StatsCard from "../dashboard/StatsCard"
import ProgressRing from "../dashboard/ProgressRing"
import ActivityTimeline from "../dashboard/ActivityTimeline"
import WorkspaceInsights from "../dashboard/WorkspaceInsights"
import QuickActions from "../dashboard/QuickActions"

const stats = [
  { title: "Total Users", value: "10", icon: Users, accent: "blue", change: "+2 this week", trend: "up" },
  { title: "Active Tasks", value: "24", icon: CheckSquare, accent: "emerald", change: "+12%", trend: "up" },
  { title: "Data Points", value: "156", icon: BarChart3, accent: "purple", change: "+8%", trend: "up" },
  { title: "Growth Rate", value: "+12%", icon: TrendingUp, accent: "amber", change: "+3.1%", trend: "up" },
]

const performanceMetrics = [
  { label: "Tasks completed", value: "18 / 24", accent: "text-emerald-600 bg-emerald-500/10" },
  { label: "Avg. response time", value: "1.2h", accent: "text-blue-600 bg-blue-500/10" },
  { label: "Active sessions", value: "37", accent: "text-purple-600 bg-purple-500/10" },
]

const quickActions = [
  { icon: Plus, title: "Create Task", description: "Add a new task to your board", accent: "emerald", target: "tasks" },
  { icon: UserPlus, title: "Invite User", description: "Bring a teammate into the workspace", accent: "blue", target: "users" },
  { icon: FileText, title: "Generate Report", description: "Export a summary as PDF", accent: "purple", target: "charts" },
  { icon: BarChart3, title: "View Analytics", description: "Dive into detailed charts", accent: "amber", target: "charts" },
]

const recentActivities = [
  { icon: Users, title: "New user registered", time: "2 minutes ago", accent: "blue", badge: "User" },
  { icon: CheckSquare, title: "Task completed: Update dependencies", time: "5 minutes ago", accent: "emerald", badge: "Task" },
  { icon: Activity, title: "Data updated across 3 dashboards", time: "10 minutes ago", accent: "purple" },
  { icon: FileText, title: "Report generated for Q1 review", time: "15 minutes ago", accent: "amber", badge: "Report" },
]

const workspaceMetrics = [
  { label: "Active Users", value: 92, accent: "blue" },
  { label: "Tasks Completed", value: 75, accent: "emerald" },
  { label: "Productivity", value: 88, accent: "purple" },
  { label: "Response Time", value: 80, accent: "amber" },
]

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

const OverviewSection = ({ onNavigate }) => {
  const handleQuickAction = (target) => {
    onNavigate?.(target);
  };

  return (
    <div className="space-y-8">
      <style>{`
        @keyframes dashboardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-fade-in {
          opacity: 0;
          animation: dashboardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <PageHeader
        title={`${getGreeting()} 👋`}
        subtitle="Here is a compact view of your workspace momentum and current priorities."
        actions={
          <>
            {/* <Button variant="outline" className="gap-2" onClick={() => onNavigate?.("users")}>
              <UserPlus className="h-4 w-4" />
              Invite User
            </Button> */}
            <Button className="gap-2 shadow-sm" onClick={() => onNavigate?.("tasks")}>
              <Plus className="h-4 w-4" />
              Create Task
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} delay={index * 70} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="dashboard-fade-in rounded-2xl border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">Productivity Overview</h3>
              <p className="text-sm text-muted-foreground">Weekly task completion and momentum</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              On track
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <ProgressRing percentage={75} color="#10b981" label="completed" />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            18 of 24 tasks completed this week — pacing ahead of last week’s 68%.
          </p>
        </div>

        <div className="dashboard-fade-in rounded-2xl border border-border/60 bg-card p-6 shadow-sm shadow-black/5" style={{ animationDelay: "80ms" }}>
          <h3 className="font-semibold">Performance Summary</h3>
          <p className="text-sm text-muted-foreground">Operational highlights at a glance</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border/60 bg-background/70 p-4">
                <div className={`mb-3 inline-flex rounded-md px-2 py-1 text-xs font-semibold ${metric.accent}`}>
                  {metric.label}
                </div>
                <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="dashboard-fade-in rounded-2xl border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
          <h3 className="mb-3 font-semibold">Quick Actions</h3>
          <QuickActions actions={quickActions.map((action) => ({ ...action, onClick: () => handleQuickAction(action.target) }))} />
        </div>

        <div className="dashboard-fade-in rounded-2xl border border-border/60 bg-card p-6 shadow-sm shadow-black/5" style={{ animationDelay: "100ms" }}>
          <h3 className="font-semibold">Recent Activity</h3>
          <p className="mb-5 text-sm text-muted-foreground">Latest updates across your workspace</p>
          <ActivityTimeline items={recentActivities} />
        </div>
      </div>

      <div className="dashboard-fade-in rounded-2xl border border-border/60 bg-card p-6 shadow-sm shadow-black/5">
        <WorkspaceInsights health="Excellent" metrics={workspaceMetrics} />
      </div>
    </div>
  )
}

export default OverviewSection