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
              <div className="absolute inset-0 bg-panda-red rounded-full blur-3xl opacity-30 animate-glow-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-panda-red via-panda-orange to-panda-blue rounded-full blur-2xl opacity-20 animate-float" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-panda-red shadow-[0_0_50px_rgba(255,0,0,0.5)] animate-float">
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
              <p className="text-panda-orange text-lg font-medium text-3d-orange">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-3d-red">
                Laban Khisa
              </h1>
            </div>

            <Card className="inline-block bg-card/80 backdrop-blur-md card-3d-blue border-panda-blue/30 p-4 md:p-6">
              <div className="text-xl md:text-2xl text-panda-orange space-y-1 text-3d-orange">
                <p>Software Engineer</p>
                <p>Data Scientist</p>
                <p>IT Consultant</p>
              </div>
              <p className="mt-4 text-lg max-w-xl text-foreground/80">
                Transforming data, code, and ideas into meaningful digital experiences.
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-panda-red hover:bg-panda-red/90 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] group transition-all"
              >
                View My Work
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-panda-orange text-panda-orange hover:bg-panda-orange hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.3)]"
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-panda-red/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-panda-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-panda-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-panda-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  );
};

export default Hero;
