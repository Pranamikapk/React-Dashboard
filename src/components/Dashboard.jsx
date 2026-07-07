import ChartsSection from "./sections/ChartsSection"
import OverviewSection from "./sections/OverviewSection"
import TasksSection from "./sections/TasksSection"
import UsersSection from "./sections/UsersSection"
import { SidebarTrigger } from "./sidebar/SidebarTrigger"


export function Dashboard({ activeSection, setActiveSection }) {

    const renderSection = () => {
        switch (activeSection) {
            case "overview":
                return <OverviewSection onNavigate={setActiveSection} />
            case "charts":
                return <ChartsSection />
            case "users":
                return <UsersSection />
            case "tasks":
                return <TasksSection />
            default:
                return <OverviewSection onNavigate={setActiveSection} />
        }
    }

    const getSectionTitle = () => {
        switch (activeSection) {
            case "overview":
                return "Dashboard Overview"
            case "charts":
                return "Data Visualization"
            case "users":
                return "User Management"
            case "tasks":
                return "Task Management"
            default:
                return "Dashboard Overview"
        }
    }

    const getSectionDescription = () => {
        switch (activeSection) {
            case "overview":
                return "A polished view of your workspace health and priorities."
            case "charts":
                return "Interactive analytics for growth, revenue, and performance."
            case "users":
                return "Manage and explore the people shaping your product."
            case "tasks":
                return "Create and refine workstreams without losing momentum."
            default:
                return "A polished view of your workspace health and priorities."
        }
    }

    return (
        <div className="flex h-full flex-col rounded-[1.75rem] border border-border/60 bg-background/60 p-2 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.25)] backdrop-blur sm:p-3 lg:p-4">
            <header className="sticky top-0 z-20 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-border/60 bg-background/85 px-4 py-4 shadow-sm shadow-black/5 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:px-6">
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="h-8 w-8 rounded-md md:hidden" />
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">{getSectionTitle()}</h1>
                        <p className="text-sm text-muted-foreground">
                            {getSectionDescription()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live workspace
                </div>
            </header>
            <div className="flex-1 overflow-auto px-2 pb-2 sm:px-2 lg:px-3">
                {renderSection()}
            </div>
        </div>
    )
}
