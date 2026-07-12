import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, ShieldCheck, Star, Gem } from 'lucide-react';

const partners = [
  { icon: Award, label: 'The Luxury Wedding Awards 2024', detail: 'Best Event Design' },
  { icon: Star, label: 'Brides Magazine', detail: 'Top Rated Planner' },
  { icon: ShieldCheck, label: 'International Event Society', detail: 'Certified Member' },
  { icon: Gem, label: 'Vogue Weddings', detail: 'Featured in 2024' },
  { icon: Award, label: 'Global Luxury Awards', detail: 'Excellence in Planning' },
  { icon: Star, label: 'Forbes Travel Guide', detail: 'Recommended Partner' },
];

export default function Awards() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="RECOGNITION" scriptText="Awards & Press" />

        <div
          ref={ref}
          className={`mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {partners.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm border border-gray-50 transition-all duration-400 hover:-translate-y-2 hover:shadow-card"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-accent/8 flex items-center justify-center mb-4 group-hover:bg-accent/12 transition-colors duration-400">
                <item.icon size={22} className="text-accent" />
              </div>
              <h4 className="font-serif text-base mb-1 tracking-[-0.2px]">{item.label}</h4>
              <p className="font-sans text-xs text-gray-500 tracking-wide">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}