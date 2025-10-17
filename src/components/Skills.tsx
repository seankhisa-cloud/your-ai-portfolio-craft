import { Code2, Brain, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: Code2,
      skills: [
        'Python',
        'JavaScript',
        'Java',
        'SQL',
        'React',
        'Node.js',
        'Android Studio',
        'Firebase',
        'Supabase',
        'Vite',
        'TailwindCSS',
        'Pandas',
        'NumPy',
        'Scikit-learn',
        'TensorFlow',
        'Data Visualization',
      ],
    },
    {
      title: 'Analytical Skills',
      icon: Brain,
      skills: [
        'Machine Learning',
        'Data Analysis',
        'Predictive Modeling',
        'Statistical Inference',
        'Deep Learning',
        'Data Mining',
        'Pattern Recognition',
        'Algorithm Design',
      ],
    },
    {
      title: 'Soft Skills',
      icon: Users,
      skills: [
        'Problem Solving',
        'Leadership',
        'Communication',
        'Team Collaboration',
        'Project Management',
        'Critical Thinking',
        'Adaptability',
        'Time Management',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-red">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building innovative solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const cardColors = ['card-3d-red', 'card-3d-orange', 'card-3d-blue'];
            const iconBgColors = ['bg-panda-red/10', 'bg-panda-orange/10', 'bg-panda-blue/10'];
            const iconColors = ['text-panda-red', 'text-panda-orange', 'text-panda-blue'];
            const glowColors = ['glow-red', 'glow-orange', 'glow-blue'];
            return (
              <Card
                key={index}
                className={`p-8 bg-card/80 backdrop-blur-sm card-3d ${cardColors[index]} group animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${iconBgColors[index]} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${iconColors[index]}`} />
                  </div>
                  <h3 className={`text-2xl font-bold transition-all duration-300 ${glowColors[index]}`}>
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 bg-background/50 border border-panda-purple/30 rounded-full text-sm hover:border-panda-purple hover:text-panda-purple hover:bg-panda-purple/10 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
