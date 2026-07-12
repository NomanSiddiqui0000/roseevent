import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
    alt: 'Elegant table setting',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&q=80',
    alt: 'Wedding arch',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
    alt: 'Reception venue',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80',
    alt: 'Outdoor ceremony',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80',
    alt: 'Floral arrangements',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=400&q=80',
    alt: 'Wedding cake',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    alt: 'Evening reception',
    span: 'col-span-2 row-span-1',
  },
];

export default function Gallery() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="GALLERY" scriptText="Memories" />

        <div
          ref={ref}
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {galleryImages.map((image, index) => (
            <GalleryItem key={index} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  image,
  index,
}: {
  image: typeof galleryImages[0];
  index: number;
}) {
  const [itemRef, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={itemRef}
      className={`relative group overflow-hidden rounded-sm ${image.span} transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <div className="text-center">
          <span className="text-white font-serif text-lg md:text-xl tracking-[-0.3px]">{image.alt}</span>
        </div>
      </div>
    </div>
  );
}