import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Brain, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Home,
  GraduationCap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/auth");
  };

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
    { to: "/admin/blog", icon: FileText, label: "Blog" },
    { to: "/admin/skills", icon: Brain, label: "Skills & Resume" },
    { to: "/admin/education", icon: GraduationCap, label: "Education" },
    { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-panda-navy border-r border-panda-blue/20 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-panda-blue/20 flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-bold text-3d-blue">Portfolio Admin</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-panda-blue hover:bg-panda-blue/10"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-panda-blue/20 text-panda-blue shadow-lg shadow-panda-blue/20"
                    : "text-gray-400 hover:bg-panda-blue/10 hover:text-panda-blue"
                }`
              }
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-panda-blue/20">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-panda-red hover:bg-panda-red/10"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-panda-navy/50 border-b border-panda-blue/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <Search className="text-gray-400" size={20} />
            <Input
              placeholder="Search..."
              className="bg-background/50 border-panda-blue/20 text-foreground"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="gap-2 border-panda-blue/20 text-panda-blue hover:bg-panda-blue/10"
            >
              <Home size={20} />
              <span className="hidden md:inline">Home</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-panda-red rounded-full"></span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
