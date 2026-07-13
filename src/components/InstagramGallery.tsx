import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Play, Instagram as InstagramIcon } from 'lucide-react';

type GalleryItem = {
  id: number;
  image: string;
  url: string;
  alt: string;
};

const posts: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example1',
    alt: 'Elegant wedding reception with floral centerpieces',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example2',
    alt: 'Luxury table setting with rose gold accents',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example3',
    alt: 'Bridal party celebration highlight reel',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example4',
    alt: 'Outdoor ceremony arch with white florals',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example5',
    alt: 'Intimate dinner setup under string lights',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example6',
    alt: 'First dance moment captured on film',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example7',
    alt: 'Decadent wedding cake display',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1505238680356-6672f66a0858?auto=format&fit=crop&w=600&q=80',
    url: 'https://instagram.com/p/example8',
    alt: 'Luxury bridal bouquet with roses',
  },
];

export default function InstagramGallery() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-secondary overflow-hidden">
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 -right-20 w-[380px] h-[380px] rounded-full bg-accent/4 blur-[150px]" />
        <div className="absolute -bottom-20 left-[5%] w-[360px] h-[360px] rounded-full bg-[#D8C3A5]/12 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ═══ Section heading — matches site theme ═══ */}
        <div className="section-heading mb-14 md:mb-16">
          <span className="bg-text !text-accent/12">INSTAGRAM</span>
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2D2D] relative z-10 mt-1 leading-[1.15] tracking-[-0.5px]">
            Follow Our Journey
          </h3>
          <h2 className="main-text !text-4xl md:!text-5xl lg:!text-6xl -mt-2">On Instagram</h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-accent/40" />
            <div className="w-2 h-2 rounded-full border border-accent" />
            <div className="w-16 h-px bg-accent/40" />
          </div>
        </div>

        {/* ═══ Gallery grid ═══ */}
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {posts.map((post, i) => (
            <GalleryItem key={post.id} post={post} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* ═══ CTA ═══ */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-sans font-bold tracking-[1.5px] uppercase text-sm rounded-[10px] transition-all duration-300 hover:bg-accent-dark hover:shadow-luxury hover:-translate-y-0.5"
          >
            <InstagramIcon size={18} className="transition-transform duration-300 group-hover:scale-110" />
            Follow @luxeevents
          </a>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   Gallery Item
   ════════════════════════════════════════════ */
function GalleryItem({
  post,
  index,
  isVisible,
}: {
  post: GalleryItem;
  index: number;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-[12px] bg-[#F5F2ED] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <img
        src={post.image}
        alt={post.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 group-hover:brightness-110"
      />

      {/* Dark overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-[500ms] ${hovered ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {/* Rose-gold glow ring */}
      <div
        className={`absolute inset-0 rounded-[12px] ring-1 ring-inset transition-all duration-[500ms] pointer-events-none ${hovered
            ? 'ring-accent/40 ring-2 shadow-[inset_0_0_30px_rgba(155,44,79,0.15)]'
            : 'ring-transparent'
          }`}
      />

      {/* Centered Play icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 flex items-center justify-center shadow-lg">
          <Play size={22} className="text-white ml-0.5" fill="white" />
        </div>
      </div>

      <span className="sr-only">{post.alt} — View on Instagram</span>
    </a>
  );
}
