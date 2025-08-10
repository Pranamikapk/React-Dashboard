import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"

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
  { name: "Desktop", value: 400, color: "#8884d8" },
  { name: "Mobile", value: 300, color: "#82ca9d" },
  { name: "Tablet", value: 200, color: "#ffc658" },
  { name: "Other", value: 100, color: "#ff7c7c" }
]

const performanceData = [
  { name: "Week 1", performance: 85, target: 90 },
  { name: "Week 2", performance: 92, target: 90 },
  { name: "Week 3", performance: 78, target: 90 },
  { name: "Week 4", performance: 96, target: 90 },
  { name: "Week 5", performance: 88, target: 90 },
  { name: "Week 6", performance: 94, target: 90 }
]

const trafficData = [
  { time: "00:00", visitors: 120 },
  { time: "04:00", visitors: 80 },
  { time: "08:00", visitors: 200 },
  { time: "12:00", visitors: 350 },
  { time: "16:00", visitors: 280 },
  { time: "20:00", visitors: 180 }
]

const ChartsSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales & Revenue</CardTitle>
            <CardDescription>Sales and revenue trends over the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300} >
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis />
                <Tooltip 
                  formatter={(value,name) => [
                    `$${value.toLocaleString()}`, 
                        name === 'sales' ? 'Sales' : 'Revenue'
                  ]} 
                />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
              </BarChart>
            </ ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
            <CardDescription>User acquisition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300} >
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} users`, 'Users']} />
                <Line 
                  type="monotone"
                  dataKey = "users"
                  stroke = "#8884d8"
                  strokeWidth={3}
                  dot={{ fill:'#8884d8' , strokeWidth: 2 , r: 4}}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Categories</CardTitle>
            <CardDescription>Distribution of users by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300} >
              <PieChart data={salesData}>
                <Pie 
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  { categoryData.map((entry,index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} users`, 'Count']}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance vs Target</CardTitle>
            <CardDescription>Weekly performance tracking against targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300} >
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value,name) => [`${value}% `,name === 'performance' ? 'Performance' : 'Target']} />
                <Legend />
                <Area 
                  type="monotone"
                  dataKey = "performance"
                  stackId="1"
                  stroke = "#8884d8"
                  fill = "#8884d8"
                  fillOpacity={0.6}
                  name="Performance"                
                />
                <Line 
                  type="monotone"
                  dataKey = "target"
                  stroke = "#ff7c7c"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ChartsSection