import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import loveamerifrikah from '@/assets/loveamerifrikah.png';
import wakwetu from '@/assets/wakwetu.png';
import quicklink from '@/assets/quicklink.png';
import laban from '@/assets/laban.png';

const Projects = () => {
  const projects = [
    {
      title: 'LoveAmeriAfrikah Enterprises',
      description: 'International business consultancy and general merchant company website with modern design, bridging trade connections between continents.',
      tools: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      image: loveamerifrikah,
      demo: '#',
      source: '#',
    },
    {
      title: 'Wakwetu Borehole Drilling',
      description: 'Professional borehole drilling and water solutions website with AI chatbot integration for customer service and consultation.',
      tools: ['React', 'Next.js', 'TailwindCSS', 'OpenAI API'],
      image: wakwetu,
      demo: '#',
      source: '#',
    },
    {
      title: 'QUICKLINK Services',
      description: 'Multi-service platform app connecting customers with local stores, restaurants, drivers and service professionals for marketplace, food delivery, taxi and property services.',
      tools: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
      image: quicklink,
      demo: '#',
      source: '#',
    },
    {
      title: 'Laban Portfolio',
      description: 'AI-powered personal portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.',
      tools: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      image: laban,
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
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-background overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
