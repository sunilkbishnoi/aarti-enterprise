import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react';

const testimonials = [
  {
    name: 'Jayraj Thakor',
    role: 'Verified Customer',
    content: 'Best aluminium and glass railing also premium quality stainless steel available here.',
    rating: 5,
    timeAgo: 'Recently',
  },
  {
    name: 'Welcom Hotel',
    role: 'Business Client',
    content: 'Premium Quality Steel Railing and Glass Railing most durable and modern style.',
    rating: 4,
    timeAgo: 'Recently',
  },
  {
    name: 'Prakash Bishnoi',
    role: 'Verified Customer',
    content: 'Best quality steel sheet in Vadodara.',
    rating: 5,
    timeAgo: '2 weeks ago',
  },
  {
    name: 'Samir Patel',
    role: 'Verified Customer',
    content: 'Best quality of premium Steel.',
    rating: 5,
    timeAgo: '3 weeks ago',
  },
  {
    name: 'Yash Jani',
    role: 'Verified Customer',
    content: 'Best Quality Available Here.',
    rating: 5,
    timeAgo: '2 weeks ago',
  },
  {
    name: 'Devendra Bishnoi',
    role: 'Verified Customer',
    content: 'Excellent service and top-notch quality products at AARTI ENTERPRISE. Highly recommended!',
    rating: 5,
    timeAgo: '2 months ago',
  },
];

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/8yqyyDvfVmiDfSeXA';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 400);
    }, 200);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, 'right');
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, 'left');
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 via-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-primary font-semibold tracking-wider text-sm mb-3 uppercase">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Trusted by builders, architects & designers across Gujarat
          </p>
        </div>

        {/* Google Rating Badge */}
        <div className="flex justify-center mb-12">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-5 py-2.5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-foreground text-lg">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <span className="text-muted-foreground text-sm">Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto relative">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/60 shadow-xl relative overflow-hidden">
              <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/[0.07]" />
              <Quote className="absolute bottom-8 right-8 w-12 h-12 text-primary/[0.05] rotate-180" />

              <div
                className="relative z-10 transition-all duration-500 ease-out"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating
                    ? `translateX(${direction === 'right' ? '-20px' : '20px'})`
                    : 'translateX(0)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-foreground text-center leading-relaxed mb-8 font-light">
                  <span className="text-primary/60">"</span>
                  {t.content}
                  <span className="text-primary/60">"</span>
                </p>

                {/* Author */}
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">
                    {t.name.charAt(0)}
                  </div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-sm">{t.role}</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">{t.timeAgo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index, index > current ? 'right' : 'left')}
                  className={`rounded-full transition-all duration-500 ease-out ${
                    index === current
                      ? 'w-8 h-2.5 bg-primary'
                      : 'w-2.5 h-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* CTA to Google Reviews */}
          <div className="text-center mt-8">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Read all reviews on Google
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
