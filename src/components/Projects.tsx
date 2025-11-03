import { ExternalLink, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import loveamerifrikah from '@/assets/loveamerifrikah.png';
import wakwetu from '@/assets/wakwetu.png';
import quicklink from '@/assets/quicklink.png';
import laban from '@/assets/laban.png';
import n8nAutomation from '@/assets/n8n-automation-project.png';

const Projects = () => {
  const navigate = useNavigate();
  
  const projects = [
    {
      title: 'LoveAmeriAfrikah Enterprises',
      description: 'International business consultancy and general merchant company website with modern design, bridging trade connections between continents.',
      tools: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      image: loveamerifrikah,
      demo: '/loveamerifrikah-demo',
      source: '#',
    },
    {
      title: 'Wakwetu Borehole Drilling',
      description: 'Professional borehole drilling and water solutions website with AI chatbot integration for customer service and consultation.',
      tools: ['React', 'Next.js', 'TailwindCSS', 'OpenAI API'],
      image: wakwetu,
      demo: '/wakwetu-demo',
      source: '#',
    },
    {
      title: 'QUICKLINK Services',
      description: 'Multi-service platform app connecting customers with local stores, restaurants, drivers and service professionals for marketplace, food delivery, taxi and property services.',
      tools: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
      image: quicklink,
      demo: '/quicklink-demo',
      source: '#',
    },
    {
      title: 'Laban Portfolio',
      description: 'AI-powered personal portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.',
      tools: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      image: laban,
      demo: '/laban-portfolio-demo',
      source: '#',
    },
    {
      title: 'Enterprise Workflow Automation Platform',
      description: 'Complex n8n workflow automations integrating multiple SaaS tools, APIs, and databases. Built custom HTTP webhook triggers, automated Slack notifications, implemented CRM data sync (HubSpot/Salesforce), scheduled report generation with email distribution, and error handling with retry logic. Automated lead qualification workflows, customer onboarding sequences, and invoice processing pipelines reducing manual work by 80%.',
      tools: ['n8n', 'REST APIs', 'Webhooks', 'PostgreSQL', 'Slack API', 'HubSpot', 'Stripe'],
      image: n8nAutomation,
      demo: '/n8n-demo',
      source: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-3d-red">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions and creative implementations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const cardColors = ['card-3d-red', 'card-3d-orange', 'card-3d-blue', 'card-3d-purple'];
            const textColors = ['text-3d-red', 'text-3d-orange', 'text-3d-blue', 'text-3d-purple'];
            return (
              <Card
                key={index}
                className={`overflow-hidden bg-card/80 backdrop-blur-sm card-3d ${cardColors[index % 4]} group animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-panda-blue/20 via-panda-purple/10 to-background overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className={`text-2xl font-bold transition-all duration-300 ${textColors[index % 4]}`}>
                    {project.title}
                  </h3>
                  <p className="text-foreground/80">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1.5 bg-background/50 border border-panda-blue/30 rounded-full text-sm hover:border-panda-blue hover:bg-panda-blue/10 transition-all"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(project.demo)}
                      className="flex-1 border-panda-red/50 text-panda-red hover:bg-panda-red hover:text-white hover:border-panda-red group/btn"
                    >
                      <ExternalLink className="mr-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      View Demo
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-panda-blue/50 text-panda-blue hover:bg-panda-blue hover:text-white hover:border-panda-blue group/btn"
                    >
                      <Github className="mr-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Source Code
                    </Button>
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

export default Projects;
