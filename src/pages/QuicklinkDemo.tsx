import { useState } from 'react';
import { ArrowLeft, ShoppingBag, Utensils, Car, Home, Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import quicklink from '@/assets/quicklink.png';

const QuicklinkDemo = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { 
      icon: ShoppingBag, 
      title: 'Marketplace', 
      color: 'text-panda-red',
      items: [
        { name: 'Local Grocery Store', distance: '0.5 km', rating: 4.8 },
        { name: 'Electronics Shop', distance: '1.2 km', rating: 4.6 },
        { name: 'Fashion Boutique', distance: '0.8 km', rating: 4.9 },
      ]
    },
    { 
      icon: Utensils, 
      title: 'Food Delivery', 
      color: 'text-panda-orange',
      items: [
        { name: 'Pizza Palace', distance: '1.5 km', rating: 4.7, time: '25-35 min' },
        { name: 'Burger House', distance: '2.1 km', rating: 4.5, time: '30-40 min' },
        { name: 'Sushi Bar', distance: '1.8 km', rating: 4.9, time: '35-45 min' },
      ]
    },
    { 
      icon: Car, 
      title: 'Taxi Service', 
      color: 'text-panda-blue',
      items: [
        { name: 'Quick Ride', distance: '2 min away', rating: 4.8, price: '$5-8' },
        { name: 'Comfort Taxi', distance: '5 min away', rating: 4.7, price: '$6-10' },
        { name: 'Premium Drive', distance: '3 min away', rating: 4.9, price: '$10-15' },
      ]
    },
    { 
      icon: Home, 
      title: 'Property', 
      color: 'text-panda-purple',
      items: [
        { name: 'Modern Apartment', distance: 'City Center', rating: 4.6, price: '$1,200/mo' },
        { name: 'Family House', distance: 'Suburbs', rating: 4.8, price: '$2,500/mo' },
        { name: 'Studio Flat', distance: 'Downtown', rating: 4.5, price: '$800/mo' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-panda-red/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-panda-red/10"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Portfolio
        </Button>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-3d-red">
            QUICKLINK Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your one-stop platform for marketplace, food delivery, taxi, and property services
          </p>
        </div>

        <Card className="p-6 mb-8 card-3d card-3d-orange max-w-4xl mx-auto">
          <div className="aspect-video overflow-hidden rounded-lg mb-6">
            <img 
              src={quicklink} 
              alt="QUICKLINK"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for stores, restaurants, rides, or properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>
        </Card>

        <Tabs defaultValue="marketplace" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="taxi">Taxi</TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
          </TabsList>

          {services.map((service, serviceIndex) => {
            const Icon = service.icon;
            return (
              <TabsContent 
                key={serviceIndex} 
                value={service.title.toLowerCase().replace(' ', '')}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="p-6 card-3d hover:scale-105 transition-transform">
                      <div className="flex items-start justify-between mb-4">
                        <Icon className={`w-8 h-8 ${service.color}`} />
                        <Badge variant="secondary">★ {item.rating}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{item.distance}</span>
                        </div>
                        {item.time && (
                          <p className="text-sm">Delivery: {item.time}</p>
                        )}
                        {item.price && (
                          <p className="text-sm font-semibold text-foreground">{item.price}</p>
                        )}
                      </div>
                      <Button className="w-full mt-4">
                        {service.title === 'Marketplace' || service.title === 'Food Delivery' ? 'Order Now' : 
                         service.title === 'Taxi Service' ? 'Book Ride' : 'View Details'}
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default QuicklinkDemo;
