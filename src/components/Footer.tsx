import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="relative bg-charcoal text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Main Footer */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* CTA Section */}
          <div className="glass-dark rounded-2xl p-8 md:p-12 mb-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Get a free consultation and quotation from our experts. We're here to help you find the perfect solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+919427055205" className="btn-modern inline-flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call: +91 94270 55205
              </a>
              <a 
                href="https://wa.me/919427055205" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 text-white hover:bg-white/10 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-12 h-12" />
                <div>
                  <h3 className="font-display text-xl font-bold text-white">AARTI ENTERPRISE</h3>
                  <p className="text-sm text-white/50">Est. 2013</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Gujarat's trusted supplier of premium stainless steel and aluminium products. 
                Serving builders, architects & industrial clients with quality materials.
              </p>
              <div className="flex gap-3">
                <a href="https://wa.me/919427055205" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.instagram.com/aartienterprise.in" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group">
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.facebook.com/people/Aarti-Enterprise/61560933046455/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group">
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-white">Products</h4>
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
                    <Link 
                      to={link.path} 
                      className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-white">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+919427055205" className="flex items-start gap-3 text-white/60 hover:text-primary transition-colors text-sm group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Kishanlal Bishnoi</p>
                      <p>+91 94270 55205</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="tel:+919825355205" className="flex items-start gap-3 text-white/60 hover:text-primary transition-colors text-sm group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Kapil Bishnoi</p>
                      <p>+91 98253 55205</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:aartienterprise05@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="break-all">aartienterprise05@gmail.com</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/60 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  Mon - Sat: 9:00 AM - 7:00 PM
                </li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-display text-lg font-bold mb-6 text-white">Locations</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-white mb-1">Head Office</p>
                      <p className="text-white/50 leading-relaxed text-xs">
                        316, K.P. Land Mark, 3rd Floor,
                        Near Bright School, Vasna Bhaili Road,
                        Vadodara - 391410
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold text-white mb-1">Shop</p>
                      <p className="text-white/50 leading-relaxed text-xs">
                        Shop No.7, Yamuna Mill Complex,
                        Pratapnagar - Dabhoi Road,
                        Vadodara - 390004
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} AARTI ENTERPRISE. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <p className="text-white/40 text-sm">
                  GSTIN: <span className="text-primary font-mono font-medium">24AEHPV3369L1ZW</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;