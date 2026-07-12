import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, Users, MapPin, DollarSign } from 'lucide-react';

const eventTypes = ['Wedding', 'Corporate', 'Birthday', 'Engagement', 'Private Party', 'Other'];
const guestRanges = ['Under 50', '50–100', '100–250', '250–500', '500+'];
const budgetRanges = ['$5K–$15K', '$15K–$50K', '$50K–$100K', '$100K–$250K', '$250K+'];

export default function BookingWidget() {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section className="py-32 bg-gradient-to-b from-secondary to-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <SectionHeading bgText="BOOKING" scriptText="Plan Your Event" />

        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="mt-16 bg-white rounded-2xl shadow-card border border-gray-50 p-8 md:p-12"
          >
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= s ? 'bg-accent w-12' : 'bg-gray-200 w-8'
                  }`}
                />
              ))}
            </div>

            {/* Step 1 — Event Type */}
            {step === 1 && (
              <StepWrapper icon={Calendar} title="What type of event are you planning?">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => { setEventType(type); setStep(2); }}
                      className={`py-4 px-6 rounded-xl font-sans font-semibold text-sm tracking-wide transition-all duration-300 ${
                        eventType === type
                          ? 'bg-accent text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-accent/8 hover:text-accent border border-transparent hover:border-accent/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 2 — Guest Count */}
            {step === 2 && (
              <StepWrapper icon={Users} title="How many guests?" subtitle="Guest range">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                  {guestRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => { setGuestCount(range); setStep(3); }}
                      className={`py-4 px-6 rounded-xl font-sans font-semibold text-sm tracking-wide transition-all duration-300 ${
                        guestCount === range
                          ? 'bg-accent text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-accent/8 hover:text-accent border border-transparent hover:border-accent/20'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 3 — Location */}
            {step === 3 && (
              <StepWrapper icon={MapPin} title="Where will your event take place?">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or venue name"
                  className="w-full mt-8 px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl font-sans text-sm placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => location && setStep(4)}
                  className="mt-6 px-8 py-4 bg-accent text-white font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-xl shadow-lg hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300"
                >
                  Continue
                </button>
              </StepWrapper>
            )}

            {/* Step 4 — Budget & Submit */}
            {step === 4 && (
              <StepWrapper icon={DollarSign} title="Budget range" subtitle="Select one">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setBudget(range)}
                      className={`py-4 px-6 rounded-xl font-sans font-semibold text-sm tracking-wide transition-all duration-300 ${
                        budget === range
                          ? 'bg-accent text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-accent/8 hover:text-accent border border-transparent hover:border-accent/20'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-10 w-full py-5 bg-accent text-white font-sans font-bold text-sm tracking-[1.5px] uppercase rounded-xl shadow-lg hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300"
                >
                  Request Consultation
                </button>
              </StepWrapper>
            )}

            {/* Success Message */}
            {submitted && (
              <div className="text-center animate-fade-in">
                <p className="font-serif text-2xl text-accent mb-2">Thank You!</p>
                <p className="font-sans text-gray-600">Our team will reach out within 24 hours.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function StepWrapper({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
          <Icon size={22} className="text-accent" />
        </div>
      </div>
      <h4 className="font-serif text-2xl md:text-3xl text-black text-center tracking-[-0.3px]">
        {title}
      </h4>
      {subtitle && (
        <p className="font-sans text-sm text-gray-500 text-center mt-2 tracking-wide uppercase">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}