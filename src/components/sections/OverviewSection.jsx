import { Activity, BarChart3, CheckSquare, FileText, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"

const OverviewSection = () => {

  const stats = [
    {
      title: "Total Users",
      value: "10",
      description: "Active users in system",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Tasks",
      value: "24",
      description: "Tasks in progress",
      icon: CheckSquare,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Data Points",
      value: "156",
      description: "Visualization data points",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Growth Rate",
      value: "+12%",
      description: "Monthly growth",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ]

  const recentActivities = [
    { action: "New user registered", time: "2 minutes ago", icon: Users },
    { action: "Task completed", time: "5 minutes ago", icon: CheckSquare },
    { action: "Data updated", time: "10 minutes ago", icon: Activity },
    { action: "Report generated", time: "15 minutes ago", icon: FileText }
  ]
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-venter gap-2">
              <BarChart3 className="h-5 w-5" />
              Welcome to Dashboard
            </CardTitle>
            <CardDescription >
              Your comprehensive solution for data visualization, user management, and task tracking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-ld bg-muted/50">
                <div className="p-2 rounded-full bg-purple-100">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Interactive Charts</div>
                  <div className="text-sm text-muted-foreground">Multiple chart types with real-time data</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="p-2 rounded-full bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">User Management</div>
                  <div className="text-sm text-muted-foreground">Complete user data management system</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="p-2 rounded-full bg-green-100">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Task Management</div>
                  <div className="text-sm text-muted-foreground">Full CRUD operations for task tracking</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and activities in your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-full bg-muted">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{activity.action}</div>
                    <div className="font-medium text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OverviewSection