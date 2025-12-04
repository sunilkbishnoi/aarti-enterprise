import { Phone, Mail, FileText, MapPin } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-charcoal text-white py-2.5 text-sm hidden lg:block border-b border-charcoal-light/50 relative overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal-light/20 to-charcoal opacity-50" />
      
      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-8">
          <a 
            href="tel:+919427055205" 
            className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors group"
          >
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Phone className="w-3 h-3 text-primary" />
            </div>
            <span className="font-medium">+91 94270 55205</span>
          </a>
          <a 
            href="tel:+919825355205" 
            className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors group"
          >
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Phone className="w-3 h-3 text-primary" />
            </div>
            <span className="font-medium">+91 98253 55205</span>
          </a>
          <a 
            href="mailto:aartienterprise05@gmail.com" 
            className="flex items-center gap-2 text-white/80 hover:text-primary transition-colors group"
          >
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Mail className="w-3 h-3 text-primary" />
            </div>
            <span className="font-medium">aartienterprise05@gmail.com</span>
          </a>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white/60">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Vadodara, Gujarat</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
              <FileText className="w-3 h-3 text-primary" />
            </div>
            <span>GSTIN:</span>
            <span className="font-bold font-mono text-primary">24AEHPV3369L1ZW</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;