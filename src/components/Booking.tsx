import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, Users, MapPin, DollarSign, CheckCircle, Check } from 'lucide-react';

const eventTypes = ['Wedding', 'Corporate', 'Birthday', 'Engagement', 'Private Party', 'Other'];
const guestRanges = ['Under 50', '50–100', '100–250', '250–500', '500+'];
const budgetRanges = ['$5K–$15K', '$15K–$50K', '$50K–$100K', '$100K–$250K', '$250K+'];

const stepLabels = ['Event Type', 'Guests', 'Location', 'Budget'];
const STEP_ICONS = [Calendar, Users, MapPin, DollarSign];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

export default function BookingWidget() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  const advanceTo = (s: number) => {
    setDirection(s > step ? 1 : -1);
    setStep(s);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDirection(0);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setEventType('');
    setGuestCount('');
    setLocation('');
    setBudget('');
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
            className="mt-16"
          >
            {/* Step Indicator */}
            {!submitted && (
              <div className="flex items-center justify-center gap-0 mb-14">
                {stepLabels.map((label, i) => {
                  const s = i + 1;
                  const Icon = STEP_ICONS[i];
                  return (
                    <div key={s} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => s <= step && advanceTo(s)}
                          disabled={s > step}
                          className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-400 ${
                            s < step
                              ? 'bg-accent text-white shadow-[0_4px_12px_rgba(155,44,79,0.25)]'
                              : s === step
                              ? 'bg-accent text-white shadow-[0_4px_12px_rgba(155,44,79,0.25)] ring-2 ring-accent/25'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {s < step ? <Check size={16} /> : <Icon size={16} />}
                        </button>
                        <span className={`font-sans text-[10px] md:text-xs mt-1.5 whitespace-nowrap transition-all duration-300 ${
                          s <= step ? 'text-accent font-semibold' : 'text-gray-400'
                        }`}>
                          {label}
                        </span>
                      </div>
                      {i < stepLabels.length - 1 && (
                        <div className={`w-8 md:w-12 h-0.5 mx-1.5 md:mx-2 mb-5 rounded-full transition-all duration-400 ${
                          s <= step ? 'bg-accent/40' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {!submitted ? (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  {/* Step 1 — Event Type */}
                  {step === 1 && (
                    <StepWrapper icon={Calendar} title="What type of event are you planning?">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                        {eventTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => { setEventType(type); advanceTo(2); }}
                            className={`py-5 px-6 rounded-xl font-sans font-semibold text-sm md:text-base tracking-wide transition-all duration-300 ${
                              eventType === type
                                ? 'bg-accent text-white shadow-lg ring-2 ring-accent/20'
                                : 'bg-white text-gray-700 border border-accent/15 hover:bg-accent hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:ring-2 hover:ring-accent/20 shadow-sm'
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                        {guestRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => { setGuestCount(range); advanceTo(3); }}
                            className={`py-5 px-6 rounded-xl font-sans font-semibold text-sm md:text-base tracking-wide transition-all duration-300 ${
                              guestCount === range
                                ? 'bg-accent text-white shadow-lg ring-2 ring-accent/20'
                                : 'bg-white text-gray-700 border border-accent/15 hover:bg-accent hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:ring-2 hover:ring-accent/20 shadow-sm'
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
                        className="w-full mt-10 px-8 py-5 bg-white border border-accent/15 rounded-xl font-sans text-base placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all shadow-sm"
                      />
                      <div className="flex justify-center mt-8">
                        <button
                          type="button"
                          onClick={() => location && advanceTo(4)}
                          disabled={!location}
                          className={`px-10 py-5 rounded-xl font-sans font-bold text-sm tracking-[1.5px] uppercase transition-all duration-300 ${
                            location
                              ? 'bg-accent text-white shadow-[0_8px_24px_rgba(155,44,79,0.2)] hover:bg-accent-dark hover:-translate-y-0.5'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Continue
                        </button>
                      </div>
                    </StepWrapper>
                  )}

                  {/* Step 4 — Budget & Submit */}
                  {step === 4 && (
                    <StepWrapper icon={DollarSign} title="Select your budget range" subtitle="Estimated budget">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setBudget(range)}
                            className={`py-5 px-6 rounded-xl font-sans font-semibold text-sm md:text-base tracking-wide transition-all duration-300 ${
                              budget === range
                                ? 'bg-accent text-white shadow-lg ring-2 ring-accent/20'
                                : 'bg-white text-gray-700 border border-accent/15 hover:bg-accent hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:ring-2 hover:ring-accent/20 shadow-sm'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-center mt-12">
                        <button
                          type="submit"
                          disabled={!budget}
                          className={`px-14 py-5 rounded-xl font-sans font-bold text-sm tracking-[1.5px] uppercase transition-all duration-300 ${
                            budget
                              ? 'bg-accent text-white shadow-[0_8px_24px_rgba(155,44,79,0.25)] hover:bg-accent-dark hover:-translate-y-0.5'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Request Consultation
                        </button>
                      </div>
                    </StepWrapper>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-center max-w-xl mx-auto"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-10"
                  >
                    <CheckCircle size={56} className="text-accent" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="font-serif text-5xl md:text-6xl text-accent mb-5"
                  >
                    Thank You!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="font-sans text-lg text-gray-600 leading-relaxed mb-4"
                  >
                    Your booking request has been successfully submitted.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="font-sans text-base text-gray-500 leading-relaxed mb-10"
                  >
                    Our team will contact you shortly to begin planning your special event.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-10 py-4 bg-accent text-white font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-xl shadow-[0_8px_24px_rgba(155,44,79,0.2)] hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
    <div>
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center shadow-[0_4px_12px_rgba(155,44,79,0.06)]">
          <Icon size={26} className="text-accent" />
        </div>
      </div>
      <h4 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] text-center tracking-[-0.5px] leading-tight">
        {title}
      </h4>
      {subtitle && (
        <p className="font-sans text-sm text-gray-500 text-center mt-2 tracking-wide uppercase font-semibold">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
