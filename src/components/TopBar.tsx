import { Phone, Mail, FileText } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-charcoal text-secondary py-2.5 text-sm hidden lg:block border-b border-charcoal-light">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <a href="tel:+919427055205" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>+91 94270 55205</span>
          </a>
          <a href="tel:+919825355205" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>+91 98253 55205</span>
          </a>
          <a href="mailto:aartienterprise05@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>aartienterprise05@gmail.com</span>
          </a>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <FileText className="w-3.5 h-3.5 text-primary" />
          <span>GSTIN:</span>
          <span className="font-semibold text-primary">24AEHPV3369L1ZW</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
