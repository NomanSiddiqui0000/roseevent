import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Sparkles, Palette, Clock, Users, Award, Heart } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'Personalized Planning',
    description: 'Every event is uniquely tailored to reflect your vision, style, and personality, ensuring a one-of-a-kind experience.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Palette,
    title: 'Creative Concepts',
    description: 'Our design team crafts innovative themes and concepts that transform ordinary spaces into extraordinary settings.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Heart,
    title: 'Luxury Decor',
    description: 'Premium materials, exquisite florals, and stunning installations create an atmosphere of pure elegance.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Clock,
    title: 'On-Time Execution',
    description: 'Precision planning and meticulous coordination ensure every moment unfolds flawlessly, exactly as planned.',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our dedicated professionals bring years of expertise, handling every detail with care and precision.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Award,
    title: 'Premium Vendors',
    description: 'We partner with the finest vendors and suppliers, ensuring top-quality services for your special event.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="WHY US" scriptText="Excellence" />

        <div className="mt-20 space-y-16">
          {reasons.map((reason, index) => (
            <ReasonItem key={index} {...reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonItem({
  icon: Icon,
  title,
  description,
  image,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  index: number;
}) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
      } transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Image */}
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} relative group`}>
        <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-card">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {/* Decorative Frame */}
        <div
          className={`absolute -top-2 sm:-top-4 ${
            isEven ? '-right-2 sm:-right-4' : '-left-2 sm:-left-4'
          } w-full h-full border border-accent/30 rounded-sm -z-10`}
        />
      </div>

      {/* Content */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} lg:py-8`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div className="w-12 h-px bg-accent/30" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-black mb-6 tracking-[-0.5px]">{title}</h3>
        <p className="font-sans text-gray-600 leading-[1.9] text-[17px]">{description}</p>

        {/* Decorative Quote */}
        <div className="mt-8 pl-6 border-l-2 border-accent/30">
          <p className="font-serif text-sm text-gray-500 italic leading-relaxed">
            "Excellence is not just our standard—it's our signature."
          </p>
        </div>
      </div>
    </div>
  );
}
