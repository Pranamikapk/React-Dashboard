import Sidebar from "./sidebar/Sidebar";
import SidebarContent from "./sidebar/SidebarContent";
import SidebarGroup from "./sidebar/SidebarGroup";
import SidebarGroupContent from "./sidebar/SidebarGroupContent";
import SidebarGroupLabel from "./sidebar/SidebarGroupLabel";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarMenu from "./sidebar/SidebarMenu";
import SidebarMenuButton from "./sidebar/SidebarMenuButton";
import SidebarMenuItem from "./sidebar/SidebarMenuItem";

const { Home, BarChart3, Users, CheckSquare } = require("lucide-react");

const menuItems = [
  {
    title: "Overview",
    icon: Home,
    id: "overview"
  },
  {
    title: "Data Visualization",
    icon: BarChart3,
    id: "charts"
  },
  {
    title: "User Management",
    icon: Users,
    id: "users"
  },
  {
    title: "Task Management",
    icon: CheckSquare,
    id: "tasks"
  }
]



const AppSideBar = ({activeSection, setActiveSection}) => {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-4 w-4"/>
          </div>
          <span className="font-semibold">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu  className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-accent/50 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    >
                  
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Quick Stats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm font-medium">Active Users</div>
                <div className="text-2xl font-bold text-primary">10</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm font-medium">Total Tasks</div>
                <div className="text-2xl font-bold text-green-600">24</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm font-medium">Data Points</div>
                <div className="text-2xl font-bold text-purple-600">156</div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSideBar