import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { X } from 'lucide-react';

const filterCategories = ['All', 'Weddings', 'Birthdays', 'Corporate', 'Decorations'];

const projects = [
  {
    id: 1,
    title: 'Royal Garden Wedding',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    size: 'large',
  },
  {
    id: 2,
    title: 'Elegant Reception',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: 3,
    title: 'Corporate Gala Night',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Milestone Birthday Bash',
    category: 'Birthdays',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: 5,
    title: 'Enchanted Forest Theme',
    category: 'Decorations',
    image: 'https://images.unsplash.com/photo-1510079950943-0d05bd60e15a?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Luxury Outdoor Ceremony',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
    size: 'large',
  },
  {
    id: 7,
    title: 'Golden Anniversary',
    category: 'Decorations',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    size: 'small',
  },
  {
    id: 8,
    title: 'Product Launch Event',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    size: 'medium',
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="PORTFOLIO" scriptText="Creations" />

        {/* Filter Buttons */}
        <div
          ref={ref}
          className={`flex flex-wrap items-center justify-center gap-4 mt-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 font-sans font-bold text-xs tracking-[2px] uppercase transition-all duration-300 rounded-[10px] ${
                activeFilter === category
                  ? 'bg-accent text-white'
                  : 'bg-transparent text-gray-600 hover:text-accent hover:bg-accent/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <PortfolioItem
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          onClick={() => setSelectedProject(null)}
        >
          <button
            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedProject(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-auto rounded-sm"
            />
            <div className="mt-6 text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-white tracking-[-0.5px]">{selectedProject.title}</h3>
              <p className="text-accent font-sans font-bold text-xs tracking-[2px] uppercase mt-2">
                {selectedProject.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PortfolioItem({
  project,
  index,
  onClick,
}: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}) {
  const [itemRef, isVisible] = useScrollReveal<HTMLDivElement>();

  const gridClass =
    project.size === 'large'
      ? 'md:col-span-2 md:row-span-2'
      : project.size === 'medium'
      ? 'md:col-span-1 md:row-span-2'
      : 'md:col-span-1';

  return (
    <div
      ref={itemRef}
      className={`group relative overflow-hidden rounded-sm cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${gridClass}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className={`${project.size === 'large' ? 'aspect-square' : 'aspect-[4/3]'}`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <span className="text-accent font-sans font-bold text-[11px] tracking-[2px] uppercase mb-2">
          {project.category}
        </span>
        <h3 className="font-serif text-xl md:text-2xl text-white tracking-[-0.3px]">{project.title}</h3>
      </div>
    </div>
  );
}
