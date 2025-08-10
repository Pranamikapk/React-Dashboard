import ChartsSection from "./sections/ChartsSection"
import OverviewSection from "./sections/OverviewSection"
import TasksSection from "./sections/TasksSection"
import UsersSection from "./sections/UsersSection"
import { SidebarTrigger } from "./sidebar/SidebarTrigger"


export function Dashboard({ activeSection }) {

    const renderSection = () => {
        switch (activeSection) {
            case "overview":
                return <OverviewSection />
            case "charts":
                return <ChartsSection />
            case "users":
                return <UsersSection />
            case "tasks":
                return <TasksSection />
            default:
                return <OverviewSection />
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
                return "Welcome to Dashboard"
            case "charts":
                return "Interactive data visualization anf analytics"
            case "users":
                return "Manage and view user information"
            case "tasks":
                return "Create and manage your tasks efficiently"
            default:
                return "Welcome to Dashboard"
        }
    }

    return (
        <div className="flex flex-col h-full">
            <header className="border-b px-6 py-4 flex items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                <SidebarTrigger className="md:hidden" />
                <div>
                    <h1 className="text-2xl font-semibold">{getSectionTitle()}</h1>
                    <p className="text-sm text-muted-foreground">
                        {getSectionDescription()}
                    </p>
                </div>
            </header>
            <div className="flex-1 overflow-auto p-6">
                {renderSection()}
            </div>
        </div>
    )
}
