import brandJindal from '@/assets/brand-jindal.png';
import brandSalem from '@/assets/brand-salem.png';
import brandPosco from '@/assets/brand-posco.png';
import brandViraj from '@/assets/brand-viraj.png';
import brandTata from '@/assets/brand-tata.png';
import brandArcelormittal from '@/assets/brand-arcelormittal.png';
import brandAsbTubes from '@/assets/brand-asb-tubes.png';

const brands = [
  { name: "Jindal Stainless", logo: brandJindal },
  { name: "Salem Steel", logo: brandSalem },
  { name: "POSCO", logo: brandPosco },
  { name: "Viraj Profiles", logo: brandViraj },
  { name: "TATA Steel", logo: brandTata },
  { name: "ArcelorMittal", logo: brandArcelormittal },
  { name: "ASB Tubes", logo: brandAsbTubes, link: "https://asbtubes.com/" },
];

const TrustedBrands = () => {
  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-primary font-medium mb-2">OUR PARTNERS</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Trusted Brands We Stock
          </h2>
          <p className="text-muted-foreground mt-2">We supply genuine products from India's leading steel manufacturers</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6">
          {brands.map((brand) => {
            const content = (
              <>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-white flex items-center justify-center mb-3 overflow-hidden">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="font-semibold text-xs md:text-sm text-foreground group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
              </>
            );
            const className = "group bg-card border border-border rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300";
            
            return brand.link ? (
              <a key={brand.name} href={brand.link} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            ) : (
              <div key={brand.name} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
