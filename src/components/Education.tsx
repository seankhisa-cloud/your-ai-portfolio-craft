import { GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Education = () => {
  const education = [
    {
      degree: 'MSc in Data Science',
      institution: 'WorldQuant University',
      period: '2023 - 2025',
      focus: ['Machine Learning', 'Statistics', 'Data Analytics', 'Quantitative Finance'],
      icon: '🧠',
    },
    {
      degree: 'BSc in Mathematics & Computer Science',
      institution: 'Technical University of Mombasa',
      period: '2018 - 2022',
      focus: ['Algorithms', 'Computation', 'Mathematical Modeling', 'Software Engineering'],
      icon: '🧮',
    },
    {
      degree: 'BSc in Information Science',
      institution: 'Technical University of Mombasa',
      period: '2018 - 2022',
      focus: ['Information Systems', 'ICT Integration', 'Database Management', 'Systems Analysis'],
      icon: '💾',
    },
  ];

  return (
    <section id="education" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-red">
            Education
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation built on mathematics, data science, and computing
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-border hover:border-primary transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl group-hover:bg-primary/20 transition-colors">
                    {edu.icon}
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        {edu.institution}
                      </span>
                      <span className="hidden md:block">•</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Focus Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.focus.map((area, areaIndex) => (
                        <span
                          key={areaIndex}
                          className="px-3 py-1.5 bg-background border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-all cursor-default"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
