import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, Eye, MessageSquare, TrendingUp, Github } from "lucide-react";

interface DashboardStats {
  totalProjects: number;
  totalBlogs: number;
  totalMessages: number;
  totalViews: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalBlogs: 0,
    totalMessages: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projectsRes, blogsRes, messagesRes, analyticsRes] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("site_analytics").select("page_views").order("date", { ascending: false }).limit(1).single(),
      ]);

      setStats({
        totalProjects: projectsRes.count || 0,
        totalBlogs: blogsRes.count || 0,
        totalMessages: messagesRes.count || 0,
        totalViews: analyticsRes.data?.page_views || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Projects", value: stats.totalProjects, icon: FolderKanban, color: "panda-blue" },
    { title: "Blog Posts", value: stats.totalBlogs, icon: FileText, color: "panda-purple" },
    { title: "Site Views", value: stats.totalViews, icon: Eye, color: "panda-orange" },
    { title: "Messages", value: stats.totalMessages, icon: MessageSquare, color: "panda-red" },
  ];

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-3d-blue mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's your portfolio summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <Card key={idx} className={`card-3d-${stat.color.split("-")[1]} border-${stat.color}/20`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <stat.icon className={`text-${stat.color}`} size={20} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-3d-blue border-panda-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-panda-blue" size={20} />
              Visitor Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Analytics chart placeholder - Connect Google Analytics
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d-purple border-panda-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="text-panda-purple" size={20} />
              GitHub Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { repo: 'portfolio-website', commits: 15, date: '2 days ago' },
                { repo: 'quicklink-platform', commits: 8, date: '3 days ago' },
                { repo: 'wakwetu-app', commits: 12, date: '5 days ago' },
                { repo: 'loveamerifrikah-site', commits: 6, date: '1 week ago' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-panda-purple/20">
                  <div className="flex items-center gap-3">
                    <Github className="text-panda-purple" size={16} />
                    <div>
                      <p className="font-medium">{activity.repo}</p>
                      <p className="text-xs text-muted-foreground">{activity.commits} commits</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
