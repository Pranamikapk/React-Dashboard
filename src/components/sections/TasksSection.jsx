import { AlertCircle, Calendar, CheckCircle2, Circle, Clock, Edit, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "../ui/Badge"
import Button from "../ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialogue"
import { Input } from "../ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table"
import { TextArea } from "../ui/TextArea"

const STORAGE_KEY = "dashboard-tasks"

const SAMPLE_TASKS = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the new dashboard project including API references and user guides",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-15",
    createdAt: "2024-01-01"
  },
  {
    id: "2",
    title: "Review user feedback",
    description: "Analyze user feedback from the latest release and create improvement plan",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-20",
    createdAt: "2024-01-02"
  },
  {
    id: "3",
    title: "Update dependencies",
    description: "Update all project dependencies to latest versions and test compatibility",
    status: "completed",
    priority: "low",
    dueDate: "2024-01-10",
    createdAt: "2024-01-03"
  },
  {
    id: "4",
    title: "Implement dark mode",
    description: "Add dark mode support to the dashboard with theme persistence",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-25",
    createdAt: "2024-01-04"
  },
  {
    id: "5",
    title: "Performance optimization",
    description: "Optimize chart rendering and data loading performance",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-18",
    createdAt: "2024-01-05"
  }
]

const TasksSection = () => {
  const [tasks, setTasks] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: ""
  })

  // Seed robustly: if missing, invalid, or empty array -> seed SAMPLE_TASKS
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    try {
      const parsed = JSON.parse(saved ?? "null")
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTasks(parsed)
        return
      }
    } catch {
      // ignore parse errors and seed
    }
    setTasks(SAMPLE_TASKS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TASKS))
  }, [])

  // Persist on any change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "todo",     // keep lowercase to match logic
      priority: "medium", // keep lowercase to match logic
      dueDate: ""
    })
    setEditingTask(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id ? { ...task, ...formData } : task
      ))
    } else {
      const newTask = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTasks(prev => [...prev, newTask])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      setTasks(prev => prev.filter(task => task.id !== taskId))
    }
  }

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "todo": return <Circle className="h-4 w-4" />
      case "in-progress": return <Clock className="h-4 w-4" />
      case "completed": return <CheckCircle2 className="h-4 w-4" />
      default: return <Circle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "todo": return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "in-progress": return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "completed": return "bg-green-100 text-green-800 hover:bg-green-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low": return "bg-gray-100 text-gray-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "high": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority) => (
    priority === "high" ? <AlertCircle className="h-3 w-3" /> : null
  )

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    const d = new Date(dueDate)
    const today = new Date()
    return d < today && d.toDateString() !== today.toDateString()
  }

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length,
    overdue: tasks.filter(t => isOverdue(t.dueDate) && t.status !== "completed").length
  }

  return (
    <div className="space-y-6" >
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold"> {taskStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600"> {taskStats.todo}</div>
            <p className="text-sm text-muted-foreground">To Do</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600"> {taskStats.inProgress}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600"> {taskStats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600"> {taskStats.overdue}</div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Create, edit, and manage your tasks efficiently with full CRUD operations
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" onClick={() => {
                  resetForm()
                  setIsDialogOpen(true)
                  }} 
                  className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingTask ? "Edit Task" : "Create New Task"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingTask ? "Update task details below" : "Fill in the details to create a new task"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <label className="text-sm font-medium">Task Title *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter a descriptive task title"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <TextArea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Provide additional details about the task"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                          <SelectTrigger className="w-full" >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-50 mt-1 w-full rounded-md border shadow-lg bg-background/80 backdrop-blur-md">
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Priority</label>
                        <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-50 mt-1 w-full rounded-md border shadow-lg bg-background/80 backdrop-blur-md">
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <Input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-2">
                    <Button type="button" variant="outline" className="bg-white" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="outline" className="bg-white">
                      {editingTask ? "Update Task" : "Create Task"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[900px] table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>Task Details</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Priority</TableHead>
                  <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                  <TableHead className="hidden sm:tabel-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          {task.title}
                          {isOverdue(task.dueDate) && task.status !== "completed" && (
                            <Badge variant="destructive" className="text-xs">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        {task.description && (
                          <div className="text-sm text-muted-foreground">
                            {task.description}
                          </div>
                        )}
                        <div className="md:hidden mt-2 flex gap-2 flex-wrap">
                          <Badge 
                            className={`${getStatusColor(task.status)} cursor-pointer`}
                            onClick={() => {
                              const statuses = ["todo", "in-progress", "completed"]
                              const currentIndex = statuses.indexOf(task.status)
                              const nextStatus = statuses[(currentIndex + 1) % statuses.length]
                              handleStatusChange(task.id, nextStatus)
                            }}
                          >
                            {task.status.replace("-", " ")}
                          </Badge>
                          <Badge className={`${getPriorityColor(task.priority)} flex items-center gap-1`}>
                            {getPriorityIcon(task.priority)}
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge 
                        className={`${getStatusColor(task.status)} cursor-pointer`}
                        onClick={() => {
                          const statuses = ["todo", "in-progress", "completed"]
                          const currentIndex = statuses.indexOf(task.status)
                          const nextStatus = statuses[(currentIndex + 1) % statuses.length]
                          handleStatusChange(task.id, nextStatus)
                        }}
                      >
                        {task.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge className={`${getPriorityColor(task.priority)} flex items-center gap-1 w-fit`}>
                        {getPriorityIcon(task.priority)}
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={isOverdue(task.dueDate) && task.status !== "completed" ? "text-red-600" : ""}>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(task)}
                          className="hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(task.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No tasks found</p>
              <p className="text-sm text-muted-foreground mt-1">Create your first task to get started with task management!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TasksSection