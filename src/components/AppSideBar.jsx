import { BarChart3, CheckSquare, Home, Users } from "lucide-react";
import Sidebar from "./sidebar/Sidebar";
import SidebarContent from "./sidebar/SidebarContent";
import SidebarGroup from "./sidebar/SidebarGroup";
import SidebarGroupContent from "./sidebar/SidebarGroupContent";
import SidebarGroupLabel from "./sidebar/SidebarGroupLabel";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarMenu from "./sidebar/SidebarMenu";
import SidebarMenuButton from "./sidebar/SidebarMenuButton";
import SidebarMenuItem from "./sidebar/SidebarMenuItem";
import { useSidebar } from "./sidebar/SidebarProvider";

const menuItems = [
  { title: "Overview", icon: Home, id: "overview" },
  { title: "Data Visualization", icon: BarChart3, id: "charts" },
  { title: "User Management", icon: Users, id: "users" },
  { title: "Task Management", icon: CheckSquare, id: "tasks" },
];

const AppSideBar = ({ activeSection, setActiveSection }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-sidebar-border/60">
      <style>{`
        @keyframes sidebarFadeIn {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .sidebar-stagger {
          opacity: 0;
          animation: sidebarFadeIn 0.3s ease-out forwards;
        }
      `}</style>

  <SidebarHeader
  className={`border-b border-border/60 px-3 py-3 transition-all duration-300 ${
    isCollapsed ? "justify-center" : "justify-start"
  }`}
>
  <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "gap-3"}`}>
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-500 text-primary-foreground shadow-sm transition-transform duration-300 hover:scale-105 hover:rotate-3">
      <BarChart3 className="h-5 w-5" />
    </div>

    {!isCollapsed && (
      <div className="min-w-0 transition-all duration-300">
        <div className="truncate font-semibold tracking-tight">
          Northstar
        </div>
        <div className="truncate text-xs text-muted-foreground">
          Operations workspace
        </div>
      </div>
    )}
  </div>
</SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="mb-1 px-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
              Workspace
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <SidebarMenuItem
                    key={item.id}
                    className="sidebar-stagger"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <SidebarMenuButton
                      isActive={isActive}
                      showLabel={!isCollapsed}
                      title={isCollapsed ? item.title : undefined}
                      onClick={() => setActiveSection(item.id)}
                      className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent/70 hover:text-foreground"}`}
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all duration-300 ${isActive ? "bg-white/15" : "bg-transparent group-hover:bg-muted"}`}>
                        <item.icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? "scale-105" : "group-hover:scale-110"}`} />
                      </span>
                      {!isCollapsed && <span className="truncate font-medium">{item.title}</span>}
                      {isActive && !isCollapsed && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary-foreground" />}
                      {isActive && isCollapsed && <span className="absolute left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary-foreground" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
