import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';
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
  const location = useLocation();
  const { totalItems } = useInquiry();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <div className="hidden sm:block">
              <h1 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
                AARTI ENTERPRISE
              </h1>
              <p className="text-xs text-muted-foreground">Premium SS & Aluminium</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors link-underline ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/inquiry" className="relative">
              <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <a href="tel:+919427055205" className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 pt-4 flex flex-col gap-3">
              <a href="tel:+919427055205" className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" /> Kishanlal: +91 94270 55205
              </a>
              <a href="tel:+919825355205" className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" /> Kapil: +91 98253 55205
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
