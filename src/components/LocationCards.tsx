import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const locations = [
  {
    type: 'Office',
    address: '3rd Floor, 316, K.P. Land Mark, Near Bright School, Vasna-Bhayli Road, Vadodara, Gujarat - 391410',
    phone: '+91 94270 55205',
    contact: 'Kishanlal Bishnoi',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.5!2d73.13277077821304!3d22.29067417452709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE3JzI2LjQiTiA3M8KwMDcnNTguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    coordinates: { lat: 22.29067417452709, lng: 73.13277077821304 },
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=22.29067417452709,73.13277077821304',
  },
  {
    type: 'Shop',
    address: 'Shop No. 7, Yamuna Mill Complex, Pratapnagar-Dabhoi Road, Vadodara, Gujarat - 390004',
    phone: '+91 98253 55205',
    contact: 'Kapil Bishnoi',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.5!2d73.21792258468683!3d22.281926183008654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE2JzU1LjAiTiA3M8KwMTMnMDQuNSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    coordinates: { lat: 22.281926183008654, lng: 73.21792258468683 },
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=22.281926183008654,73.21792258468683',
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
