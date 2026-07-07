import {
  AlertCircle,
  ArrowUpDown,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Circle,
  Clock,
  Edit,
  ListTodo,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/Badge";
import Button from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialogue";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { TextArea } from "../ui/TextArea";
import PageHeader from "../dashboard/PageHeader";
import StatsCard from "../dashboard/StatsCard";

const STORAGE_KEY = "dashboard-tasks";

const SAMPLE_TASKS = [
  {
    id: "1",
    title: "Complete project documentation",
    description:
      "Write comprehensive documentation for the new dashboard project including API references and user guides",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-15",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Review user feedback",
    description:
      "Analyze user feedback from the latest release and create improvement plan",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-20",
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    title: "Update dependencies",
    description:
      "Update all project dependencies to latest versions and test compatibility",
    status: "completed",
    priority: "low",
    dueDate: "2024-01-10",
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    title: "Implement dark mode",
    description:
      "Add dark mode support to the dashboard with theme persistence",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-25",
    createdAt: "2024-01-04",
  },
  {
    id: "5",
    title: "Performance optimization",
    description: "Optimize chart rendering and data loading performance",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-18",
    createdAt: "2024-01-05",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

const STATUS_STYLES = {
  todo: {
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    icon: Circle,
    iconColor: "text-slate-400",
  },
  "in-progress": {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Clock,
    iconColor: "text-blue-500",
  },
  completed: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
};

const PRIORITY_STYLES = {
  low: "bg-slate-100 text-slate-700 border-slate-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high: "bg-red-50 text-red-700 border-red-200",
};

const PRIORITY_ORDER = { low: 1, medium: 2, high: 3 };

const TasksSection = () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt-desc");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    try {
      const parsed = JSON.parse(saved ?? "null");
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTasks(parsed);
        return;
      }
    } catch {
      // ignore malformed storage and seed defaults
    }
    setTasks(SAMPLE_TASKS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TASKS));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    });
    setEditingTask(null);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "A task title is required.";
    }

    if (formData.dueDate && Number(new Date(formData.dueDate)) < Number(new Date(new Date().toDateString()))) {
      errors.dueDate = "Choose a date today or later.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData, title: formData.title.trim() } : task,
        ),
      );
    } else {
      const newTask = {
        id: Date.now().toString(),
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTasks((prev) => [newTask, ...prev]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const cycleStatus = (task) => {
    const statuses = ["todo", "in-progress", "completed"];
    const nextStatus =
      statuses[(statuses.indexOf(task.status) + 1) % statuses.length];
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t)),
    );
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const d = new Date(dueDate);
    const today = new Date();
    return d < today && d.toDateString() !== today.toDateString();
  };

  const taskStats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      overdue: tasks.filter(
        (t) => isOverdue(t.dueDate) && t.status !== "completed",
      ).length,
    }),
    [tasks],
  );

  const completionPct = taskStats.total
    ? Math.round((taskStats.completed / taskStats.total) * 100)
    : 0;

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filtered = tasks.filter((task) => {
      const matchesFilter = activeFilter === "all" || task.status === activeFilter;
      const haystack = `${task.title} ${task.description} ${task.priority}`.toLowerCase();
      const matchesSearch = normalizedSearch.length === 0 || haystack.includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority-high":
          return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        case "dueDate-asc":
          return new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31");
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "createdAt-desc":
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });
  }, [activeFilter, searchTerm, sortBy, tasks]);

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

      <PageHeader
        title="Tasks"
        subtitle={`${taskStats.total} tasks · ${completionPct}% complete this cycle`}
        actions={
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                resetForm();
              }
            }}
          >
            <Button
              type="button"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="gap-2 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add New Task
            </Button>
            <DialogContent className="sm:max-w-[560px] bg-white">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
                  <DialogDescription>
                    {editingTask ? "Adjust the task details below." : "Add a new task and keep momentum moving."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Task Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        setFormErrors((prev) => ({ ...prev, title: undefined }));
                      }}
                      placeholder="Enter a descriptive task title"
                      required
                    />
                    {formErrors.title && <p className="text-xs text-rose-600">{formErrors.title}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Description</label>
                    <TextArea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Provide additional context or acceptance criteria"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-50 mt-1 w-full rounded-xl border bg-background/90 shadow-lg backdrop-blur-md">
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Priority</label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-50 mt-1 w-full rounded-xl border bg-background/90 shadow-lg backdrop-blur-md">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Due Date</label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => {
                        setFormData({ ...formData, dueDate: e.target.value });
                        setFormErrors((prev) => ({ ...prev, dueDate: undefined }));
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {formErrors.dueDate && <p className="text-xs text-rose-600">{formErrors.dueDate}</p>}
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-white">
                    {editingTask ? "Update Task" : "Create Task"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatsCard title="Total Tasks" value={taskStats.total} icon={ListTodo} accent="slate" delay={0} />
        <StatsCard title="To Do" value={taskStats.todo} icon={Circle} accent="slate" delay={40} />
        <StatsCard title="In Progress" value={taskStats.inProgress} icon={Clock} accent="blue" delay={80} />
        <StatsCard title="Completed" value={taskStats.completed} icon={CheckSquare} accent="emerald" progress={completionPct} delay={120} />
        <StatsCard title="Overdue" value={taskStats.overdue} icon={AlertCircle} accent="rose" delay={160} />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm shadow-black/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/60 bg-background/80 text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {filter.label}
              {filter.id !== "all" && (
                <span className="ml-1.5 opacity-70">
                  {filter.id === "todo"
                    ? taskStats.todo
                    : filter.id === "in-progress"
                      ? taskStats.inProgress
                      : taskStats.completed}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks"
              className="pl-10"
            />
          </div>
          <div className="relative min-w-[180px]">
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="pl-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-50 mt-1 rounded-xl border bg-background/90 shadow-lg backdrop-blur-md">
                <SelectItem value="createdAt-desc">Newest first</SelectItem>
                <SelectItem value="dueDate-asc">Due date</SelectItem>
                <SelectItem value="priority-high">Priority</SelectItem>
                <SelectItem value="title-asc">Title A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {filteredTasks.map((task, index) => {
          const statusStyle = STATUS_STYLES[task.status] ?? STATUS_STYLES.todo;
          const StatusIcon = statusStyle.icon;
          const overdue = isOverdue(task.dueDate) && task.status !== "completed";

          return (
            <div
              key={task.id}
              className="dashboard-fade-in group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-lg hover:shadow-black/10 sm:flex-row sm:items-start"
              style={{ animationDelay: `${index * 35}ms` }}
            >
              <button
                onClick={() => cycleStatus(task)}
                className="mt-0.5 shrink-0 transition-transform duration-150 hover:scale-110"
                title="Change status"
                type="button"
              >
                <StatusIcon className={`h-5 w-5 ${statusStyle.iconColor}`} />
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-medium ${task.status === "completed" ? "text-muted-foreground line-through" : ""}`}>
                    {task.title}
                  </span>
                  {overdue && (
                    <Badge variant="destructive" className="text-[10px]">
                      Overdue
                    </Badge>
                  )}
                </div>
                {task.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {task.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge className={`${statusStyle.badge} border`}>
                    {task.status.replace("-", " ")}
                  </Badge>
                  <Badge className={`${PRIORITY_STYLES[task.priority]} flex items-center gap-1 border`}>
                    {task.priority === "high" && <AlertCircle className="h-3 w-3" />}
                    {task.priority}
                  </Badge>
                  {task.dueDate && (
                    <span className={`flex items-center gap-1 text-xs ${overdue ? "font-medium text-red-600" : "text-muted-foreground"}`}>
                      <Calendar className="h-3 w-3" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
                <Button variant="outline" size="sm" onClick={() => handleEdit(task)} className="transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(task.id)} className="text-red-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border/60 bg-card/70 py-16 text-center shadow-sm shadow-black/5">
            <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-medium text-muted-foreground">No tasks here</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeFilter === "all" ? "Create your first task to get started." : "Try a different filter or search."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksSection;
