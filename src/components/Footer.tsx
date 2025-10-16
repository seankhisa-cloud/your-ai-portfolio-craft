import { Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-12 px-4 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold">Laban Khisa</h3>
            <p className="text-muted-foreground text-sm">
              Software Engineer | Data Scientist | IT Consultant
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Let's Connect</h4>
            <p className="text-muted-foreground text-sm">
              Feel free to reach out for collaborations or opportunities.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            © 2025 Laban Khisa — Built with
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            using React & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
