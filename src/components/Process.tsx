import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with an in-depth conversation to understand your vision, preferences, and dreams for your special event.',
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Our team creates a comprehensive roadmap, from venue selection to vendor coordination, mapping every detail.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We craft a unique aesthetic that reflects your personality, curating color palettes, decor, and ambiance.',
  },
  {
    number: '04',
    title: 'Execution',
    description: 'On the big day, our team works seamlessly behind the scenes, ensuring every moment unfolds flawlessly.',
  },
  {
    number: '05',
    title: 'Celebration',
    description: 'You enjoy your extraordinary event while we handle every detail, creating memories that last forever.',
  },
];

export default function Process() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-32 bg-gradient-to-b from-secondary to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="OUR PROCESS" scriptText="Journey" />

        <div
          ref={ref}
          className={`mt-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20 hidden lg:block" />

            <div className="space-y-16 lg:space-y-0">
              {steps.map((step, index) => (
                <ProcessStep key={step.number} step={step} index={index} />
              ))}
            </div>

            {/* End Marker */}
            <div className="hidden lg:flex justify-center mt-16">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-luxury">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: typeof steps[0];
  index: number;
}) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Content */}
      <div
        className={`lg:py-12 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:order-2 lg:pl-16'}`}
      >
        {/* Step Number */}
        <div
          className={`font-serif text-8xl text-accent/20 mb-4 ${
            isEven ? 'lg:text-right' : 'lg:text-left'
          }`}
        >
          {step.number}
        </div>

        <h3 className="font-serif text-3xl md:text-4xl text-black mb-4 tracking-[-0.3px]">{step.title}</h3>
        <p className="font-sans text-gray-600 leading-[1.9]">{step.description}</p>
      </div>

      {/* Timeline Dot */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      {/* Spacer for grid */}
      <div className={isEven ? 'lg:order-2' : ''} />
    </div>
  );
}
