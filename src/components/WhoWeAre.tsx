import { useScrollReveal } from '../hooks/useScrollReveal';
import { Eye, Sparkles, Heart, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Creative Vision',
    description: 'Designs that transform your dreams into unforgettable celebrations.',
  },
  {
    icon: Sparkles,
    title: 'Luxury Planning',
    description: 'Every detail orchestrated with precision and timeless elegance.',
  },
  {
    icon: Heart,
    title: 'Personalized Service',
    description: 'Bespoke experiences crafted around your unique love story.',
  },
  {
    icon: CheckCircle,
    title: 'Seamless Execution',
    description: 'Flawless coordination from first consultation to final dance.',
  },
];

export default function WhoWeAre() {
  const [leftRef, leftVisible] = useScrollReveal<HTMLDivElement>();
  const [rightRef, rightVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative lg:min-h-screen flex items-center py-20 lg:py-0 bg-gradient-to-b from-white to-secondary overflow-hidden">
      {/* Background ambience */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] rounded-full bg-accent/4 blur-[180px]" />
        <div className="absolute -bottom-20 right-[10%] w-[380px] h-[380px] rounded-full bg-[#D8C3A5]/12 blur-[160px]" />
      </div>

      {/* Decorative botanical line art */}
      <div className="pointer-events-none absolute bottom-0 right-0 select-none" aria-hidden>
        <svg className="w-40 h-40 text-accent/10" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 120 C40 95, 50 75, 60 55 C70 35, 80 20, 95 15" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
          <path d="M60 55 C65 42, 75 35, 82 40 C88 45, 82 55, 72 62" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
          <path d="M40 85 C46 72, 56 65, 63 70 C70 75, 64 86, 52 92" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
          <circle cx="95" cy="15" r="3.5" fill="currentColor" opacity="0.4" />
          <circle cx="72" cy="62" r="2" fill="currentColor" opacity="0.25" />
          <circle cx="52" cy="92" r="1.5" fill="currentColor" opacity="0.2" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ═══ Left — editorial typography ═══ */}
          <div
            ref={leftRef}
            className={`relative transition-all duration-[1200ms] ease-out ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
          >
            {/* Corner accent — top-left */}
            <div
              className={`absolute -top-5 -left-5 w-20 h-20 border-l border-t border-accent/20 transition-all duration-1000 delay-300 ${
                leftVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Oversized WHO WE ARE */}
            <div className="relative overflow-visible">
              <span
                className="font-serif font-bold text-accent/45 leading-[0.82] tracking-[-3px] pointer-events-none select-none block"
                style={{ fontSize: 'clamp(4rem, 8vw, 11rem)' }}
              >
                WHO<br />WE<br />ARE
              </span>
            </div>

            {/* Vertical decorative divider with ornament */}
            <div className="flex flex-col items-center mt-6 lg:mt-10">
              <div
                className={`w-px h-16 bg-gradient-to-b from-transparent to-accent/40 transition-all duration-[1500ms] delay-500 ${
                  leftVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div
                className={`w-3 h-3 rotate-45 border border-accent/70 my-3 transition-all duration-700 delay-800 ${
                  leftVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              />
              <div
                className={`w-px h-16 bg-gradient-to-b from-accent/40 to-transparent transition-all duration-[1500ms] delay-500 ${
                  leftVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* Corner accent — bottom-right */}
            <div
              className={`absolute -bottom-5 -right-5 w-20 h-20 border-r border-b border-accent/20 transition-all duration-1000 delay-300 ${
                leftVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* ═══ Right — content ═══ */}
          <div
            ref={rightRef}
            className={`transition-all duration-1000 delay-200 ${
              rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* One-liner intro */}
            <p className="font-sans text-gray-500 leading-[1.8] text-[15px] mb-8">
              Creating extraordinary celebrations that linger in the heart, long after the last dance.
            </p>

            {/* 2 × 2 Feature grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <FeatureBlock key={i} {...f} index={i} visible={rightVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   Feature Block
   ════════════════════════════════════════════ */
function FeatureBlock({
  icon: Icon,
  title,
  description,
  index,
  visible,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="group relative p-6 rounded-xl bg-white/30 backdrop-blur-[2px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(155,44,79,0.10)]"
      style={{
        transitionDelay: visible ? `${index * 120}ms` : '0ms',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 600ms ease-out ${index * 120}ms, transform 600ms ease-out ${index * 120}ms, box-shadow 400ms ease, translate 400ms ease`,
      }}
    >
      {/* Accent line */}
      <div className="w-10 h-0.5 bg-accent/40 rounded-full mb-5 transition-all duration-500 group-hover:w-full group-hover:bg-accent/60" />

      {/* Icon */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent/20">
          <Icon size={22} className="text-accent/80 transition-all duration-500 group-hover:text-accent" />
        </div>
      </div>

      {/* Title */}
      <h4 className="font-serif text-xl text-[#1A1A1A] transition-all duration-500 group-hover:text-accent mb-2 leading-snug">
        {title}
      </h4>

      {/* Description */}
      <p className="font-sans text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
