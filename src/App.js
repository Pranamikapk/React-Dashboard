import { useState } from "react";
import "./App.css";
import AppSideBar from "./components/AppSideBar";
import { Dashboard } from "./components/Dashboard";
import { SidebarProvider } from "./components/sidebar/SidebarProvider";

function App() {
  const [activeSession, setActiveSession] = useState("overview");

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSideBar
          activeSection={activeSession}
          setActiveSection={setActiveSession}
        />
        <main className="flex-1 overflow-hidden md:ml-[16rem]">
          <Dashboard activeSection={activeSession} />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
