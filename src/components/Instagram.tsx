import { Instagram as InstagramIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const instagramPosts = [
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
    likes: '2.4k',
  },
  {
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&q=80',
    likes: '1.8k',
  },
  {
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80',
    likes: '3.2k',
  },
  {
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80',
    likes: '2.1k',
  },
  {
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80',
    likes: '4.5k',
  },
  {
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=400&q=80',
    likes: '1.9k',
  },
];

export default function Instagram() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <InstagramIcon size={28} className="text-accent" />
            <span className="font-serif text-xl tracking-wide">@luxeevents</span>
          </div>
          <p className="font-sans text-gray-600">Follow our journey for daily inspiration</p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <InstagramItem key={index} post={post} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent text-accent font-sans font-bold tracking-[1.5px] uppercase text-sm rounded-[10px] transition-all duration-300 hover:bg-accent hover:text-white"
          >
            <InstagramIcon size={18} />
            Follow Our Journey
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramItem({
  post,
  index,
}: {
  post: typeof instagramPosts[0];
  index: number;
}) {
  const [itemRef, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={itemRef}
      className={`relative aspect-square overflow-hidden rounded-sm group cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img
        src={post.image}
        alt="Instagram post"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <InstagramIcon size={32} className="text-white" />
      </div>
    </div>
  );
}
