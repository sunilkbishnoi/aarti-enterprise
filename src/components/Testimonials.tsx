import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Patel',
    role: 'Interior Designer, Vadodara',
    content: 'AARTI ENTERPRISE has been my go-to supplier for all stainless steel requirements. Their designer sheets are of exceptional quality and the pricing is very competitive.',
    rating: 5,
  },
  {
    name: 'Mukesh Shah',
    role: 'Builder & Contractor',
    content: 'I have been purchasing SS pipes and railings from them for over 5 years. Always reliable stock and excellent customer service. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Architect, Ahmedabad',
    content: 'The glass railing fittings from AARTI ENTERPRISE transformed our hotel lobby. Premium quality products at reasonable prices. Fast delivery too!',
    rating: 5,
  },
  {
    name: 'Sunil Agarwal',
    role: 'Factory Owner',
    content: 'Best wholesale prices for SS sheets in Gujarat. Their team is knowledgeable and helps select the right grade for each application.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-medium mb-3">TESTIMONIALS</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg relative overflow-hidden">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10" />
            
            <div className="relative z-10">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground text-center leading-relaxed mb-8 font-light italic">
                "{testimonials[current].content}"
              </p>

              <div className="text-center">
                <p className="font-display text-lg font-semibold text-foreground">
                  {testimonials[current].name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
