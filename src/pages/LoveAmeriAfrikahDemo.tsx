import { useState } from 'react';
import { ArrowLeft, Globe, TrendingUp, Users, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import loveamerifrikah from '@/assets/loveamerifrikah-about.png';

const LoveAmeriAfrikahDemo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const services = [
    { title: 'Import/Export Services', description: 'Facilitating trade between Africa and Americas', icon: Globe },
    { title: 'Business Consulting', description: 'Strategic guidance for international expansion', icon: TrendingUp },
    { title: 'Market Research', description: 'In-depth analysis of target markets', icon: Users },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll contact you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-panda-purple/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-panda-blue/10"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Portfolio
        </Button>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-3d-red">
            LoveAmeriAfrikah Enterprises
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging continents through strategic trade partnerships and business consulting
          </p>
        </div>

        <Tabs defaultValue="about" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-8">
            <Card className="p-8 card-3d card-3d-blue">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-3d-blue">Our Mission</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    LoveAmeriAfrikah Enterprises is dedicated to fostering economic growth 
                    by connecting businesses across Africa and the Americas.
                  </p>
                  <p className="text-muted-foreground">
                    With deep expertise in international trade, customs regulations, and 
                    cross-cultural business practices, we help companies navigate the 
                    complexities of global commerce.
                  </p>
                </div>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img 
                    src={loveamerifrikah} 
                    alt="LoveAmeriAfrikah"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="p-6 card-3d card-3d-orange hover:scale-105 transition-transform">
                    <Icon className="w-12 h-12 text-panda-orange mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-3d-orange">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="p-8 card-3d card-3d-red max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-3d-red">Get in Touch</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-panda-red" />
                  <span>info@loveamerifrikah.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-panda-red" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-panda-red" />
                  <span>International Business Center, USA</span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                />
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoveAmeriAfrikahDemo;
