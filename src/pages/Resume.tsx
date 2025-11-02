import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import profileImage from '@/assets/laban-profile.png';

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

interface TimelineItem {
  id: string;
  type: string;
  title: string;
  organization: string;
  description: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
}

interface SiteSettings {
  profile_name: string;
  bio: string;
  email: string;
  avatar_url: string;
  tagline: string;
  github_username: string;
  linkedin_url: string;
  twitter_url: string;
}

const Resume = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [skillsRes, timelineRes, settingsRes] = await Promise.all([
        supabase.from('skills').select('*').order('category'),
        supabase.from('timeline_items').select('*').order('start_date', { ascending: false }),
        supabase.from('site_settings').select('*').maybeSingle(),
      ]);

      if (skillsRes.data) setSkills(skillsRes.data);
      if (timelineRes.data) setTimeline(timelineRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load resume data');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${settings?.profile_name || 'Resume'}_CV`,
  });

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const education = timeline.filter(item => item.type === 'education');
  const experience = timeline.filter(item => item.type === 'experience');
  const certificates = timeline.filter(item => item.type === 'certificate');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6 flex justify-end print:hidden">
          <Button onClick={handlePrint} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Download CV as PDF
          </Button>
        </div>

        <div
          ref={componentRef}
          className="bg-card rounded-lg shadow-2xl p-8 md:p-12 print:shadow-none print:p-8"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-border">
            <div className="flex-shrink-0">
              <img
                src={profileImage}
                alt={settings?.profile_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-3d-blue mb-2">
                {settings?.profile_name || 'Your Name'}
              </h1>
              <p className="text-xl text-panda-purple mb-4">{settings?.tagline}</p>
              <p className="text-muted-foreground mb-4">{settings?.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {settings?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{settings.email}</span>
                  </div>
                )}
                {settings?.github_username && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-primary" />
                    <span>{settings.github_username}</span>
                  </div>
                )}
                {settings?.linkedin_url && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span>LinkedIn</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-3d-red mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((item) => (
                  <div key={item.id} className="border-l-2 border-primary pl-4">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-panda-orange font-medium">{item.organization}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                      {item.is_current
                        ? 'Present'
                        : item.end_date
                        ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        : 'Present'}
                    </p>
                    {item.description && <p className="text-sm">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-3d-orange mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.id} className="border-l-2 border-panda-orange pl-4">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-panda-purple font-medium">{item.organization}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                      {item.is_current
                        ? 'Present'
                        : item.end_date
                        ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        : 'Present'}
                    </p>
                    {item.description && <p className="text-sm">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {Object.keys(groupedSkills).length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-3d-blue mb-4">Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-panda-purple mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-3d-purple mb-4">Certificates & Achievements</h2>
              <div className="space-y-2">
                {certificates.map((item) => (
                  <div key={item.id} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">{item.title}</span>
                      {item.organization && <span className="text-muted-foreground"> - {item.organization}</span>}
                      {item.start_date && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({new Date(item.start_date).getFullYear()})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
