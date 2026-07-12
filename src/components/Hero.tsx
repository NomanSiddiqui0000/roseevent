import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    title: 'Creating Timeless Celebrations',
    subtitle: 'Luxury weddings, bespoke celebrations and unforgettable experiences crafted with elegance.',
  },
  {
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1920&q=80',
    title: 'Where Dreams Meet Reality',
    subtitle: 'Every detail meticulously designed. Every moment perfectly orchestrated.',
  },
  {
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1920&q=80',
    title: 'Elegance in Every Detail',
    subtitle: 'From intimate gatherings to grand celebrations, we create magic.',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Ken Burns Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-100 animate-zoom-slow"
            style={{
              backgroundImage: `url(${slide.image})`,
              animationDuration: '12s',
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Element */}
          <div
            className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-px bg-accent/50" />
            <div className="w-2 h-2 rounded-full border border-accent/50" />
            <div className="w-12 h-px bg-accent/50" />
          </div>

          {/* Main Title — luxury magazine-style */}
          <h1
            className={`font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-2px] mb-6 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {slides[currentSlide].title}
          </h1>

          {/* Script Accent */}
          <p
            className={`heading-script text-accent text-4xl md:text-5xl lg:text-6xl mb-8 transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Luxury Events
          </p>

          {/* Subtitle */}
          <p
            className={`text-white/80 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-14 leading-relaxed transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={() => navigate('/contact')}
              className="btn-hero btn-hero--primary"
            >
              <span className="btn-hero__text">Book Your Event</span>
              <span className="btn-hero__arrow">
                <ArrowRight size={16} strokeWidth={1.5} />
              </span>
            </button>
            <button
              onClick={() => navigate('/portfolio')}
              className="btn-hero btn-hero--secondary"
            >
              <span className="btn-hero__text">View Portfolio</span>
              <span className="btn-hero__arrow">
                <ArrowRight size={16} strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-10 h-1 bg-accent'
                  : 'w-1 h-1 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => navigate('/about')}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 transition-all duration-300 hover:text-white animate-float"
        >
          <span className="text-xs font-semibold tracking-[2px] uppercase">Learn More</span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
