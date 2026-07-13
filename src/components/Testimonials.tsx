import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionHeading from './SectionHeading';

type Testimonial = {
  id: number;
  name: string;
  location: string;
  event: string;
  image: string;
  quote: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah & Michael Thompson',
    location: 'New York, USA',
    event: 'Luxury Wedding',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'Luxe Events transformed our dream wedding into reality. Every detail was perfect, from the stunning floral arrangements to the seamless coordination. Our guests are still talking about it months later.',
  },
  {
    id: 2,
    name: 'Jennifer & David Chen',
    location: 'Los Angeles, CA',
    event: 'Destination Wedding',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'Working with Luxe Events was an absolute pleasure. They handled every logistics of our destination wedding with such professionalism and grace. We cannot imagine our big day without them.',
  },
  {
    id: 3,
    name: 'Aisha & Omar Al-Hassan',
    location: 'Dubai, UAE',
    event: 'Grand Reception',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: "The team's attention to detail and understanding of our cultural traditions made our celebration truly special. They blended modern elegance with traditional beautifully.",
  },
  {
    id: 4,
    name: 'Emily Roberts',
    location: 'London, UK',
    event: 'Corporate Gala',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'For our annual corporate gala, Luxe Events delivered beyond expectations. The sophisticated ambiance and flawless execution impressed our 500+ guests immensely.',
  },
  {
    id: 5,
    name: 'Priya & Raj Sharma',
    location: 'Mumbai, India',
    event: 'Traditional Mehndi',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'They understood our vision for a modern yet traditional celebration perfectly. Every ritual and ceremony was handled with respect and elegance by the entire team.',
  },
  {
    id: 6,
    name: 'Olivia & James Bennett',
    location: 'Sydney, Australia',
    event: 'Luxury Decor Client',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: "The decor Luxe Events designed for our reception was nothing short of breathtaking. Every element felt intentional, luxurious, and uniquely ours. We were genuinely moved.",
  },
  {
    id: 7,
    name: 'Daniel Carter',
    location: 'Chicago, IL',
    event: 'Birthday Celebration',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: "They turned my wife's 40th birthday into an unforgettable evening. From the venue styling to the live music, Luxe Events orchestrated a celebration beyond our imagination.",
  },
  {
    id: 8,
    name: 'Sophia Laurent',
    location: 'Paris, France',
    event: 'Engagement Ceremony',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: "An unforgettable engagement crafted with such elegance. The Luxe team understood our romance, our story, and translated it into an evening we will cherish forever.",
  },
];

// Breakpoints / page sizes
type PageSize = { visible: number };

function usePageSize(): PageSize {
  const [size, setSize] = useState<PageSize>({ visible: 3 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSize({ visible: 3 });
      else if (w >= 640) setSize({ visible: 2 });
      else setSize({ visible: 1 });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}

export default function Testimonials() {
  const { visible } = usePageSize();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [revealRef, revealed] = useScrollReveal<HTMLDivElement>();
  const touchStartX = useRef<number | null>(null);
  const [transition, setTransition] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const gap = 28;

  const totalReal = testimonials.length;
  const extended = useMemo(
    () => [...testimonials, ...testimonials.slice(0, visible)],
    [visible]
  );
  const totalPages = Math.ceil(totalReal / visible);

  // Measure container and calculate pixel-perfect card width
  useEffect(() => {
    const measure = () => {
      if (trackRef.current?.parentElement) {
        const containerWidth = trackRef.current.parentElement.clientWidth;
        const cw = (containerWidth - (visible - 1) * gap) / visible;
        setCardWidth(Math.max(cw, 200));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [visible, gap]);

  const advance = cardWidth + gap;

  // Clamp slideIndex on visible change
  useEffect(() => {
    setSlideIndex((p) => Math.min(p, totalReal));
  }, [totalReal]);

  // Auto-play — advance one card position at a time
  useEffect(() => {
    if (isHovering || totalReal <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((p) => p + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovering, totalReal]);

  // Seamless loop: when we hit the cloned slide, jump back to 0 without transition
  useEffect(() => {
    if (slideIndex >= totalReal) {
      setTransition(false);
      setSlideIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransition(true));
      });
    }
  }, [slideIndex, totalReal]);

  const next = useCallback(() => {
    setSlideIndex((p) => Math.min(p + 1, totalReal));
  }, [totalReal]);

  const prev = useCallback(() => {
    setSlideIndex((p) => (p > 0 ? p - 1 : 0));
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      setSlideIndex(page * visible);
    },
    [visible]
  );

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="relative py-32 bg-white"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ===== Background Decorations ===== */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        {/* Blurred beige circles */}
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-[#F0E6DB] blur-[120px] opacity-60" />
        <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-[#EADFC8] blur-[140px] opacity-50" />
        {/* Subtle line accents */}
        <div className="absolute top-1/3 left-0 w-16 h-px bg-accent/20" />
        <div className="absolute bottom-1/3 right-0 w-16 h-px bg-accent/20" />
        {/* Floral watermark (decorative SVG) */}
        <svg
          className="absolute bottom-[-40px] left-[-30px] w-[280px] h-[280px] opacity-[0.04]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M100 30c10 25-5 50-15 65-5-10-15-30-5-50 5-10 12-15 20-15zm-65 35c20 5 35-3 50-15-12-3-30-3-42 8-5 4-7 8-8 7zm130 0c-20 5-35-3-50-15 12-3 30-3 42 8 5 4 7 8 8 7zm-65 70c10-25-5-50-15-65-5 10-15 30-5 50 5 10 12 15 20 15zm-65-35c20-5 35 3 50 15-12 3-30 3-42-8-5-4-7-8-8-7zm130 0c-20-5-35 3-50 15 12 3 30 3 42-8 5-4 7-8 8-7z"
            stroke="#8E2A4D"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ===== Section Header ===== */}
        <div
          ref={revealRef}
          className={`text-center relative mb-20 transition-all duration-1000 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <SectionHeading bgText="TESTIMONIALS" scriptText="Client Love" />

          <p className="font-sans text-[17px] md:text-[18px] text-[#666] leading-[1.9] max-w-2xl mx-auto mt-8">
            Every celebration tells a story, and nothing speaks louder than the words of our
            happy clients.
          </p>
        </div>

        {/* ===== Carousel ===== */}
        <div className="relative overflow-hidden py-6 -mt-2">
          {/* Track — pixel-based one-card-at-a-time for precise spacing */}
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{
              transform: cardWidth ? `translateX(-${slideIndex * advance}px)` : 'translateX(0)',
              transition: transition
                ? 'transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                : 'none',
            }}
          >
            {extended.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="flex-shrink-0"
                style={{
                  width: cardWidth ? `${cardWidth}px` : 'auto',
                  minWidth: cardWidth ? `${cardWidth}px` : 'auto',
                  marginRight: i < extended.length - 1 ? `${gap}px` : '0',
                }}
              >
                <TestimonialCard
                  testimonial={t}
                  animateIn={revealed}
                  animDelay={i * 60}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===== Navigation ===== */}
        <div className="flex items-center justify-center gap-8 mt-14">
          <button
            onClick={prev}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-accent/30 text-accent transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Dots — one per page of visible cards */}
          <div className="flex items-center gap-2.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`rounded-full transition-all duration-300 ${
                  Math.min(Math.floor(slideIndex / visible), totalPages - 1) === i
                    ? 'w-9 h-2.5 bg-accent'
                    : 'w-2.5 h-2.5 bg-accent/25 hover:bg-accent/50'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-accent/30 text-accent transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label="Next testimonials"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* ===== Trust Badge ===== */}
        <div className="flex items-center justify-center mt-16">
          <div className="flex items-center gap-4 px-8 py-5 bg-white rounded-full shadow-sm border border-[#F0E1D2]">
            {/* Mini stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-[#D8C3A5] text-[#D8C3A5]"
                />
              ))}
            </div>
            <div className="w-px h-5 bg-gray-200" />
            <span className="font-sans text-sm text-[#2D2D2D] font-semibold tracking-wide">
              Rated 4.9/5
            </span>
            <span className="w-px h-5 bg-gray-200" />
            <span className="font-sans text-sm text-[#666] tracking-wide">
              Trusted by 500+ Happy Clients
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================= */
/* Testimonial Card                              */
/* ============================================= */
function TestimonialCard({
  testimonial,
  animateIn,
  animDelay,
}: {
  testimonial: Testimonial;
  animateIn: boolean;
  animDelay: number;
}) {
  const [starsVisible, setStarsVisible] = useState(false);

  // Trigger staggered star animation when section reveals
  useEffect(() => {
    if (animateIn) {
      const t = setTimeout(() => setStarsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [animateIn]);

  return (
    <article
      className={`group flex flex-col bg-white rounded-[20px] border border-[#F1E2D0] p-10 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(155,44,79,0.10)] hover:border-accent hover:z-10 relative ${
        animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${animDelay}ms` }}
    >
      {/* Decorative Quote Icon — centered top */}
      <div className="absolute right-7 top-7 pointer-events-none">
        <Quote
          size={44}
          className="text-[#D8C3A5] opacity-30 transition-transform duration-500 group-hover:rotate-6 group-hover:opacity-50"
          strokeWidth={1.2}
        />
      </div>

      {/* Spacer for equal heights */}
      <div className="flex-1 flex flex-col items-center text-center">
        {/* Quote body */}
        <blockquote className="font-sans text-[17px] md:text-[18px] text-[#555] leading-[1.8] tracking-[-0.1px] mb-8">
          {testimonial.quote}
        </blockquote>

        {/* Animated Stars */}
        <div className="flex items-center gap-1.5 mb-9">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`text-[#D8C3A5] transition-all duration-500 ${
                starsVisible ? 'fill-[#D8C3A5] opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                transitionDelay: `${starsVisible ? i * 120 + animDelay : 0}ms`,
              }}
            />
          ))}
        </div>

        {/* Profile image */}
        <div
          className={`mb-5 transition-all duration-700 ${
            animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          } group-hover:scale-105`}
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            loading="lazy"
            className="w-[70px] h-[70px] rounded-full object-cover border-4 border-white shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
          />
        </div>

        {/* Name */}
        <h4
          className={`font-serif text-[26px] md:text-[28px] font-semibold text-[#2D2D2D] tracking-[-0.3px] leading-tight transition-all duration-700 ${
            animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ transitionDelay: `${animDelay + 200}ms` }}
        >
          {testimonial.name}
        </h4>

        {/* Event type */}
        <p className="font-sans text-sm text-accent tracking-[2px] uppercase font-semibold mt-2">
          {testimonial.event}
        </p>

        {/* Location */}
        <p className="font-sans text-[13px] text-[#999] mt-1 tracking-wide">
          {testimonial.location}
        </p>
      </div>
    </article>
  );
}
