import { useRef, useState } from 'react';
import { useScrollReveal, useCounterAnimation } from '../hooks/useScrollReveal';
import SectionHeading from './SectionHeading';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Publication data ──────────────────── */
const publications = [
  { name: 'VOGUE WEDDINGS', sub: 'Weddings' },
  { name: 'MARTHA STEWART WEDDINGS', sub: '' },
  { name: 'THE KNOT', sub: '' },
  { name: 'BRIDES', sub: 'Magazine' },
  { name: 'WEDDINGWIRE', sub: '' },
  { name: "HARPER'S BAZAAR", sub: 'Weddings' },
  { name: 'TOWN & COUNTRY', sub: '' },
  { name: 'STYLE ME PRETTY', sub: '' },
];

const trustStats = [
  { value: 25, suffix: '+', label: 'Media Features' },
  { value: 10, suffix: '+', label: 'Luxury Publications' },
  { value: 100, suffix: '+', label: 'Featured Events' },
];

/* ── SVG publication logos ─────────────── */
function VogueLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="Vogue Weddings">
      <text x="140" y="38" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="700" fontSize="34" fill="#2D2D2D" letterSpacing="8">VOGUE</text>
      <line x1="50" y1="48" x2="230" y2="48" stroke="#9B2C4F" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="140" y="68" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="300" fontSize="11" fill="#888" letterSpacing="4">WEDDINGS</text>
    </svg>
  );
}

function MarthaLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="Martha Stewart Weddings">
      <text x="140" y="42" textAnchor="middle" fontFamily="'Great Vibes',cursive" fontSize="36" fill="#7A1F3D">Martha Stewart</text>
      <text x="140" y="64" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="600" fontSize="13" fill="#2D2D2D" letterSpacing="5">WEDDINGS</text>
      <line x1="60" y1="72" x2="220" y2="72" stroke="#9B2C4F" strokeWidth="0.4" strokeOpacity="0.2" />
    </svg>
  );
}

function KnotLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="The Knot">
      <text x="140" y="30" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="500" fontSize="11" fill="#999" letterSpacing="4">THE</text>
      <text x="140" y="60" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="700" fontSize="36" fill="#2D2D2D" letterSpacing="3">KNOT</text>
      <circle cx="140" cy="72" r="2" fill="#9B2C4F" fillOpacity="0.3" />
    </svg>
  );
}

function BridesLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="Brides Magazine">
      <text x="140" y="44" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="700" fontSize="40" fill="#2D2D2D" letterSpacing="4">BRIDES</text>
      <line x1="80" y1="54" x2="200" y2="54" stroke="#2D2D2D" strokeWidth="0.8" strokeOpacity="0.15" />
      <text x="140" y="72" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="400" fontSize="9" fill="#aaa" letterSpacing="5">MAGAZINE</text>
    </svg>
  );
}

function WireLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="WeddingWire">
      <text x="140" y="48" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="200" fontSize="26" fill="#2D2D2D" letterSpacing="3">WEDDING</text>
      <text x="140" y="72" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="700" fontSize="20" fill="#9B2C4F" letterSpacing="5">WIRE</text>
      <rect x="134" y="56" width="3" height="3" rx="1.5" fill="#9B2C4F" fillOpacity="0.4" />
    </svg>
  );
}

function BazaarLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="Harper's Bazaar">
      <text x="140" y="30" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="600" fontSize="16" fill="#2D2D2D" letterSpacing="3">HARPER'S</text>
      <text x="140" y="58" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="700" fontSize="32" fill="#2D2D2D" letterSpacing="6">BAZAAR</text>
      <text x="140" y="76" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="400" fontSize="9" fill="#aaa" letterSpacing="4">WEDDINGS</text>
    </svg>
  );
}

function TownLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="Town and Country">
      <text x="140" y="36" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="600" fontSize="18" fill="#2D2D2D" letterSpacing="4">TOWN</text>
      <text x="140" y="52" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="300" fontSize="14" fill="#9B2C4F" letterSpacing="2">&amp;</text>
      <text x="140" y="70" textAnchor="middle" fontFamily="'Cormorant Garamond',Georgia,serif" fontWeight="600" fontSize="18" fill="#2D2D2D" letterSpacing="4">COUNTRY</text>
    </svg>
  );
}

function StyleLogo() {
  return (
    <svg viewBox="0 0 280 90" className="w-full h-auto" aria-label="Style Me Pretty">
      <text x="140" y="32" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="300" fontSize="16" fill="#2D2D2D" letterSpacing="5">STYLE</text>
      <text x="140" y="48" textAnchor="middle" fontFamily="'Manrope',system-ui,sans-serif" fontWeight="300" fontSize="16" fill="#2D2D2D" letterSpacing="5">ME</text>
      <text x="140" y="72" textAnchor="middle" fontFamily="'Great Vibes',cursive" fontSize="30" fill="#9B2C4F">Pretty</text>
      <circle cx="118" cy="74" r="2" fill="#D8C3A5" fillOpacity="0.4" />
      <circle cx="162" cy="74" r="2" fill="#D8C3A5" fillOpacity="0.4" />
    </svg>
  );
}

const logoComponents = [VogueLogo, MarthaLogo, KnotLogo, BridesLogo, WireLogo, BazaarLogo, TownLogo, StyleLogo];

/* ── Section heading (overrides SectionHeading for larger prominence) ── */
function FeaturedHeading() {
  return (
    <div className="section-heading mb-20 md:mb-24">
      <span className="bg-text !text-accent/12">
        FEATURED
      </span>
      <h2 className="main-text !text-5xl md:!text-6xl lg:!text-7xl">Featured In</h2>
      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="w-16 h-px bg-accent/40" />
        <div className="w-2 h-2 rounded-full border border-accent" />
        <div className="w-16 h-px bg-accent/40" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   FeaturedIn
   ════════════════════════════════════════════ */
export default function FeaturedIn() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const [statsRef, statsVisible] = useScrollReveal<HTMLDivElement>();
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const idx = Math.round(scrollLeft / (scrollWidth / publications.length));
    setMobileIndex(Math.min(idx, publications.length - 1));
  };

  const scrollTo = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.scrollWidth / publications.length;
    const target = dir === 'prev'
      ? Math.max(0, mobileIndex - 1) * w
      : Math.min(publications.length - 1, mobileIndex + 1) * w;
    scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
  };

  const goTo = (i: number) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.scrollWidth / publications.length;
    scrollRef.current.scrollTo({ left: i * w, behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-secondary overflow-hidden">
      {/* ── Background ambience ── */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[160px]" />
        <div className="absolute -bottom-20 right-[8%] w-[440px] h-[440px] rounded-full bg-[#D8C3A5]/12 blur-[160px]" />
        <div className="absolute top-[20%] right-[8%] w-14 h-px bg-accent/8 rotate-[30deg]" />
        <div className="absolute bottom-[25%] left-[5%] w-12 h-px bg-accent/8 -rotate-[25deg]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <FeaturedHeading />

        {/* ═══ DESKTOP + TABLET LOGO GRID (no cards) ═══ */}
        <div
          ref={ref}
          className={`hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 md:gap-x-16 gap-y-14 md:gap-y-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {logoComponents.map((Logo, i) => (
            <div
              key={i}
              className="group flex items-center justify-center px-2 opacity-75 hover:opacity-100 transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110"
              style={{
                transitionDelay: `${i * 80}ms`,
                filter: isVisible ? 'none' : undefined,
              }}
            >
              <div className="relative w-full">
                {/* Rose-gold glow behind logo on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 rounded-full bg-accent/0 group-hover:bg-accent/6 transition-all duration-500 blur-xl scale-0 group-hover:scale-150" />
                </div>
                {/* Logo */}
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                  <Logo />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ MOBILE HORIZONTAL SCROLL ═══ */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-8 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {logoComponents.map((Logo, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[70vw] max-w-[280px] first:ml-6 last:mr-6"
              >
                <div className="group flex items-center justify-center opacity-75 hover:opacity-100 transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-accent/0 group-hover:bg-accent/6 transition-all duration-500 blur-xl scale-0 group-hover:scale-150" />
                    </div>
                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                      <Logo />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => scrollTo('prev')}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-accent/15 text-accent/50 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white"
              aria-label="Previous"
            >
              <ChevronLeft size={15} />
            </button>
            <div className="flex items-center gap-1.5">
              {publications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${mobileIndex === i
                      ? 'w-6 h-1.5 bg-accent'
                      : 'w-1.5 h-1.5 bg-accent/15 hover:bg-accent/30'
                    }`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollTo('next')}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-accent/15 text-accent/50 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white"
              aria-label="Next"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* ═══ Trust Statistics ═══ */}
        <div
          ref={statsRef}
          className={`mt-20 md:mt-24 pt-10 md:pt-12 border-t border-accent/8 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
            {trustStats.map((stat, i) => (
              <StatItem key={i} {...stat} delay={i * 120} />
            ))}
          </div>

          <p className="font-sans text-center text-[13px] text-[#999] tracking-[2px] uppercase mt-6">
            Trusted by leading wedding publications &amp; luxury event partners worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Stat counter ──────────────────────── */
function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCounterAnimation(value, 2000);

  return (
    <div ref={ref} className="text-center" style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-serif text-4xl md:text-5xl text-[#2D2D2D] mb-1">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="font-sans text-[11px] md:text-[12px] text-[#999] tracking-[2.5px] uppercase font-semibold">
        {label}
      </p>
    </div>
  );
}
