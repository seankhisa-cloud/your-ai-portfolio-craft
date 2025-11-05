import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProjectsAdmin from "./pages/ProjectsAdmin";
import BlogAdmin from "./pages/BlogAdmin";
import SkillsAdmin from "./pages/SkillsAdmin";
import MessagesAdmin from "./pages/MessagesAdmin";
import SettingsAdmin from "./pages/SettingsAdmin";
import Resume from "./pages/Resume";
import N8nDemo from "./pages/N8nDemo";
import LoveAmeriAfrikahDemo from "./pages/LoveAmeriAfrikahDemo";
import WakwetuDemo from "./pages/WakwetuDemo";
import QuicklinkDemo from "./pages/QuicklinkDemo";
import LabanPortfolioDemo from "./pages/LabanPortfolioDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/n8n-demo" element={<N8nDemo />} />
            <Route path="/loveamerifrikah-demo" element={<LoveAmeriAfrikahDemo />} />
            <Route path="/wakwetu-demo" element={<WakwetuDemo />} />
            <Route path="/quicklink-demo" element={<QuicklinkDemo />} />
            <Route path="/laban-portfolio-demo" element={<LabanPortfolioDemo />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
