import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

const categories = [
  {
    title: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Timeless ceremonies & grand receptions',
    link: '/services',
  },
  {
    title: 'Corporate',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
    description: 'Sophisticated galas & product launches',
    link: '/services',
  },
  {
    title: 'Birthdays',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&q=80',
    description: 'Milestone celebrations filled with joy',
    link: '/services',
  },
  {
    title: 'Engagements',
    image: 'https://images.unsplash.com/photo-1510079950943-0d05bd60e15a?auto=format&fit=crop&w=600&q=80',
    description: 'Romantic proposals & engagement parties',
    link: '/services',
  },
  {
    title: 'Private Parties',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    description: 'Exclusive gatherings tailored to you',
    link: '/services',
  },
  {
    title: 'Luxury Decor',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    description: 'Breathtaking installations & florals',
    link: '/services',
  },
];

export default function EventCategories() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="CELEBRATE" scriptText="Categories" />

        <div
          ref={ref}
          className={`mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {categories.map((cat, index) => (
            <Link
              to={cat.link}
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-400 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 tracking-[-0.3px]">
                  {cat.title}
                </h3>
                <p className="font-sans text-sm text-white/80 leading-relaxed">
                  {cat.description}
                </p>
                <span className="inline-block mt-4 font-sans font-bold text-xs text-accent tracking-[1.5px] uppercase group-hover:text-accent-light transition-colors">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}