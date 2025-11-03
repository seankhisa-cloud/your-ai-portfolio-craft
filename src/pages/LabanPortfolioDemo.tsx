import { ArrowLeft, Sparkles, Code, Palette, Zap, Github, Linkedin, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import laban from '@/assets/laban-profile.png';

const LabanPortfolioDemo = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Design',
      description: 'Smart animations and interactive elements that respond to user behavior',
      color: 'text-panda-purple'
    },
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, TailwindCSS for optimal performance',
      color: 'text-panda-blue'
    },
    {
      icon: Palette,
      title: 'Beautiful UI/UX',
      description: 'Carefully crafted design system with smooth animations and transitions',
      color: 'text-panda-orange'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with Vite and efficient code splitting',
      color: 'text-panda-red'
    },
  ];

  const techStack = [
    'React', 'TypeScript', 'TailwindCSS', 'Vite', 'React Router', 
    'Framer Motion', 'Radix UI', 'Supabase', 'Lovable Cloud'
  ];

  const highlights = [
    { label: 'Interactive Sections', value: '8+' },
    { label: 'Projects Showcased', value: '5+' },
    { label: 'Technologies Used', value: '15+' },
    { label: 'Admin Features', value: 'Full CMS' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-panda-purple/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-panda-purple/10"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Portfolio
        </Button>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-3d-purple">
            Laban AI Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern, AI-enhanced portfolio website showcasing projects and skills
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <Card className="p-8 card-3d card-3d-purple">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-3d-purple">About This Portfolio</h2>
                <p className="text-muted-foreground mb-6">
                  This portfolio website represents the cutting edge of modern web development, 
                  combining beautiful design with powerful functionality. Built with the latest 
                  technologies and best practices, it showcases not just projects, but the art 
                  of creating exceptional user experiences.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {highlights.map((item, index) => (
                    <div key={index} className="text-center p-4 bg-background/50 rounded-lg border border-panda-purple/20">
                      <div className="text-3xl font-bold text-panda-purple mb-1">{item.value}</div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={laban} 
                  alt="Laban Portfolio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 card-3d hover:scale-105 transition-transform">
                  <Icon className={`w-10 h-10 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 card-3d card-3d-blue">
            <h2 className="text-3xl font-bold mb-6 text-3d-blue">Technology Stack</h2>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-base py-2 px-4">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-8 card-3d card-3d-red">
            <h2 className="text-3xl font-bold mb-6 text-center text-3d-red">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <h3 className="font-bold mb-2">Beautiful Design</h3>
                <p className="text-sm text-muted-foreground">
                  Modern UI with smooth animations and responsive layouts
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-bold mb-2">Admin Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Full CMS to manage projects, blog posts, and site content
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-bold mb-2">Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized for speed with lazy loading and code splitting
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 card-3d card-3d-orange text-center">
            <h2 className="text-3xl font-bold mb-4 text-3d-orange">Get in Touch</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Interested in creating something similar? Let's connect and discuss your project.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg">
                <Github className="mr-2 w-5 h-5" />
                GitHub
              </Button>
              <Button variant="outline" size="lg">
                <Linkedin className="mr-2 w-5 h-5" />
                LinkedIn
              </Button>
              <Button size="lg">
                <Mail className="mr-2 w-5 h-5" />
                Contact
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LabanPortfolioDemo;
