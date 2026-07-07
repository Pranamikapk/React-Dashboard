import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import PageHeader from "../dashboard/PageHeader"
import StatsCard from "../dashboard/StatsCard"

const salesData = [
  { month: "Jan", sales: 4000, revenue: 2400, users: 240 },
  { month: "Feb", sales: 3000, revenue: 1398, users: 221 },
  { month: "Mar", sales: 2000, revenue: 9800, users: 229 },
  { month: "Apr", sales: 2780, revenue: 3908, users: 200 },
  { month: "May", sales: 1890, revenue: 4800, users: 218 },
  { month: "Jun", sales: 2390, revenue: 3800, users: 250 },
  { month: "Jul", sales: 3490, revenue: 4300, users: 210 }
]

const categoryData = [
  { name: "Desktop", value: 400, color: "#3b82f6" },
  { name: "Mobile", value: 300, color: "#10b981" },
  { name: "Tablet", value: 200, color: "#f59e0b" },
  { name: "Other", value: 100, color: "#a855f7" }
]

const performanceData = [
  { name: "Week 1", performance: 85, target: 90 },
  { name: "Week 2", performance: 92, target: 90 },
  { name: "Week 3", performance: 78, target: 90 },
  { name: "Week 4", performance: 96, target: 90 },
  { name: "Week 5", performance: 88, target: 90 },
  { name: "Week 6", performance: 94, target: 90 }
]

const tooltipStyle = {
  borderRadius: "10px",
  border: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  fontSize: "13px",
  padding: "8px 12px",
}

const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0)
const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0)
const avgUsers = Math.round(salesData.reduce((sum, d) => sum + d.users, 0) / salesData.length)
const avgPerformance = Math.round(performanceData.reduce((sum, d) => sum + d.performance, 0) / performanceData.length)

const summary = [
  { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, accent: "emerald", change: "+8.2%", trend: "up" },
  { title: "Total Sales", value: totalSales.toLocaleString(), icon: BarChart3, accent: "blue", change: "+4.1%", trend: "up" },
  { title: "Avg. Monthly Users", value: avgUsers, icon: Users, accent: "purple", change: "+2.6%", trend: "up" },
  { title: "Avg. Performance", value: `${avgPerformance}%`, icon: TrendingUp, accent: "amber", change: avgPerformance >= 90 ? "On target" : "-2% vs target", trend: avgPerformance >= 90 ? "up" : "down" },
]

const ChartCard = ({ title, description, badge, children }) => (
  <div className="dashboard-fade-in rounded-2xl border border-border/60 bg-card p-6 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10">
    <div className="mb-1 flex items-center justify-between gap-3">
      <h3 className="font-semibold">{title}</h3>
      {badge && <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{badge}</span>}
    </div>
    <p className="mb-4 text-sm text-muted-foreground">{description}</p>
    {children}
  </div>
)

const ChartsSection = () => {
  return (
    <div className="space-y-8">
      <style>{`
        @keyframes dashboardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-fade-in {
          opacity: 0;
          animation: dashboardFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <PageHeader title="Analytics" subtitle="Visual insights into sales, growth, and performance across the workspace." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} delay={index * 60} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard title="Monthly Sales & Revenue" description="Sales and revenue trends over the last 7 months" badge="7 months">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'sales' ? 'Sales' : 'Revenue']} />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Sales" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="User Growth Trend" description="User acquisition over time" badge={`avg ${avgUsers}`}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} users`, 'Users']} />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Device Categories" description="Distribution of users by device type">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} users`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Performance vs Target"
          description="Weekly performance tracking against targets"
          badge={avgPerformance >= 90 ? "On target" : "Below target"}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value, name) => [`${value}%`, name === 'performance' ? 'Performance' : 'Target']} />
              <Legend />
              <Area type="monotone" dataKey="performance" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} name="Performance" />
              <Line type="monotone" dataKey="target" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

export default ChartsSection