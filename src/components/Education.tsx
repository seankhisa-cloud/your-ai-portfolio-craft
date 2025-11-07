import { GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  description: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
}

const Education = () => {
  const [education, setEducation] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const { data, error } = await supabase
        .from('timeline_items')
        .select('*')
        .eq('type', 'education')
        .order('start_date', { ascending: false });

      if (error) throw error;
      if (data) setEducation(data);
    } catch (error) {
      console.error('Error loading education:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (title: string) => {
    if (title.includes('Data Science')) return '🧠';
    if (title.includes('Mathematics')) return '🧮';
    if (title.includes('Information')) return '💾';
    return '🎓';
  };

  const getFocusAreas = (description: string) => {
    // Extract key terms from description
    if (description.includes('machine learning')) {
      return ['Machine Learning', 'Statistics', 'Data Analytics', 'Quantitative Finance'];
    } else if (description.includes('mathematical theory')) {
      return ['Algorithms', 'Computation', 'Mathematical Modeling', 'Software Engineering'];
    } else if (description.includes('information systems')) {
      return ['Information Systems', 'ICT Integration', 'Database Management', 'Systems Analysis'];
    }
    return [];
  };

  if (loading) {
    return (
      <section id="education" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-3d-purple">
            Education
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation built on mathematics, data science, and computing
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => {
            const cardColors = ['card-3d-purple', 'card-3d-blue', 'card-3d-orange'];
            const iconBgColors = ['bg-panda-purple/10', 'bg-panda-blue/10', 'bg-panda-orange/10'];
            const textColors = ['text-3d-purple', 'text-3d-blue', 'text-3d-orange'];
            const focusAreas = getFocusAreas(edu.description);
            const startYear = new Date(edu.start_date).getFullYear();
            const endYear = edu.is_current ? 'Present' : new Date(edu.end_date!).getFullYear();
            
            return (
              <Card
                key={edu.id}
                className={`p-8 bg-card/80 backdrop-blur-sm card-3d ${cardColors[index % 3]} group animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full ${iconBgColors[index % 3]} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}>
                      {getIcon(edu.title)}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${textColors[index % 3]}`}>
                        {edu.title}
                      </h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 text-foreground/70">
                        <span className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-panda-cyan" />
                          {edu.organization}
                        </span>
                        <span className="hidden md:block">•</span>
                        <span>{startYear} - {endYear}</span>
                      </div>
                    </div>
                    {focusAreas.length > 0 && (
                      <div>
                        <p className="text-sm text-foreground/60 mb-2">Focus Areas:</p>
                        <div className="flex flex-wrap gap-2">
                          {focusAreas.map((area, areaIndex) => (
                            <span
                              key={areaIndex}
                              className="px-3 py-1.5 bg-background/50 border border-panda-cyan/30 rounded-full text-sm hover:border-panda-cyan hover:text-panda-cyan hover:bg-panda-cyan/10 transition-all cursor-default"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
