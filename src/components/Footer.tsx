import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-12 h-12" />
              <div>
                <h3 className="font-display text-xl font-bold text-secondary">AARTI ENTERPRISE</h3>
                <p className="text-sm text-muted-foreground">Premium SS & Aluminium</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Vadodara's trusted supplier of premium stainless steel pipes, sheets, designer panels, 
              and aluminium sections. Serving Gujarat with quality products since 10+ years.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/919427055205" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'SS Pipes', path: '/products?category=ss-pipes' },
                { name: 'SS Sheets', path: '/products?category=ss-sheets' },
                { name: 'Designer Sheets', path: '/products?category=designer-sheets' },
                { name: 'SS Railing', path: '/products?category=ss-railing' },
                { name: 'Glass Railing', path: '/products?category=glass-railing' },
                { name: 'Aluminium Sections', path: '/products?category=aluminium' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-primary">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919427055205" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>+91 94270 55205</p>
                    <p className="text-xs">Kishanlal Bishnoi</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+919825355205" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>+91 98253 55205</p>
                    <p className="text-xs">Kapil Bishnoi</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:aartienterprise05@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  aartienterprise05@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Clock className="w-4 h-4 flex-shrink-0" />
                Mon - Sat: 9:00 AM - 7:00 PM
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-primary">Our Locations</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-secondary mb-1">Office</p>
                  <p className="text-muted-foreground leading-relaxed">
                    316, K.P. Land Mark, 3rd Floor,<br />
                    Near Bright School, Vasna Bhaili Road,<br />
                    Vadodara - 391410
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-secondary mb-1">Shop</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Shop No.7, Yamuna Mill Complex,<br />
                    Pratapnagar - Dabhoi Road,<br />
                    Vadodara - 390004
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-light pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} AARTI ENTERPRISE. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              GSTIN: <span className="text-primary font-medium">24AEHPV3369L1ZW</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
