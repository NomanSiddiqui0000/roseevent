import React, { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ════════════════════════════════════════════
   Data
   ════════════════════════════════════════════ */
type Chapter = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  imagePosition: 'left' | 'right' | 'center';
};

const chapters: Chapter[] = [
  {
    id: 1,
    number: '01',
    title: 'First Conversation',
    description: 'Every unforgettable celebration begins with a meaningful conversation.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    imagePosition: 'left',
  },
  {
    id: 2,
    number: '02',
    title: 'Dream Planning',
    description: 'Every detail is thoughtfully crafted around your vision.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80',
    imagePosition: 'right',
  },
  {
    id: 3,
    number: '03',
    title: 'Bringing Your Vision to Life',
    description: 'Precision transforms inspiration into breathtaking reality.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80',
    imagePosition: 'center',
  },
  {
    id: 4,
    number: '04',
    title: 'Celebration Day',
    description: 'Every moment unfolds beautifully while you simply celebrate.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
    imagePosition: 'right',
  },
  {
    id: 5,
    number: '05',
    title: 'Memories That Last Forever',
    description: 'Long after the music fades, the memories remain forever.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
    imagePosition: 'left',
  },
];

/* ════════════════════════════════════════════
   WeddingJourney
   ════════════════════════════════════════════ */
export default function WeddingJourney() {
  const [headingRef, headingVisible] = useScrollReveal<HTMLDivElement>();
  const [activeChapter, setActiveChapter] = useState(-1);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    chapterRefs.current = chapterRefs.current.slice(0, chapters.length);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    chapterRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const idx = chapterRefs.current.indexOf(el);
            setActiveChapter(idx);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-secondary overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[200px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#D8C3A5]/10 blur-[180px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`section-heading mb-20 lg:mb-28 transition-all duration-1000 ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-text !text-accent/12">JOURNEY</span>
          <h2 className="main-text !text-4xl md:!text-5xl lg:!text-6xl">Every Moment</h2>
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2D2D] relative z-10 mt-1 leading-[1.15] tracking-[-0.5px]">
            Your Wedding Journey
          </h3>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-accent/40" />
            <div className="w-2 h-2 rounded-full border border-accent" />
            <div className="w-16 h-px bg-accent/40" />
          </div>
        </div>

        {/* Chapters */}
        <div className="relative">
          {/* Decorative vertical line (desktop only) */}
          <div className="hidden lg:block absolute left-6 top-0 bottom-0 w-px pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1 2000" preserveAspectRatio="none">
              <defs>
                <linearGradient id="vConnector" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9B2C4F" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#9B2C4F" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#9B2C4F" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <line x1="0" y1="0" x2="0" y2="2000" stroke="url(#vConnector)" strokeWidth="1" />
            </svg>
          </div>

          {/* Chapter entries */}
          <div className="lg:pl-16 space-y-32 lg:space-y-40">
            {chapters.map((ch, i) => (
              <JourneyChapter
                key={ch.id}
                chapter={ch}
                index={i}
                ref={(el) => { chapterRefs.current[i] = el; }}
              />
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-20 lg:mt-28 flex items-center justify-center gap-0">
          {chapters.map((ch, i) => (
            <div key={ch.id} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full border transition-all duration-700 ${
                  activeChapter > i
                    ? 'bg-accent border-accent shadow-[0_0_8px_rgba(155,44,79,0.3)]'
                    : activeChapter === i
                    ? 'bg-accent border-accent shadow-[0_0_12px_rgba(155,44,79,0.4)] ring-2 ring-accent/25'
                    : 'border-accent/30 bg-transparent'
                }`}
              />
              {i < chapters.length - 1 && (
                <div
                  className={`w-8 sm:w-12 h-px transition-all duration-700 ${
                    activeChapter > i ? 'bg-accent/60' : 'bg-accent/15'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   JourneyChapter (single responsive chapter)
   ════════════════════════════════════════════ */
const JourneyChapter = React.forwardRef<HTMLDivElement, { chapter: Chapter; index: number }>(
  ({ chapter, index }, ref) => {
    const [contentRef, visible] = useScrollReveal<HTMLDivElement>();

    const isLeft = chapter.imagePosition === 'left';
    const isCenter = chapter.imagePosition === 'center';

    return (
      <div ref={ref}>
        <div
          ref={contentRef}
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          <div className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${isCenter ? 'text-center' : ''}`}>
            {/* Image */}
            <div
              className={`${
                isCenter
                  ? 'lg:col-span-12'
                  : isLeft
                  ? 'lg:col-span-7'
                  : 'lg:col-span-7 lg:order-2'
              } relative group`}
            >
              <div className="relative overflow-hidden rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  loading={index === 0 ? undefined : 'lazy'}
                  className={`w-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 ${
                    isCenter ? 'aspect-[21/9]' : 'aspect-[4/3]'
                  }`}
                />
                <div className="absolute inset-0 rounded-[16px] ring-1 ring-inset ring-accent/10 group-hover:ring-accent/30 transition-all duration-500 pointer-events-none" />
              </div>
            </div>

            {/* Content */}
            <div
              className={`${
                isCenter
                  ? 'lg:col-span-12 mt-6'
                  : isLeft
                  ? 'lg:col-span-5'
                  : 'lg:col-span-5 lg:order-1'
              }`}
            >
              <div className={`${isCenter ? 'max-w-xl mx-auto' : ''}`}>
                {/* Chapter number */}
                <span className="font-serif font-bold text-accent/15 pointer-events-none select-none text-[clamp(3rem,6vw,7rem)] leading-none block -mb-3">
                  {chapter.number}
                </span>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2D2D2D] leading-[1.15] tracking-[-0.3px] mb-4">
                  {chapter.title}
                </h3>

                {/* Accent line */}
                <div className="w-10 h-px bg-accent/40 mb-4" />

                {/* Description */}
                <p className="font-sans text-[15px] md:text-[16px] text-gray-500 leading-relaxed max-w-sm">
                  {chapter.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
