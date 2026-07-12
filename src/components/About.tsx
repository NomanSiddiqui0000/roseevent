import { useNavigate } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { useScrollReveal, useCounterAnimation } from '../hooks/useScrollReveal';

const stats = [
  { value: 250, suffix: '+', label: 'Luxury Events' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: '+', label: 'Award Winning Designs' },
];

export default function About() {
  const [leftRef, leftVisible] = useScrollReveal<HTMLDivElement>();
  const [rightRef, rightVisible] = useScrollReveal<HTMLDivElement>();
  const [statsRef, statsVisible] = useScrollReveal<HTMLDivElement>();
  const navigate = useNavigate();

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-white to-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="OUR STORY" scriptText="Elegance" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Collage */}
          <div
            ref={leftRef}
            className={`relative transition-all duration-1000 ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-card">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                alt="Elegant wedding celebration"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Secondary Image */}
            <div className="absolute -bottom-4 -right-4 w-36 h-36 sm:-bottom-8 sm:-right-8 sm:w-48 sm:h-48 rounded-sm overflow-hidden shadow-card border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&q=80"
                alt="Luxury event details"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 border border-accent/30 rounded-sm" />
            <div className="absolute -bottom-3 -left-6 sm:-bottom-6 sm:-left-12 w-24 h-24 sm:w-32 sm:h-32 border border-accent/20 rounded-sm" />
          </div>

          {/* Right - Content */}
          <div
            ref={rightRef}
            className={`lg:pl-8 transition-all duration-1000 ${
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <span className="label-luxury">
              About Us
            </span>
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mt-5 mb-8 leading-[1.15] tracking-[-0.5px]">
              Crafting Dreams Into
              <span className="block text-accent mt-2">Unforgettable Moments</span>
            </h3>
            <p className="mb-6">
              At Luxe Events, we believe every celebration is a canvas for creativity and elegance.
              With over a decade of experience in luxury event planning, our passionate team
              transforms your vision into breathtaking realities.
            </p>
            <p className="mb-10">
              From intimate gatherings to grand celebrations, we orchestrate every detail with
              precision and artistry. Our commitment to excellence has earned us a reputation
              as the premier choice for discerning clients who demand nothing but the finest.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-12">
              {['Personalized Approach', 'Premium Venues', 'Expert Team', 'Luxury Decor'].map(
                (feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="font-sans text-sm font-semibold text-gray-700 tracking-wide">{feature}</span>
                  </div>
                )
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-3 text-accent font-sans font-bold tracking-[1.5px] uppercase text-sm transition-colors hover:text-accent-dark group"
            >
              Explore Our Services
              <span className="w-8 h-px bg-accent transition-all duration-300 group-hover:w-12" />
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-gray-100 transition-all duration-1000 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCounterAnimation(value, 2000);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-serif text-5xl md:text-6xl text-black mb-2">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="font-sans text-xs font-semibold text-gray-500 tracking-[3px] uppercase">{label}</p>
    </div>
  );
}