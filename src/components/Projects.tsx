import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Projects = () => {
  const projects = [
    {
      title: 'Parental Control App',
      description: 'Android application for parents to monitor GPS location, app usage, and safety alerts using Firebase real-time database.',
      tools: ['Android Studio', 'Java', 'Firebase', 'Google Maps API'],
      image: '📱',
      demo: '#',
      source: '#',
    },
    {
      title: 'Revision App',
      description: 'Student productivity and revision tracker with smart scheduling, progress monitoring, and performance analytics.',
      tools: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
      image: '📚',
      demo: '#',
      source: '#',
    },
    {
      title: 'Loveable AI Portfolio',
      description: 'AI-powered personal assistant portfolio website with intelligent chat interface and dynamic content generation.',
      tools: ['React', 'TypeScript', 'TailwindCSS', 'OpenAI API'],
      image: '🤖',
      demo: '#',
      source: '#',
    },
    {
      title: 'Panda Tech Website',
      description: 'Comprehensive web solution for business automation and IT consulting with modern design and seamless user experience.',
      tools: ['React', 'Vite', 'Supabase', 'Framer Motion'],
      image: '🐼',
      demo: '#',
      source: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-red">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions and creative implementations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-background flex items-center justify-center text-8xl group-hover:scale-105 transition-transform">
                {project.image}
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-background border border-border rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground group/btn"
                  >
                    <ExternalLink className="mr-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    View Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-border hover:border-primary hover:text-primary group/btn"
                  >
                    <Github className="mr-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    Source Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
