import { useState } from "react";
import "./App.css";
import AppSideBar from "./components/AppSideBar";
import { Dashboard } from "./components/Dashboard";
import { SidebarProvider } from "./components/sidebar/SidebarProvider";

function App() {
  const [activeSession, setActiveSession] = useState("overview");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full overflow-hidden bg-transparent">
        <AppSideBar
          activeSection={activeSession}
          setActiveSection={setActiveSession}
        />
        <main className="min-w-0 flex-1 overflow-hidden">
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-3 sm:px-4 lg:px-6">
            <Dashboard
              activeSection={activeSession}
              setActiveSection={setActiveSession}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
