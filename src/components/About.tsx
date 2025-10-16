import { GraduationCap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const About = () => {
  const education = [
    {
      degree: 'MSc in Data Science',
      institution: 'WorldQuant University',
      icon: '🧠',
    },
    {
      degree: 'BSc in Mathematics & Computer Science',
      institution: 'Technical University of Mombasa',
      icon: '🧮',
    },
    {
      degree: 'BSc in Information Science',
      institution: 'Technical University of Mombasa',
      icon: '💾',
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6 animate-slide-up">
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--gold))' }}>
              I am a passionate Software Engineer and Data Scientist with a strong foundation in mathematics, information systems, and computing.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--gold))' }}>
              My journey combines analytical thinking with real-world problem solving — bridging data, technology, and human experience.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              <Download className="mr-2 group-hover:translate-y-1 transition-transform" />
              Download CV
            </Button>
          </div>

          {/* Education Cards */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {education.map((edu, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {edu.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
