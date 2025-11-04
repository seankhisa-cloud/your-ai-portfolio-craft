import { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold text-primary glow-red hover:scale-105 transition-transform"
          >
            LK<span className="text-foreground">.</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => navigate('/admin')}
                    className="border-panda-blue/50 text-panda-blue hover:bg-panda-blue hover:text-white"
                  >
                    Admin
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="border-panda-red/50 text-panda-red hover:bg-panda-red hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/auth')}
                className="border-panda-blue/50 text-panda-blue hover:bg-panda-blue hover:text-white"
              >
                <LogIn className="mr-2 w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-primary transition-colors text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate('/admin');
                        setIsMobileMenuOpen(false);
                      }}
                      className="border-panda-blue/50 text-panda-blue hover:bg-panda-blue hover:text-white"
                    >
                      Admin
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="border-panda-red/50 text-panda-red hover:bg-panda-red hover:text-white"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="border-panda-blue/50 text-panda-blue hover:bg-panda-blue hover:text-white"
                >
                  <LogIn className="mr-2 w-4 h-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
