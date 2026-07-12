import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';

export default function Services() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="OUR SERVICES" scriptText="Experiences" />

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: typeof services[number];
  index: number;
}) {
  const [cardRef, is_visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(155,44,79,0.10)] hover:border-accent/30"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Soft overlay for legibility on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Index Number Badge */}
        <div className="absolute top-6 left-6 w-14 h-14 rounded-full border border-white/60 flex items-center justify-center text-white font-sans text-sm font-semibold backdrop-blur-sm bg-white/10 transition-all duration-400 group-hover:bg-accent group-hover:border-accent tracking-[1px]">
          {service.number}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10">
        {/* Script accent */}
        <span className="heading-script text-accent text-2xl mb-1 block leading-none">
          {service.scriptAccent}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-black mb-4 group-hover:text-accent transition-colors tracking-[-0.3px]">
          {service.title}
        </h3>
        <p className="font-sans text-gray-600 text-[15px] leading-[1.8] mb-7">
          {service.shortDescription}
        </p>
        <Link
          to={`/services#${service.id}`}
          className="inline-flex items-center gap-2 font-sans font-bold text-xs text-accent tracking-[1.5px] uppercase transition-colors hover:text-accent-dark group/btn"
        >
          <span>Explore More</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
