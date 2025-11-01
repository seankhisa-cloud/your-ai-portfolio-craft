import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, User, Link, Globe, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SiteSettings {
  profile_name: string;
  avatar_url: string;
  tagline: string;
  bio: string;
  github_username: string;
  linkedin_url: string;
  twitter_url: string;
  email: string;
  site_theme: string;
  seo_title: string;
  seo_description: string;
}

const SettingsAdmin = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    profile_name: "",
    avatar_url: "",
    tagline: "",
    bio: "",
    github_username: "",
    linkedin_url: "",
    twitter_url: "",
    email: "",
    site_theme: "dark",
    seo_title: "",
    seo_description: "",
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    let error;
    if (existing) {
      ({ error } = await supabase
        .from("site_settings")
        .update(settings)
        .eq("id", existing.id));
    } else {
      ({ error } = await supabase.from("site_settings").insert(settings));
    }

    if (error) {
      toast({ title: "Error saving settings", variant: "destructive" });
    } else {
      toast({ title: "Settings saved successfully" });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-3d-purple mb-2">Settings</h1>
        <p className="text-gray-400">Configure your portfolio settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-panda-navy border border-panda-purple/20">
          <TabsTrigger value="profile">
            <User size={16} className="mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="social">
            <Link size={16} className="mr-2" />
            Social Links
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Globe size={16} className="mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="card-3d-purple border-panda-purple/20">
            <CardHeader>
              <CardTitle className="text-panda-purple">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Profile Name</label>
                <Input
                  value={settings.profile_name}
                  onChange={(e) => setSettings({ ...settings, profile_name: e.target.value })}
                  placeholder="Your Name"
                  className="bg-background border-panda-purple/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Avatar URL</label>
                <Input
                  value={settings.avatar_url}
                  onChange={(e) => setSettings({ ...settings, avatar_url: e.target.value })}
                  placeholder="https://..."
                  className="bg-background border-panda-purple/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Tagline</label>
                <Input
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  placeholder="Full Stack Developer | AI Enthusiast"
                  className="bg-background border-panda-purple/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Bio</label>
                <Textarea
                  value={settings.bio}
                  onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="bg-background border-panda-purple/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="you@example.com"
                  className="bg-background border-panda-purple/20"
                />
              </div>
              <Button onClick={handleSave} className="w-full bg-panda-purple hover:bg-panda-purple/80">
                <Save size={20} className="mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="card-3d-blue border-panda-blue/20">
            <CardHeader>
              <CardTitle className="text-panda-blue">Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">GitHub Username</label>
                <Input
                  value={settings.github_username}
                  onChange={(e) => setSettings({ ...settings, github_username: e.target.value })}
                  placeholder="yourusername"
                  className="bg-background border-panda-blue/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">LinkedIn URL</label>
                <Input
                  value={settings.linkedin_url}
                  onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="bg-background border-panda-blue/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Twitter URL</label>
                <Input
                  value={settings.twitter_url}
                  onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                  placeholder="https://twitter.com/..."
                  className="bg-background border-panda-blue/20"
                />
              </div>
              <Button onClick={handleSave} className="w-full bg-panda-blue hover:bg-panda-blue/80">
                <Save size={20} className="mr-2" />
                Save Links
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card className="card-3d-orange border-panda-orange/20">
            <CardHeader>
              <CardTitle className="text-panda-orange">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Site Title</label>
                <Input
                  value={settings.seo_title}
                  onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                  placeholder="Your Name - Portfolio"
                  className="bg-background border-panda-orange/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Meta Description</label>
                <Textarea
                  value={settings.seo_description}
                  onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                  placeholder="Portfolio of a full-stack developer..."
                  rows={3}
                  className="bg-background border-panda-orange/20"
                />
              </div>
              <Button onClick={handleSave} className="w-full bg-panda-orange hover:bg-panda-orange/80">
                <Save size={20} className="mr-2" />
                Save SEO
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="card-3d-red border-panda-red/20">
            <CardHeader>
              <CardTitle className="text-panda-red">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">New Message Alerts</p>
                  <p className="text-sm text-gray-400">Get notified when someone contacts you</p>
                </div>
                <input type="checkbox" className="w-5 h-5" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Weekly Analytics Report</p>
                  <p className="text-sm text-gray-400">Receive weekly site statistics</p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <Button className="w-full bg-panda-red hover:bg-panda-red/80">
                <Save size={20} className="mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsAdmin;
