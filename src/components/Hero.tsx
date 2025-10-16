import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import profileImage from '@/assets/laban.png';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-end order-1 md:order-1 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-30 animate-glow-pulse" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary glow-red-box animate-float">
                <img
                  src={profileImage}
                  alt="Laban Khisa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center md:text-left order-2 md:order-2 space-y-6 animate-slide-up">
            <div className="space-y-2">
              <p className="text-primary text-lg font-medium">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold">
                Laban Khisa
              </h1>
            </div>

            <Card className="inline-block bg-card/70 backdrop-blur-md border-border p-4 md:p-6">
              <div className="text-xl md:text-2xl text-[hsl(var(--gold))] space-y-1">
                <p>Software Engineer</p>
                <p>Data Scientist</p>
                <p>IT Consultant</p>
              </div>
              <p className="mt-4 text-lg max-w-xl text-[hsl(var(--gold))]">
                Transforming data, code, and ideas into meaningful digital experiences.
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                View My Work
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default Hero;
