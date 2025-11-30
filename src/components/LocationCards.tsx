import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const locations = [
  {
    type: 'Office',
    address: '3rd Floor, 316, K.P. Land Mark, Near Bright School, Vasna Bhaili Road, Vadodara, Gujarat - 391410',
    phone: '+91 94270 55205',
    contact: 'Kishanlal Bishnoi',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5!2d73.12!3d22.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE3JzI0LjAiTiA3M8KwMDcnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//K.P.+Land+Mark+Vasna+Bhaili+Road+Vadodara',
  },
  {
    type: 'Shop',
    address: 'Shop No.7, Yamuna Mill Complex, Pratapnagar - Dabhoi Road, Vadodara, Gujarat - 390004',
    phone: '+91 99825 69415',
    contact: 'Harish Bishnoi',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5!2d73.15!3d22.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE2JzQ4LjAiTiA3M8KwMDknMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    directionsUrl: 'https://www.google.com/maps/dir//Yamuna+Mill+Complex+Pratapnagar+Dabhoi+Road+Vadodara',
  },
];

const LocationCards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-medium mb-3">VISIT US</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Locations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our office or shop in Vadodara for product viewing and direct purchases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden card-hover animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Map */}
              <div className="aspect-video w-full">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${location.type} Location Map`}
                />
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {location.type}
                    </h3>
                    <p className="text-sm text-muted-foreground">{location.contact}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {location.address}
                  </p>
                  <a 
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    {location.phone}
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    {location.hours}
                  </div>
                </div>

                <a href={location.directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationCards;
