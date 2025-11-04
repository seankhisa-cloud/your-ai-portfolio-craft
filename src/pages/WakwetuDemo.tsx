import { useState } from 'react';
import { ArrowLeft, Droplets, MessageSquare, MapPin, Phone, Mail, CheckCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import wakwetu from '@/assets/wakwetu.png';

const WakwetuDemo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', message: 'Hello! I\'m Wakwetu AI Assistant. How can I help you with borehole drilling services today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const services = [
    { title: 'Borehole Drilling', price: 'From $2,500', description: 'Professional drilling up to 100m depth', icon: Droplets },
    { title: 'Water Quality Testing', price: '$150', description: 'Comprehensive water analysis', icon: CheckCircle },
    { title: 'Pump Installation', price: 'From $800', description: 'Solar & electric pump systems', icon: Droplets },
    { title: 'Maintenance', price: '$100/visit', description: 'Regular maintenance & repairs', icon: CheckCircle },
  ];

  const aiResponses = [
    "We offer professional borehole drilling services from $2,500. Would you like to schedule a site inspection?",
    "Our drilling depth ranges from 30m to 100m depending on water table levels. What's your location?",
    "We provide both solar and electric pump installations. Solar pumps are great for remote areas!",
    "Our water quality testing service costs $150 and includes comprehensive analysis of all parameters.",
  ];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setChatMessages(prev => [...prev, { role: 'user', message: userInput }]);
    
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setChatMessages(prev => [...prev, { role: 'bot', message: response }]);
    }, 1000);

    setUserInput('');
  };

  const handleQuoteRequest = () => {
    toast({
      title: "Quote Request Sent!",
      description: "Our team will contact you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-panda-blue/5">
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
          <h1 className="text-5xl font-bold mb-4 text-3d-blue">
            Wakwetu Borehole Drilling
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional water solutions with AI-powered customer service
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <Card className="p-8 card-3d card-3d-blue">
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <img 
                src={wakwetu} 
                alt="Wakwetu"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-3d-blue">Our Services</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <div key={index} className="p-4 bg-background/50 rounded-lg border border-panda-blue/20 hover:border-panda-blue/40 transition-all group">
                    <ServiceIcon className="w-8 h-8 text-panda-blue mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-1">{service.title}</h3>
                    <Badge variant="secondary" className="mb-2">{service.price}</Badge>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
            <Button onClick={handleQuoteRequest} className="w-full mt-6">
              Request Free Quote
            </Button>
          </Card>

          <Card className="p-8 card-3d card-3d-purple">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-panda-purple" />
              <h2 className="text-2xl font-bold text-3d-purple">AI Chat Assistant</h2>
            </div>
            <div className="bg-background/50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-panda-blue text-white'
                        : 'bg-background border border-panda-purple/30'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <Input
                placeholder="Ask about our services..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>

        <Card className="p-8 card-3d card-3d-red max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-3d-red">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Phone className="w-8 h-8 text-panda-red mx-auto mb-2" />
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground">+254 123 456 789</p>
            </div>
            <div>
              <Mail className="w-8 h-8 text-panda-red mx-auto mb-2" />
              <p className="font-semibold">Email</p>
              <p className="text-muted-foreground">info@wakwetu.com</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-panda-red mx-auto mb-2" />
              <p className="font-semibold">Location</p>
              <p className="text-muted-foreground">Nairobi, Kenya</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WakwetuDemo;
