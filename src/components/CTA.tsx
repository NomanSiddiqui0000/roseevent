import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function CTA() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const navigate = useNavigate();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury event"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-accent/50" />
          <div className="w-2 h-2 rounded-full border border-accent/50" />
          <div className="w-12 h-px bg-accent/50" />
        </div>

        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-[1.05] tracking-[-1px]">
          Let's Create Something
          <span className="block text-accent mt-2">Extraordinary</span>
        </h2>

        <p className="font-sans text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-[1.9]">
          Your dream celebration begins with a conversation. Let us craft an unforgettable experience that exceeds all expectations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/contact')}
            className="px-10 py-4 bg-accent text-white font-sans font-bold tracking-[1.5px] uppercase text-sm rounded-[10px] transition-all duration-300 hover:bg-accent-dark hover:shadow-luxury hover:-translate-y-1"
          >
            Book Your Consultation
          </button>
          <a
            href="tel:+1234567890"
            className="px-10 py-4 border border-white/50 text-white font-sans font-bold tracking-[1.5px] uppercase text-sm rounded-[10px] transition-all duration-300 hover:bg-white/10 hover:border-white"
          >
            Call Us Now
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-white/20">
          {[
            { value: '250+', label: 'Events' },
            { value: '100%', label: 'Satisfaction' },
            { value: '8+', label: 'Years' },
          ].map((stat, index) => (
            <div key={index} className="text-center px-4">
              <div className="font-serif text-2xl text-accent">{stat.value}</div>
              <div className="font-sans font-bold text-[11px] text-white/60 uppercase tracking-[2px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}