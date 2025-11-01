import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, FileText, Award, Briefcase, GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

interface TimelineItem {
  id: string;
  type: "experience" | "education" | "certificate";
  title: string;
  organization: string;
  description: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

const SkillsAdmin = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillDialog, setSkillDialog] = useState(false);
  const [timelineDialog, setTimelineDialog] = useState(false);
  const { toast } = useToast();

  const [skillForm, setSkillForm] = useState({
    name: "",
    proficiency: 50,
    category: "",
  });

  const [timelineForm, setTimelineForm] = useState({
    type: "experience" as "experience" | "education" | "certificate",
    title: "",
    organization: "",
    description: "",
    start_date: "",
    end_date: "",
    is_current: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [skillsRes, timelineRes] = await Promise.all([
      supabase.from("skills").select("*").order("proficiency", { ascending: false }),
      supabase.from("timeline_items").select("*").order("start_date", { ascending: false }),
    ]);

    if (skillsRes.data) setSkills(skillsRes.data);
    if (timelineRes.data) setTimeline(timelineRes.data as TimelineItem[]);
    setLoading(false);
  };

  const handleSaveSkill = async () => {
    const { error } = await supabase.from("skills").insert(skillForm);
    if (error) {
      toast({ title: "Error adding skill", variant: "destructive" });
    } else {
      toast({ title: "Skill added successfully" });
      setSkillDialog(false);
      setSkillForm({ name: "", proficiency: 50, category: "" });
      loadData();
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting skill", variant: "destructive" });
    } else {
      toast({ title: "Skill deleted" });
      loadData();
    }
  };

  const handleSaveTimeline = async () => {
    const { error } = await supabase.from("timeline_items").insert(timelineForm);
    if (error) {
      toast({ title: "Error adding item", variant: "destructive" });
    } else {
      toast({ title: "Timeline item added" });
      setTimelineDialog(false);
      setTimelineForm({
        type: "experience",
        title: "",
        organization: "",
        description: "",
        start_date: "",
        end_date: "",
        is_current: false,
      });
      loadData();
    }
  };

  const handleDeleteTimeline = async (id: string) => {
    const { error } = await supabase.from("timeline_items").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting item", variant: "destructive" });
    } else {
      toast({ title: "Item deleted" });
      loadData();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-3d-orange mb-2">Skills & Resume</h1>
        <p className="text-gray-400">Manage your skills, experience, and education</p>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="bg-panda-navy border border-panda-orange/20">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={skillDialog} onOpenChange={setSkillDialog}>
              <DialogTrigger asChild>
                <Button className="bg-panda-orange hover:bg-panda-orange/80">
                  <Plus size={20} className="mr-2" />
                  Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-panda-navy border-panda-orange/20">
                <DialogHeader>
                  <DialogTitle className="text-panda-orange">Add New Skill</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Skill Name"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="bg-background border-panda-orange/20"
                  />
                  <Input
                    placeholder="Category (e.g., Frontend, Backend)"
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="bg-background border-panda-orange/20"
                  />
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Proficiency: {skillForm.proficiency}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skillForm.proficiency}
                      onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={handleSaveSkill} className="w-full bg-panda-orange hover:bg-panda-orange/80">
                    Add Skill
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <Card key={skill.id} className="card-3d-orange border-panda-orange/20">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-panda-orange">{skill.name}</h3>
                      <p className="text-sm text-gray-400">{skill.category}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-panda-red hover:bg-panda-red/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <Progress value={skill.proficiency} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">{skill.proficiency}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={timelineDialog} onOpenChange={setTimelineDialog}>
              <DialogTrigger asChild>
                <Button className="bg-panda-blue hover:bg-panda-blue/80">
                  <Plus size={20} className="mr-2" />
                  Add Timeline Item
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-panda-navy border-panda-blue/20">
                <DialogHeader>
                  <DialogTitle className="text-panda-blue">Add Timeline Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <select
                    value={timelineForm.type}
                    onChange={(e) => setTimelineForm({ ...timelineForm, type: e.target.value as any })}
                    className="w-full p-2 rounded bg-background border border-panda-blue/20 text-foreground"
                  >
                    <option value="experience">Experience</option>
                    <option value="education">Education</option>
                    <option value="certificate">Certificate</option>
                  </select>
                  <Input
                    placeholder="Title / Position"
                    value={timelineForm.title}
                    onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                    className="bg-background border-panda-blue/20"
                  />
                  <Input
                    placeholder="Organization / Institution"
                    value={timelineForm.organization}
                    onChange={(e) => setTimelineForm({ ...timelineForm, organization: e.target.value })}
                    className="bg-background border-panda-blue/20"
                  />
                  <Textarea
                    placeholder="Description"
                    value={timelineForm.description}
                    onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                    className="bg-background border-panda-blue/20"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={timelineForm.start_date}
                      onChange={(e) => setTimelineForm({ ...timelineForm, start_date: e.target.value })}
                      className="bg-background border-panda-blue/20"
                    />
                    <Input
                      type="date"
                      value={timelineForm.end_date}
                      onChange={(e) => setTimelineForm({ ...timelineForm, end_date: e.target.value })}
                      disabled={timelineForm.is_current}
                      className="bg-background border-panda-blue/20"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={timelineForm.is_current}
                      onChange={(e) => setTimelineForm({ ...timelineForm, is_current: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">Currently active</span>
                  </label>
                  <Button onClick={handleSaveTimeline} className="w-full bg-panda-blue hover:bg-panda-blue/80">
                    Add Item
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {timeline.map((item) => {
              const Icon = item.type === "experience" ? Briefcase : item.type === "education" ? GraduationCap : Award;
              return (
                <Card key={item.id} className="card-3d-blue border-panda-blue/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Icon className="text-panda-blue mt-1" size={20} />
                        <div>
                          <CardTitle className="text-panda-blue">{item.title}</CardTitle>
                          <p className="text-sm text-gray-400">{item.organization}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(item.start_date).getFullYear()} -{" "}
                            {item.is_current ? "Present" : new Date(item.end_date).getFullYear()}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTimeline(item.id)}
                        className="text-panda-red hover:bg-panda-red/10"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="resume">
          <Card className="card-3d-purple border-panda-purple/20">
            <CardHeader>
              <CardTitle className="text-panda-purple flex items-center gap-2">
                <FileText size={20} />
                Resume Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">Upload your resume in PDF format</p>
              <Input type="file" accept=".pdf" className="bg-background border-panda-purple/20" />
              <Button className="bg-panda-purple hover:bg-panda-purple/80">
                <FileText size={20} className="mr-2" />
                Upload Resume
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsAdmin;
