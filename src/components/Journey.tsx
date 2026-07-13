import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Heart, ScrollText, Sparkles, MapPin, PartyPopper, ChevronLeft, ChevronRight } from 'lucide-react';

type Milestone = {
  number: string;
  title: string;
  description: string;
  icon: typeof Heart;
};

const milestones: Milestone[] = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with an intimate conversation to understand your vision, your story, and the dreams you hold for your special day.',
    icon: Heart,
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Our team crafts a detailed roadmap, curating every vendor, venue, and detail to reflect your unique love story.',
    icon: ScrollText,
  },
  {
    number: '03',
    title: 'Design',
    description: 'We shape a breathtaking aesthetic — from palette and florals to lighting and ambiance — that feels unmistakably yours.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'Coordination',
    description: 'On the day, our team works seamlessly behind the scenes so every moment unfolds with grace and precision.',
    icon: MapPin,
  },
  {
    number: '05',
    title: 'Celebration',
    description: 'You savor an extraordinary celebration while we ensure every memory is as flawless as the love that inspired it.',
    icon: PartyPopper,
  },
];

/* ── Desktop vine path ─────────────────── */
const CARD_W = 1000;
const CARD_H = 460;
const MARGIN_X = CARD_W * 0.07;
const CENTER_Y = CARD_H * 0.48;

function generateVinePath(): string {
  const count = milestones.length;
  const spacing = (CARD_W - MARGIN_X * 2) / (count - 1);
  const branchLen = CARD_H * 0.34;
  const xs = Array.from({ length: count }, (_, i) => MARGIN_X + i * spacing);
  const ys = xs.map((_, i) => (i % 2 === 0 ? CENTER_Y - branchLen : CENTER_Y + branchLen));

  let d = `M ${MARGIN_X * 0.5},${CENTER_Y}`;
  for (let i = 0; i < count; i++) {
    const x = xs[i];
    const y = ys[i];
    const dx = spacing * 0.35;
    d += ` L ${x - dx},${CENTER_Y}`;
    d += ` C ${x - dx * 0.3},${CENTER_Y} ${x - dx * 0.6},${(CENTER_Y + y) * 0.5 + (CENTER_Y - y) * 0.3} ${x},${y}`;
    d += ` C ${x + dx * 0.6},${(CENTER_Y + y) * 0.5 + (CENTER_Y - y) * 0.3} ${x + dx * 0.3},${CENTER_Y} ${x + dx},${CENTER_Y}`;
  }
  d += ` L ${CARD_W - MARGIN_X * 0.5},${CENTER_Y}`;
  return d;
}

function generateLeafPath(cx: number, cy: number, flip: boolean): string {
  const s = flip ? 1 : -1;
  return `M ${cx},${cy} C ${cx + 18 * s},${cy - 8} ${cx + 24 * s},${cy - 18} ${cx + 8 * s},${cy - 26} C ${cx - 4 * s},${cy - 20} ${cx - 10 * s},${cy - 10} ${cx},${cy}Z`;
}

const vinePath = generateVinePath();

/* ── Desktop SVG decorations ────────────── */
function DesktopVine({ isInView }: { isInView: boolean }) {
  const count = milestones.length;
  const spacing = (CARD_W - MARGIN_X * 2) / (count - 1);
  const xs = Array.from({ length: count }, (_, i) => MARGIN_X + i * spacing);
  const branchLen = CARD_H * 0.34;
  const ys = xs.map((_, i) => (i % 2 === 0 ? CENTER_Y - branchLen : CENTER_Y + branchLen));

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={`0 0 ${CARD_W} ${CARD_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="vineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D8C3A5" stopOpacity="0" />
          <stop offset="12%" stopColor="#D8C3A5" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#9B2C4F" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#9B2C4F" stopOpacity="0.3" />
          <stop offset="65%" stopColor="#9B2C4F" stopOpacity="0.25" />
          <stop offset="88%" stopColor="#D8C3A5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D8C3A5" stopOpacity="0" />
        </linearGradient>
        <filter id="vineGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={vinePath}
        fill="none"
        stroke="url(#vineGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#vineGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {xs.map((x, i) => {
        const junctionY = CENTER_Y;
        return (
          <g key={`dot-${i}`}>
            <motion.circle
              cx={x}
              cy={junctionY}
              r="5"
              fill="#9B2C4F"
              fillOpacity="0.4"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1.2 + i * 0.3, duration: 0.6, ease: 'easeOut' }}
            />
            <motion.circle
              cx={x}
              cy={junctionY}
              r="2.5"
              fill="#9B2C4F"
              fillOpacity="0.8"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1.3 + i * 0.3, duration: 0.5, ease: 'easeOut' }}
            />
            <motion.path
              d={generateLeafPath(x - 16, junctionY - 6, false)}
              fill="#D8C3A5"
              fillOpacity="0.25"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1.5 + i * 0.3, duration: 0.7, ease: 'easeOut' }}
            />
          </g>
        );
      })}

      {xs.map((x, i) => (
        <g key={`sparkle-${i}`}>
          {[0, 1, 2].map((s) => (
            <motion.circle
              key={s}
              cx={x + (s - 1) * 22}
              cy={ys[i] + (s % 2 === 0 ? -18 : 18)}
              r="1.5"
              fill="#D8C3A5"
              fillOpacity="0.4"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView
                  ? { scale: [0, 1.4, 0], opacity: [0, 0.6, 0] }
                  : {}
              }
              transition={{
                delay: 1.8 + i * 0.3 + s * 0.15,
                duration: 1.8,
                repeat: 0,
                ease: 'easeInOut',
              }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════ */
export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const idx = Math.round(scrollLeft / (scrollWidth / milestones.length));
    setMobileIndex(Math.min(idx, milestones.length - 1));
  };

  const scrollMobile = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.scrollWidth / milestones.length;
    const target = dir === 'prev'
      ? Math.max(0, mobileIndex - 1) * w
      : Math.min(milestones.length - 1, mobileIndex + 1) * w;
    scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-secondary to-white overflow-hidden"
    >
      {/* ── Background Ambience ── */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden>
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[160px]" />
        <div className="absolute -bottom-24 -right-24 w-[440px] h-[440px] rounded-full bg-[#D8C3A5]/20 blur-[140px]" />
        <div className="absolute top-1/4 right-[10%] w-14 h-px bg-accent/10 rotate-45" />
        <div className="absolute bottom-1/4 left-[8%] w-14 h-px bg-accent/10 -rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="OUR JOURNEY" scriptText="Love Story" />
        <p className="font-sans text-center text-[16px] md:text-[17px] text-[#666] leading-[1.9] max-w-2xl mx-auto mt-6 mb-16 md:mb-24">
          From the first conversation to the final dance, we guide you through every chapter of your wedding story with
          care and artistry.
        </p>

        {/* ═══ DESKTOP (≥1024px) ═══ */}
        <div className="hidden lg:block">
          <div className="relative">
            <DesktopVine isInView={isInView} />
            <div className="relative z-10 grid grid-cols-5 gap-8">
              {milestones.map((m, i) => {
                const isAbove = i % 2 === 0;
                return (
                  <div key={m.number} className={`flex flex-col ${isAbove ? 'justify-start' : 'justify-end'}`}>
                    <motion.div
                      className={`w-full ${isAbove ? 'pb-36' : 'pt-36'}`}
                      initial={{ opacity: 0, y: isAbove ? -40 : 40 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.25, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <MilestoneCard milestone={m} index={i} isInView={isInView} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══ TABLET (640–1023px) ═══ */}
        <div className="hidden md:block lg:hidden">
          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
            <div className="space-y-24">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.number}
                    className={`relative flex items-start gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {/* Card area */}
                    <div className={`w-[calc(50%-28px)] ${isLeft ? 'text-right' : 'text-left'}`}>
                      <MilestoneCard milestone={m} index={i} isInView={isInView} />
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full border-2 border-accent/40 bg-secondary" />

                    {/* Spacer for opposite side */}
                    <div className="w-[calc(50%-28px)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══ MOBILE (<640px) ═══ */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Scrollable track */}
            <div
              ref={scrollRef}
              onScroll={handleMobileScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {milestones.map((m, i) => (
                <div
                  key={m.number}
                  className="snap-center shrink-0 w-[85vw] max-w-[380px] first:ml-6 last:mr-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <MilestoneCard milestone={m} index={i} isInView={isInView} />
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Mobile nav dots */}
            <div className="flex items-center justify-center gap-2.5 mt-8">
              <button
                onClick={() => scrollMobile('prev')}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-accent/20 text-accent/60 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2 mx-3">
                {milestones.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!scrollRef.current) return;
                      const w = scrollRef.current.scrollWidth / milestones.length;
                      scrollRef.current.scrollTo({ left: i * w, behavior: 'smooth' });
                    }}
                    className={`rounded-full transition-all duration-300 ${mobileIndex === i
                        ? 'w-8 h-2.5 bg-accent'
                        : 'w-2.5 h-2.5 bg-accent/20 hover:bg-accent/40'
                      }`}
                    aria-label={`Go to milestone ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollMobile('next')}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-accent/20 text-accent/60 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   Milestone Card
   ════════════════════════════════════════════ */
function MilestoneCard({
  milestone,
  index,
  isInView,
}: {
  milestone: Milestone;
  index: number;
  isInView: boolean;
}) {
  const IconComponent = milestone.icon;
  const delay = 0.6 + index * 0.25;

  return (
    <motion.article
      className="group relative flex flex-col bg-white rounded-[20px] border border-[#F1E2D0] p-7 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(155,44,79,0.12)] hover:border-accent hover:z-10 cursor-default"
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Decorative top accent bar */}
      <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-accent/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Step Number */}
      <div className="font-serif text-[48px] md:text-[64px] font-bold text-accent/30 leading-none mb-2 select-none transition-all duration-500 group-hover:text-accent/50 group-hover:scale-105 origin-left">
        {milestone.number}
      </div>

      {/* Icon */}
      <div className="mb-5 text-accent/65 transition-all duration-500 group-hover:text-accent group-hover:rotate-[10deg] group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(155,44,79,0.2)]">
        <IconComponent size={28} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-serif text-[22px] md:text-[24px] font-semibold text-[#2D2D2D] leading-tight mb-4 transition-colors duration-300 group-hover:text-accent-dark">
        {milestone.title}
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-accent/15 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-accent/30" />

      {/* Description */}
      <p className="font-sans text-[13px] md:text-[15px] text-[#666] leading-[1.8] flex-1">
        {milestone.description}
      </p>

      {/* Corner accent */}
      <div className="absolute right-4 top-4 w-7 h-7 border-r border-t border-accent/0 group-hover:border-accent/20 transition-all duration-500 rounded-tr-[4px]" />

      {/* Decorative dot */}
      <div className="absolute left-1/2 -bottom-3 w-2 h-2 rounded-full bg-accent/20 opacity-0 group-hover:opacity-100 group-hover:bg-accent/40 transition-all duration-500 -translate-x-1/2" />
    </motion.article>
  );
}
