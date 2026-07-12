import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { services, type Service, type ServiceFeature } from '../data/services';
import {
  Search, MapPin, Flower, Sparkles, Lightbulb, Camera, Utensils, Music,
  Users, Palette, Cake, Gift, Mic, Video, Heart, Shield, CheckCircle,
  Calendar, ChevronDown, ArrowRight, X,
} from 'lucide-react';

// Icon lookup map — keys must match the `icon` strings in services.ts
const ICONS: Record<string, React.ElementType> = {
  Search, MapPin, Flower, Sparkles, Lightbulb, Camera, Utensils, Music,
  Users, Palette, Cake, Gift, Mic, Video, Heart, Shield, CheckCircle,
};

// Shared timeline steps used across every service
const PLAN_TIMELINE = [
  { step: '01', label: 'Consultation', icon: Search },
  { step: '02', label: 'Planning', icon: Calendar },
  { step: '03', label: 'Design', icon: Palette },
  { step: '04', label: 'Execution', icon: Sparkles },
  { step: '05', label: 'Celebration', icon: Heart },
];

type ServiceDetailProps = {
  service: Service;
  index: number;
  isLast: boolean;
};

export default function ServiceDetailSection({ service, index, isLast }: ServiceDetailProps) {
  const [heroRef, heroVisible] = useScrollReveal<HTMLDivElement>();
  const isEven = index % 2 === 0;

  return (
    <section
      id={service.id}
      // Generous top padding makes smooth-scrolling land nicely under the fixed header.
      className="relative scroll-mt-28 pt-28 pb-24 overflow-hidden"
      aria-label={service.title}
    >
      {/* Soft background tint alternates for readability between sections */}
      <div className={`absolute inset-0 ${isEven ? 'bg-white' : 'bg-secondary/60'}`} aria-hidden />

      {/* Decorative floral watermark in one corner */}
      <svg
        className={`pointer-events-none absolute w-[300px] h-[300px] opacity-[0.04] ${
          isEven ? 'bottom-[-40px] left-[-40px]' : 'top-[-40px] right-[-40px]'
        }`}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <path
          d="M100 30c10 25-5 50-15 65-5-10-15-30-5-50 5-10 12-15 20-15zm-65 35c20 5 35-3 50-15-12-3-30-3-42 8-5 4-7 8-8 7zm130 0c-20 5-35-3-50-15 12-3 30-3 42 8 5 4 7 8 8 7zm-65 70c10-25-5-50-15-65-5 10-15 30-5 50 5 10 12 15 20 15zm-65-35c20-5 35 3 50 15-12 3-30 3-42-8-5-4-7-8-8-7zm130 0c-20-5-35 3-50 15 12 3 30 3 42-8 5-4 7-8 8-7z"
          stroke="#8E2A4D"
          strokeWidth="1.2"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ===== Hero Image ===== */}
        <div
          ref={heroRef}
          className={`relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.10)] aspect-[16/10] md:aspect-[16/8] lg:aspect-[21/8] transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Service number badge */}
          <div className="absolute top-7 left-7 w-16 h-16 rounded-full border border-white/60 flex items-center justify-center text-white font-sans font-semibold tracking-[1px] backdrop-blur-md bg-white/10">
            {service.number}
          </div>

          {/* Heading overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
            <span className="heading-script text-accent text-3xl md:text-4xl lg:text-5xl block mb-2 leading-none">
              {service.scriptAccent}
            </span>
            <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-1px] leading-[1.05]">
              {service.title}
            </h2>
          </div>
        </div>

        {/* ===== Rich Description ===== */}
        <Description paragraph={service.shortDescription} body={service.paragraphs} index={index} />

        {/* ===== Key Features ===== */}
        <Features features={service.features} />

        {/* ===== Interactive Gallery ===== */}
        <Gallery main={service.gallery.main} thumbs={service.gallery.thumbs} title={service.title} />

        {/* ===== Event Highlights ===== */}
        <Highlights highlights={service.highlights} />

        {/* ===== Timeline ===== */}
        <Timeline />

        {/* ===== FAQs ===== */}
        <FAQAccordion faqs={service.faqs} />

        {/* ===== CTA Banner ===== */}
        <CTABanner
          headline={service.ctaHeadline}
          primary={service.ctaPrimary}
          secondary={service.ctaSecondary}
        />

        {/* ===== Divider Between Sections ===== */}
        {!isLast && <SectionDivider />}
      </div>
    </section>
  );
}

/* ================================== */
/* Description with scroll reveal      */
/* ================================== */
function Description({ paragraph, body, index }: { paragraph: string; body: string[]; index: number }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-12 gap-12 lg:gap-16 mt-20 mb-24 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Left intro — small label + opening paragraph */}
      <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
        <span className="label-luxury mb-5 inline-block">Overview</span>
        <h3 className="font-serif text-3xl md:text-4xl text-black leading-[1.15] tracking-[-0.4px] mb-6">
          Curated for{' '}
          <span className="text-accent">your celebration</span>
        </h3>
        <p className="font-sans text-[17px] md:text-[18px] text-[#555] leading-[1.9]">
          {paragraph}
        </p>
      </div>

      {/* Right — rich multi-paragraph */}
      <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-1'}`}>
        <div className="space-y-6">
          {body.map((p, i) => (
            <p
              key={i}
              className="font-sans text-[17px] md:text-[18px] text-[#555] leading-[1.9]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================== */
/* Key Features                       */
/* ================================== */
function Features({ features }: { features: ServiceFeature[] }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-24 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle eyebrow="What's Included" title="Key Features" script="Included" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Sparkles;
          return (
            <div
              key={i}
              className="group flex items-start gap-5 p-7 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(155,44,79,0.10)] hover:border-accent/25"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-accent/8 flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:bg-accent">
                <Icon size={20} className="text-accent transition-colors duration-400 group-hover:text-white" />
              </div>
              <div>
                <h4 className="font-serif text-xl text-black mb-1 tracking-[-0.2px] group-hover:text-accent transition-colors">
                  {f.label}
                </h4>
                <p className="font-sans text-sm text-gray-500 leading-[1.7]">{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================== */
/* Interactive Gallery                */
/* ================================== */
function Gallery({ main, thumbs, title }: { main: string; thumbs: string[]; title: string }) {
  const [active, setActive] = useState(main);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  // Sync main image when prop changes (e.g. service changes)
  useEffect(() => setActive(main), [main]);

  const handleThumbClick = (src: string) => {
    // Swap: previously active becomes a thumb
    setActive(src);
  };

  const allImages = [active, ...thumbs.filter((t) => t !== active)].slice(0, 7);

  return (
    <div
      ref={ref}
      className={`mb-24 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle eyebrow="Moments" title="Event Gallery" script="Gallery" />

      <div className="grid lg:grid-cols-12 gap-8 mt-12">
        {/* Main Image */}
        <div className="lg:col-span-8 relative">
          <div
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] cursor-pointer"
            onClick={() => setLightbox(active)}
          >
            <img
              src={active}
              alt={`${title} main view`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <span className="absolute bottom-6 left-6 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-sans font-semibold tracking-[1.5px] uppercase border border-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to view fullscreen
            </span>
          </div>
        </div>

        {/* Thumbnails — floating cards */}
        <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-2 gap-4">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => handleThumbClick(src)}
              className={`group relative aspect-square rounded-xl overflow-hidden shadow-sm transition-all duration-400 ${
                src === active
                  ? 'ring-2 ring-accent shadow-md'
                  : 'hover:-translate-y-1 hover:shadow-md'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-8 right-8 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full">
            <img
              src={lightbox}
              alt={`${title} fullscreen view`}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================== */
/* Event Highlights                   */
/* ================================== */
function Highlights({ highlights }: { highlights: Service['highlights'] }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-24 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle eyebrow="At a Glance" title="Event Highlights" script="Details" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-12">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center transition-all duration-400 hover:-translate-y-1 hover:shadow-md hover:border-accent/25"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="font-serif text-base text-accent mb-2 tracking-[0.5px] uppercase">
              {h.label}
            </div>
            <div className="font-sans text-sm text-gray-700 font-semibold leading-[1.5]">
              {h.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================== */
/* Timeline                           */
/* ================================== */
function Timeline() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-24 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle eyebrow="The Journey" title="Planning Process" script="Process" />

      <div className="relative mt-14">
        {/* Connection line — hidden on mobile */}
        <div className="absolute top-9 left-0 right-0 h-px bg-accent/15 hidden md:block" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 relative">
          {PLAN_TIMELINE.map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center text-center transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon node */}
              <div
                className={`w-18 h-18 md:w-18 md:h-18 p-5 rounded-full bg-white border border-accent/30 flex items-center justify-center mb-5 shadow-sm transition-all duration-400 ${
                  visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                } hover:bg-accent hover:border-accent group`}
              >
                <step.icon
                  size={22}
                  className="text-accent transition-colors duration-400 group-hover:text-white"
                />
              </div>
              <div className="font-serif text-xl font-bold text-accent/70 mb-1 tracking-wide">
                {step.step}
              </div>
              <div className="font-serif text-lg text-black tracking-[-0.2px]">
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================== */
/* FAQ Accordion (per service)        */
/* ================================== */
function FAQAccordion({ faqs }: { faqs: Service['faqs'] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-24 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle eyebrow="Questions" title="Frequently Asked" script="FAQ" />

      <div className="mt-12 max-w-3xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-all duration-400 hover:shadow-md"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-7 py-6 text-left transition-colors duration-300"
            >
              <span className="font-serif text-lg md:text-xl text-black pr-8 tracking-[-0.2px]">
                {f.question}
              </span>
              <ChevronDown
                size={22}
                className={`flex-shrink-0 text-accent transition-transform duration-400 ${
                  open === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="font-sans text-[#555] leading-[1.9] px-7 pb-7">{f.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================== */
/* CTA Banner                        */
/* ================================== */
function CTABanner({ headline, primary, secondary }: { headline: string; primary: string; secondary: string }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`mb-4 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        {/* Background image with parallax-friendly behavior */}
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury event"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/55" />

        <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
          <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-[-1px] mb-5 leading-[1.05]">
            {headline}
          </h3>
          <p className="font-sans text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-[1.8]">
            Your dream celebration begins with a single conversation. Let us orchestrate an
            experience that exceeds every expectation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-white font-sans font-bold text-sm tracking-[1.5px] uppercase rounded-[10px] transition-all duration-300 hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-luxury"
            >
              {primary}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center px-10 py-4 border border-white/40 text-white font-sans font-bold text-sm tracking-[1.5px] uppercase rounded-[10px] transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              {secondary}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================== */
/* Section Divider                    */
/* ================================== */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mt-20 mb-8" aria-hidden>
      <div className="w-20 h-px bg-accent/20" />
      <div className="w-2.5 h-2.5 rounded-full border border-accent/30" />
      <div className="w-2.5 h-2.5 rounded-full bg-accent/15" />
      <div className="w-2.5 h-2.5 rounded-full border border-accent/30" />
      <div className="w-20 h-px bg-accent/20" />
    </div>
  );
}

/* ================================== */
/* Reusable Section Title             */
/* ================================== */
function SectionTitle({ eyebrow, title, script }: { eyebrow: string; title: string; script: string }) {
  return (
    <div className="text-center">
      <span className="label-luxury">{eyebrow}</span>
      <h3 className="relative font-serif text-3xl md:text-4xl lg:text-5xl text-black font-bold tracking-[-0.8px] mt-3 mb-2">
        {title}
        <span className="absolute left-1/2 -translate-x-1/2 -top-6 heading-script text-accent text-3xl md:text-4xl pointer-events-none select-none opacity-90">
          {script}
        </span>
      </h3>
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="w-10 h-px bg-accent/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
        <div className="w-10 h-px bg-accent/30" />
      </div>
    </div>
  );
}
