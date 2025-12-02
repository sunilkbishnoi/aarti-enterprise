const brands = [
  { name: "Jindal Stainless", description: "Premium Quality" },
  { name: "Salem Steel", description: "SAIL Certified" },
  { name: "POSCO", description: "Korean Excellence" },
  { name: "Viraj Profiles", description: "Industry Leader" },
  { name: "TATA Steel", description: "Trusted Brand" },
  { name: "Arcelor Mittal", description: "Global Standard" },
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group bg-card border border-border rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <span className="text-xl md:text-2xl font-bold text-primary">
                  {brand.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
