import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What types of events do you plan?',
    answer:
      'We specialize in luxury weddings, corporate galas, private celebrations, destination events, birthday parties, engagement ceremonies, and bespoke themed gatherings. Every event is custom-tailored to your vision.',
  },
  {
    question: 'How far in advance should we book?',
    answer:
      'For weddings and large-scale events, we recommend booking 8–12 months in advance. For smaller celebrations, 3–6 months allows us to deliver exceptional results. Last-minute inquiries are always welcome and handled with care.',
  },
  {
    question: 'Do you handle destination weddings?',
    answer:
      'Absolutely. Our team has coordinated luxury destination weddings across Europe, the Middle East, the Caribbean, and Asia. We manage every logistical detail so you can focus on celebrating.',
  },
  {
    question: 'What is your pricing structure?',
    answer:
      'Each event receives a bespoke proposal based on scope, guest count, location, and design complexity. We offer transparent pricing with no hidden fees. A complimentary consultation is the best way to receive an accurate estimate.',
  },
  {
    question: 'Can we customize every aspect of our event?',
    answer:
      'Yes—every element from color palettes and floral design to entertainment, cuisine, and lighting is fully customizable. Our creative team collaborates with you to bring your unique vision to life.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="FAQ" scriptText="Questions" />

        <div
          ref={ref}
          className={`mt-16 space-y-5 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-400 hover:shadow-card"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-8 py-7 text-left transition-colors duration-300"
              >
                <span className="font-serif text-lg md:text-xl text-black pr-8 tracking-[-0.2px]">
                  {faq.question}
                </span>
                <ChevronDown
                  size={22}
                  className={`flex-shrink-0 text-accent transition-transform duration-400 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ease-out ${
                  openIdx === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="font-sans text-gray-600 leading-[1.9] px-8 pb-7">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}