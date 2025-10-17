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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-3d-orange">
            About Me
          </h2>
          <div className="w-20 h-1 bg-panda-orange mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6 animate-slide-up">
            <Card className="p-6 bg-card/80 backdrop-blur-md card-3d-orange border-panda-orange/30">
              <p className="text-lg leading-relaxed text-panda-orange text-3d-orange">
                I am a passionate Software Engineer and Data Scientist with a strong foundation in mathematics, information systems, and computing.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                My journey combines analytical thinking with real-world problem solving — bridging data, technology, and human experience.
              </p>
            </Card>
            <Button
              size="lg"
              className="bg-panda-red hover:bg-panda-red/90 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] group transition-all"
            >
              <Download className="mr-2 group-hover:translate-y-1 transition-transform" />
              Download CV
            </Button>
          </div>

          {/* Education Cards */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {education.map((edu, index) => {
              const cardColors = ['card-3d-blue', 'card-3d-purple', 'card-3d-red'];
              const glowColors = ['glow-blue', 'glow-blue', 'glow-red'];
              return (
                <Card
                  key={index}
                  className={`p-6 bg-card/80 backdrop-blur-sm ${cardColors[index]} transition-all duration-300 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {edu.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 transition-colors ${glowColors[index]} ${index === 0 ? 'text-3d-blue' : index === 1 ? 'text-3d-purple' : 'text-3d-red'}`}>
                        {edu.degree}
                      </h3>
                      <p className="text-foreground/70">{edu.institution}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
