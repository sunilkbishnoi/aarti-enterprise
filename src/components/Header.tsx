import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingBag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInquiry } from '@/context/InquiryContext';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useInquiry();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl shadow-soft border-b border-border' 
          : 'bg-background/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo />
            <div>
              <h1 className="font-display text-sm sm:text-lg md:text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                AARTI ENTERPRISE
              </h1>
              <p className="hidden sm:block text-xs text-muted-foreground">Premium SS & Aluminium</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/inquiry" className="relative group">
              <Button 
                variant="outline" 
                size="icon" 
                className="border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-gold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <a href="tel:+919427055205" className="hidden md:block">
              <Button className="btn-modern gap-2 h-10">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <nav className="py-4 border-t border-border">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-3 px-4 text-sm font-medium transition-all rounded-lg mx-2 mb-1 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
            <div className="px-4 pt-4 mt-4 border-t border-border">
              <a 
                href="tel:+919427055205" 
                className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Kishanlal</p>
                  <p>+91 94270 55205</p>
                </div>
              </a>
              <a 
                href="tel:+919825355205" 
                className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Kapil</p>
                  <p>+91 98253 55205</p>
                </div>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;