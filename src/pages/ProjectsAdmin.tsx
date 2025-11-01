import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, ExternalLink, Github, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  demo_link: string;
  github_link: string;
  tags: string[];
  is_featured: boolean;
  views: number;
}

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    demo_link: "",
    github_link: "",
    tags: "",
    is_featured: false,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading projects", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const projectData = {
      ...formData,
      tech_stack: formData.tech_stack.split(",").map((t) => t.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);

      if (error) {
        toast({ title: "Error updating project", variant: "destructive" });
      } else {
        toast({ title: "Project updated successfully" });
      }
    } else {
      const { error } = await supabase.from("projects").insert(projectData);

      if (error) {
        toast({ title: "Error creating project", variant: "destructive" });
      } else {
        toast({ title: "Project created successfully" });
      }
    }

    setDialogOpen(false);
    resetForm();
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting project", variant: "destructive" });
    } else {
      toast({ title: "Project deleted successfully" });
      loadProjects();
    }
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || "",
      tech_stack: project.tech_stack?.join(", ") || "",
      demo_link: project.demo_link || "",
      github_link: project.github_link || "",
      tags: project.tags?.join(", ") || "",
      is_featured: project.is_featured,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech_stack: "",
      demo_link: "",
      github_link: "",
      tags: "",
      is_featured: false,
    });
    setEditingProject(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-3d-blue mb-2">Projects Management</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-panda-blue hover:bg-panda-blue/80">
              <Plus size={20} className="mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-panda-navy border-panda-blue/20">
            <DialogHeader>
              <DialogTitle className="text-2xl text-panda-blue">
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background border-panda-blue/20"
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="bg-background border-panda-blue/20"
              />
              <Input
                placeholder="Tech Stack (comma-separated)"
                value={formData.tech_stack}
                onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                className="bg-background border-panda-blue/20"
              />
              <Input
                placeholder="Demo Link"
                value={formData.demo_link}
                onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
                className="bg-background border-panda-blue/20"
              />
              <Input
                placeholder="GitHub Link"
                value={formData.github_link}
                onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                className="bg-background border-panda-blue/20"
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-background border-panda-blue/20"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">Featured Project</span>
              </label>
              <Button onClick={handleSave} className="w-full bg-panda-blue hover:bg-panda-blue/80">
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="card-3d-blue border-panda-blue/20 hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="text-panda-blue">{project.title}</span>
                {project.is_featured && <Star className="text-panda-orange" size={20} fill="currentColor" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech_stack?.slice(0, 3).map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-panda-blue/20 text-panda-blue">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                {project.demo_link && (
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-1" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.github_link && (
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t border-panda-blue/20">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openEditDialog(project)}
                  className="flex-1 text-panda-blue hover:bg-panda-blue/10"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 text-panda-red hover:bg-panda-red/10"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
