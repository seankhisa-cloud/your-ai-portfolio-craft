import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          © 2025 Laban Khisa — Built with
          <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
          using React & TailwindCSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
