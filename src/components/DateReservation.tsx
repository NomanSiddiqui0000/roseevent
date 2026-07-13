import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lock, CheckCircle, Plus, Minus } from 'lucide-react';
import { useScrollReveal, useCounterAnimation } from '../hooks/useScrollReveal';

/* ════════════════════════════════════════════
   Types
   ════════════════════════════════════════════ */
type DateStatus = 'available' | 'reserved' | 'limited' | 'past';

type CalendarDate = {
  date: Date;
  day: number;
  status: DateStatus;
  isToday: boolean;
  isCurrentMonth: boolean;
};

type BookingData = {
  date: string | null;
  eventType: string | null;
  guests: string | null;
  budget: string | null;
  venue: string | null;
  notes: string;
};

/* ════════════════════════════════════════════
   Mock reserved dates (admin-managed)
   ════════════════════════════════════════════ */
const reservedDates: string[] = [
  '2026-07-18', '2026-07-20', '2026-07-25', '2026-07-27', '2026-07-30',
  '2026-08-01', '2026-08-05', '2026-08-08', '2026-08-12', '2026-08-15',
  '2026-08-22', '2026-08-29',
  '2026-09-06', '2026-09-10', '2026-09-13', '2026-09-19', '2026-09-26',
];
const limitedDates: string[] = ['2026-07-19', '2026-08-02', '2026-09-05', '2026-09-20'];

/* ════════════════════════════════════════════
   Constants
   ════════════════════════════════════════════ */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const EVENT_TYPES = ['Wedding', 'Engagement', 'Reception', 'Birthday', 'Corporate', 'Private Party', 'Other'];
const GUEST_OPTIONS = ['50', '100', '150', '300', '500+'];
const BUDGET_OPTIONS = ['Under $5k', '$5k–10k', '$10k–20k', '$20k+', 'Custom'];
const VENUE_OPTIONS = ['Indoor', 'Outdoor', 'Destination', 'Undecided'];

const STEP_LABELS = ['Event', 'Guests', 'Budget', 'Venue', 'Notes'];

/* ════════════════════════════════════════════
   Date helpers
   ════════════════════════════════════════════ */
function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildMonthGrid(year: number, month: number): CalendarDate[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const today = new Date();

  const cells: CalendarDate[] = [];

  for (let p = 0; p < startPad; p++) {
    const d = new Date(year, month, -startPad + p + 1);
    cells.push({ date: d, day: d.getDate(), status: 'past', isToday: false, isCurrentMonth: false });
  }

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const key = toKey(date);
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let status: DateStatus = 'past';
    if (isSameDay(date, today)) {
      status = 'available';
    } else if (reservedDates.includes(key)) {
      status = 'reserved';
    } else if (limitedDates.includes(key)) {
      status = 'limited';
    } else if (!isPast) {
      status = 'available';
    }
    cells.push({ date, day: d, status, isToday: isSameDay(date, today), isCurrentMonth: true });
  }

  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    cells.push({ date: d, day: d.getDate(), status: 'past', isToday: false, isCurrentMonth: false });
  }

  const weeks: CalendarDate[][] = [];
  for (let i = 0; i < 6; i++) weeks.push(cells.slice(i * 7, i * 7 + 7));
  return weeks;
}

function countByStatus(weeks: CalendarDate[][]): { available: number; reserved: number; limited: number } {
  let available = 0, reserved = 0, limited = 0;
  for (const week of weeks) {
    for (const c of week) {
      if (!c.isCurrentMonth) continue;
      if (c.status === 'available' && !c.isToday) available++;
      else if (c.status === 'reserved') reserved++;
      else if (c.status === 'limited') limited++;
    }
  }
  return { available, reserved, limited };
}

/* ════════════════════════════════════════════
   DateReservation — main component
   ════════════════════════════════════════════ */
export default function DateReservation() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [booking, setBooking] = useState<BookingData>({ date: null, eventType: null, guests: null, budget: null, venue: null, notes: '' });
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1);
  const [sectionRef, sectionVisible] = useScrollReveal<HTMLDivElement>();
  const [calendarRef, calendarVisible] = useScrollReveal<HTMLDivElement>();
  const [panelRef, panelVisible] = useScrollReveal<HTMLDivElement>();

  const weeks = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const counts = useMemo(() => countByStatus(weeks), [weeks]);
  const { count: availCount, ref: availRef } = useCounterAnimation(counts.available, 1200);
  const { count: reservedCount, ref: reservedRef } = useCounterAnimation(counts.reserved, 1200);
  const { count: limitedCount, ref: limitedRef } = useCounterAnimation(counts.limited, 1200);
  const fullyBooked = counts.available === 0;

  const goNextMonth = useCallback(() => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setDirection(1);
  }, [month]);

  const goPrevMonth = useCallback(() => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setDirection(-1);
  }, [month]);

  const goToNextAvailableMonth = useCallback(() => {
    let m = month, y = year;
    for (let i = 0; i < 12; i++) {
      m++;
      if (m > 11) { m = 0; y++; }
      const testWeeks = buildMonthGrid(y, m);
      const testCounts = countByStatus(testWeeks);
      if (testCounts.available > 0) {
        setYear(y);
        setMonth(m);
        setDirection(1);
        return;
      }
    }
  }, [month, year]);

  const handleDateSelect = useCallback((cd: CalendarDate) => {
    if (cd.status !== 'available') return;
    setSelectedDate(cd.date);
    setBooking(prev => ({ ...prev, date: toKey(cd.date) }));
    setStep(1);
    setMaxStep(1);
  }, []);

  const handleBook = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2200);
  }, []);

  const reset = useCallback(() => {
    setSelectedDate(null);
    setBooking({ date: null, eventType: null, guests: null, budget: null, venue: null, notes: '' });
    setStep(1);
    setMaxStep(1);
    setSubmitted(false);
    setDirection(1);
  }, []);

  const advanceStep = useCallback((s: number) => {
    setDirection(s > step ? 1 : -1);
    setStep(s);
    if (s > maxStep) setMaxStep(s);
  }, [step, maxStep]);

  const updateBooking = useCallback((key: keyof BookingData, value: any) => {
    setBooking(prev => ({ ...prev, [key]: value }));
  }, []);

  const isStepComplete = useMemo(() => {
    if (!selectedDate) return false;
    if (!booking.eventType) return false;
    if (!booking.guests) return false;
    if (!booking.budget) return false;
    if (!booking.venue) return false;
    return true;
  }, [selectedDate, booking]);

  const monthLabel = `${MONTHS[month]} ${year}`;

  return (
    <section className="relative py-32 bg-gradient-to-b from-secondary to-white overflow-hidden">
      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 w-32 h-32 border-l border-t border-accent/10" aria-hidden />
      <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 border-r border-t border-accent/10" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 border-l border-b border-accent/10" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 border-r border-b border-accent/10" aria-hidden />

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[200px]" aria-hidden />

      {/* Botanical decorative SVG */}
      <svg className="pointer-events-none absolute bottom-12 left-8 w-28 h-56 opacity-[0.07]" viewBox="0 0 100 200" fill="none" aria-hidden>
        <path d="M50 200 Q30 150 50 100 Q70 50 50 0" stroke="#9B2C4F" strokeWidth="1.5" />
        <path d="M50 160 Q70 140 85 155" stroke="#9B2C4F" strokeWidth="1" />
        <path d="M50 130 Q30 110 15 125" stroke="#9B2C4F" strokeWidth="1" />
        <path d="M50 90 Q70 70 85 85" stroke="#9B2C4F" strokeWidth="1" />
        <circle cx="50" cy="42" r="5" stroke="#9B2C4F" strokeWidth="0.8" fill="none" />
        <circle cx="50" cy="42" r="8" stroke="#9B2C4F" strokeWidth="0.5" fill="none" />
      </svg>
      <svg className="pointer-events-none absolute top-20 right-8 w-20 h-40 opacity-[0.05]" viewBox="0 0 80 160" fill="none" aria-hidden>
        <path d="M40 160 Q20 120 40 80 Q60 40 40 0" stroke="#9B2C4F" strokeWidth="1.5" />
        <circle cx="40" cy="30" r="4" stroke="#9B2C4F" strokeWidth="0.8" fill="none" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ═══ Section Heading ═══ */}
        <div
          ref={sectionRef}
          className={`section-heading mb-16 lg:mb-20 transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <span className="bg-text !text-accent/12">CALENDAR</span>
          <h2 className="main-text !text-4xl md:!text-5xl lg:!text-6xl">Reserve Your Date</h2>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2D2D] relative z-10 mt-1 leading-[1.15] tracking-[-0.5px]">
            Find The Perfect Day For Your Celebration
          </h3>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-accent/40" />
            <div className="w-2 h-2 rounded-full border border-accent" />
            <div className="w-16 h-px bg-accent/40" />
          </div>
        </div>

        {/* ═══ Two-column layout ═══ */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ── Left: Calendar ── */}
          <div
            ref={calendarRef}
            className={`lg:col-span-7 transition-all duration-1000 ${calendarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <div className="bg-white rounded-[20px] border border-accent/15 shadow-[0_12px_48px_rgba(0,0,0,0.06)] p-6 md:p-8 lg:p-10">
              {/* Availability header */}
              <AvailabilityHeader counts={counts} availRef={availRef} reservedRef={reservedRef} limitedRef={limitedRef} sectionVisible={sectionVisible} />

              {/* Month navigation */}
              <div className="flex items-center justify-between mb-8 mt-8">
                <button
                  onClick={goPrevMonth}
                  className="group flex items-center justify-center w-11 h-11 rounded-full border border-accent/25 text-accent/70 hover:text-accent hover:border-accent hover:bg-accent/8 hover:shadow-[0_4px_12px_rgba(155,44,79,0.08)] transition-all duration-300"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={22} className="transition-transform group-hover:-translate-x-0.5" />
                </button>
                <h4 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] tracking-[-0.5px] font-bold">
                  {monthLabel}
                </h4>
                <button
                  onClick={goNextMonth}
                  className="group flex items-center justify-center w-11 h-11 rounded-full border border-accent/25 text-accent/70 hover:text-accent hover:border-accent hover:bg-accent/8 hover:shadow-[0_4px_12px_rgba(155,44,79,0.08)] transition-all duration-300"
                  aria-label="Next month"
                >
                  <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-3">
                {DAYS.map(d => (
                  <div key={d} className="text-center font-sans text-[12px] md:text-sm font-bold text-accent/80 tracking-[1.5px] uppercase py-2.5">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${year}-${month}`}
                  custom={direction}
                  variants={monthVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {fullyBooked ? (
                    <FullyBookedState onNextMonth={goToNextAvailableMonth} />
                  ) : (
                    <div className="space-y-1.5">
                      {weeks.map((week, wi) => (
                        <div key={wi} className="grid grid-cols-7 gap-1.5">
                          {week.map((cd, di) => (
                            <CalendarCell
                              key={`${wi}-${di}`}
                              cd={cd}
                              isSelected={selectedDate ? isSameDay(cd.date, selectedDate) : false}
                              onSelect={handleDateSelect}
                              index={wi * 7 + di}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Legend */}
              <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-accent/15">
                <LegendDot color="bg-accent/[0.07] border-accent/30" label="Reserved" />
                <LegendDot color="bg-white border-accent/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]" label="Available" />
                <LegendDot color="bg-gradient-to-br from-accent to-[#7A1F3D] border-accent shadow-sm" label="Selected" />
              </div>
            </div>
          </div>

          {/* ── Right: Booking Panel ── */}
          <div
            ref={panelRef}
            className={`lg:col-span-5 transition-all duration-1000 delay-200 ${panelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            {!submitted ? (
              <BookingPanel
                selectedDate={selectedDate}
                booking={booking}
                step={step}
                maxStep={maxStep}
                loading={loading}
                direction={direction}
                onAdvance={advanceStep}
                onUpdate={updateBooking}
                onSubmit={handleBook}
                isComplete={isStepComplete}
              />
            ) : (
              <SuccessScreen onReset={reset} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   Calendar Cell
   ════════════════════════════════════════════ */
function CalendarCell({ cd, isSelected, onSelect, index }: { cd: CalendarDate; isSelected: boolean; onSelect: (c: CalendarDate) => void; index: number }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isAvailable = cd.status === 'available' && cd.isCurrentMonth;
  const isReserved = cd.status === 'reserved' && cd.isCurrentMonth;
  const isLimited = cd.status === 'limited' && cd.isCurrentMonth;
  const isPast = cd.status === 'past' || !cd.isCurrentMonth;

  const isWeekend = cd.date.getDay() === 0 || cd.date.getDay() === 6;
  const isPopular = isWeekend && isAvailable && !cd.isToday;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onSelect(cd)}
        onMouseEnter={() => isAvailable && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={!isAvailable && !isLimited}
        className={`
          relative w-full aspect-square rounded-[12px] flex items-center justify-center
          font-sans text-sm md:text-base font-medium transition-all duration-[300ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${!cd.isCurrentMonth ? 'text-gray-300 cursor-default' : ''}
          ${isPast ? 'text-gray-400 cursor-default bg-transparent' : ''}
          ${isReserved ? 'bg-accent/[0.07] text-accent/60 cursor-default border border-accent/15' : ''}
          ${isLimited ? 'bg-amber-50/80 text-amber-800/70 cursor-pointer border border-amber-200/60 hover:border-amber-300 hover:shadow-[0_4px_16px_rgba(251,191,36,0.15)]' : ''}
          ${isAvailable && !isSelected ? 'bg-white text-[#1A1A1A] border border-accent/25 hover:border-accent hover:shadow-[0_8px_28px_rgba(155,44,79,0.15)] hover:-translate-y-1 cursor-pointer' : ''}
          ${isSelected ? 'bg-gradient-to-br from-accent to-[#7A1F3D] text-white border-accent shadow-[0_8px_32px_rgba(155,44,79,0.35)] ring-2 ring-accent/20' : ''}
          ${cd.isToday && !isSelected ? 'ring-2 ring-amber-400/50 ring-offset-1' : ''}
        `}
        style={{ animationDelay: `${index * 30}ms`, animation: 'staggerFadeUp 0.5s ease-out forwards', opacity: 0 }}
      >
        <span className={`relative z-10 text-sm md:text-base ${isSelected ? 'font-bold' : 'font-medium'}`}>{cd.day}</span>

        {/* Popular badge */}
        {isPopular && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_1px_4px_rgba(155,44,79,0.3)]" />
        )}

        {/* Lock icon for reserved */}
        {isReserved && (
          <Lock size={10} className="absolute bottom-1 right-1 text-accent/40" />
        )}

        {/* Reserved ribbon */}
        {isReserved && (
          <span className="absolute -top-px left-1/2 -translate-x-1/2 w-[80%] h-px bg-accent/30 rounded-full" />
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-30 pointer-events-none" onMouseEnter={() => setShowTooltip(false)}>
          <div className="bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] rounded-[10px] px-4 py-2.5 text-center border border-accent/10 whitespace-nowrap">
            <p className="font-sans text-xs font-bold text-accent tracking-wide uppercase">Available</p>
            {isPopular && <p className="font-sans text-[11px] text-amber-600/80 mt-0.5 font-medium">Popular date</p>}
            {cd.isToday && <p className="font-sans text-[11px] text-amber-600/80 mt-0.5 font-medium">Today</p>}
            {isLimited && <p className="font-sans text-[11px] text-amber-600/80 mt-0.5 font-medium">Limited slots</p>}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-l border-b border-accent/10 rotate-45 -mt-[3px]" />
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   Availability Header
   ════════════════════════════════════════════ */
function AvailabilityHeader({ counts, availRef, reservedRef, limitedRef, sectionVisible }: {
  counts: { available: number; reserved: number; limited: number };
  availRef: React.RefObject<HTMLSpanElement | null>;
  reservedRef: React.RefObject<HTMLSpanElement | null>;
  limitedRef: React.RefObject<HTMLSpanElement | null>;
  sectionVisible: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-8 md:gap-12 pb-7 border-b border-accent/15">
      <div className="text-center">
        <span ref={availRef} className="font-serif text-3xl md:text-4xl font-bold text-emerald-700">{sectionVisible ? counts.available : 0}</span>
        <p className="font-sans text-[11px] md:text-xs font-semibold text-gray-600 tracking-[1px] uppercase mt-1.5">Available</p>
      </div>
      <div className="w-px h-12 bg-accent/20" />
      <div className="text-center">
        <span ref={limitedRef} className="font-serif text-3xl md:text-4xl font-bold text-amber-700">{sectionVisible ? counts.limited : 0}</span>
        <p className="font-sans text-[11px] md:text-xs font-semibold text-gray-600 tracking-[1px] uppercase mt-1.5">Limited</p>
      </div>
      <div className="w-px h-12 bg-accent/20" />
      <div className="text-center">
        <span ref={reservedRef} className="font-serif text-3xl md:text-4xl font-bold text-accent/70">{sectionVisible ? counts.reserved : 0}</span>
        <p className="font-sans text-[11px] md:text-xs font-semibold text-gray-600 tracking-[1px] uppercase mt-1.5">Reserved</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   Fully Booked State
   ════════════════════════════════════════════ */
function FullyBookedState({ onNextMonth }: { onNextMonth: () => void }) {
  return (
    <div className="py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/[0.06] flex items-center justify-center mx-auto mb-7 shadow-[0_4px_16px_rgba(155,44,79,0.06)]">
        <Lock size={32} className="text-accent/40" />
      </div>
      <h4 className="font-serif text-3xl text-[#2D2D2D] font-semibold mb-3">Fully Reserved</h4>
      <p className="font-sans text-sm text-gray-500 max-w-xs mx-auto mb-7">
        This month is fully reserved. Explore our next available dates.
      </p>
      <button
        onClick={onNextMonth}
        className="px-8 py-4 bg-accent text-white font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-[10px] hover:bg-accent-dark transition-all duration-300 shadow-lg hover:-translate-y-0.5"
      >
        Next Available Month
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════
   Booking Panel
   ════════════════════════════════════════════ */
function BookingPanel({ selectedDate, booking, step, maxStep, loading, direction, onAdvance, onUpdate, onSubmit, isComplete }: {
  selectedDate: Date | null;
  booking: BookingData;
  step: number;
  maxStep: number;
  loading: boolean;
  direction: number;
  onAdvance: (s: number) => void;
  onUpdate: (key: keyof BookingData, val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isComplete: boolean;
}) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-[20px] border border-accent/15 shadow-[0_12px_48px_rgba(0,0,0,0.06)] p-6 md:p-8 lg:p-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
    >
      {!selectedDate ? (
        /* Empty state */
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-full bg-accent/[0.06] flex items-center justify-center mx-auto mb-7 shadow-[0_4px_16px_rgba(155,44,79,0.06)]">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#9B2C4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h4 className="font-serif text-3xl md:text-4xl text-[#2D2D2D] font-semibold mb-3">Select a Date</h4>
          <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
            Choose an available date from the calendar to begin your reservation.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {/* Selected date display */}
          <div className="text-center pb-7 border-b border-accent/15 mb-7">
            <p className="font-sans text-xs text-accent tracking-[2px] uppercase font-bold mb-1.5">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
            <h3 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] font-bold tracking-[-0.5px] leading-tight">
              {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
            <div className="w-16 h-px bg-accent/40 mx-auto mt-5" />
          </div>

          {/* Step progress indicator */}
          <div className="flex items-center justify-center gap-0 mb-8">
            {STEP_LABELS.map((label, i) => {
              const s = i + 1;
              return (
                <div key={s} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => s <= maxStep && onAdvance(s)}
                    disabled={s > maxStep}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold font-sans transition-all duration-300 ${s < step ? 'bg-accent text-white shadow-[0_2px_8px_rgba(155,44,79,0.2)]' : s === step ? 'bg-accent text-white ring-2 ring-accent/30 shadow-[0_2px_8px_rgba(155,44,79,0.2)]' : 'bg-gray-100 text-gray-400'
                      } ${s > maxStep ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    {s < step ? <CheckCircle size={12} /> : s}
                  </button>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`w-6 h-px mx-1.5 transition-all duration-300 ${s <= step ? 'bg-accent/50' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`step-${step}`}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {/* Step 1 — Event Type */}
              {step === 1 && (
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-[#2D2D2D] text-center mb-5">Choose Event Type</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {EVENT_TYPES.map(et => (
                      <button
                        key={et}
                        type="button"
                        onClick={() => { onUpdate('eventType', et); onAdvance(2); }}
                        className={`py-4 px-4 rounded-[12px] font-sans text-sm font-semibold tracking-wide transition-all duration-300 ${booking.eventType === et
                            ? 'bg-accent text-white shadow-md ring-2 ring-accent/30'
                            : 'bg-accent/[0.04] text-[#1A1A1A] border border-accent/15 hover:border-accent/40 hover:bg-accent/[0.06] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(155,44,79,0.08)]'
                          }`}
                      >
                        {et}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Guests */}
              {step === 2 && (
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-[#2D2D2D] text-center mb-5">Estimated Guests</h4>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        const currentIdx = GUEST_OPTIONS.indexOf(booking.guests || '');
                        if (currentIdx > 0) onUpdate('guests', GUEST_OPTIONS[currentIdx - 1]);
                      }}
                      className="w-12 h-12 rounded-full border border-accent/20 text-accent flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                    >
                      <Minus size={18} />
                    </button>
                    <div className="w-28 text-center">
                      <span className="font-serif text-3xl font-bold text-[#2D2D2D]">{booking.guests || '—'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentIdx = GUEST_OPTIONS.indexOf(booking.guests || '');
                        if (currentIdx < GUEST_OPTIONS.length - 1) onUpdate('guests', GUEST_OPTIONS[currentIdx + 1]);
                      }}
                      className="w-12 h-12 rounded-full border border-accent/20 text-accent flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex justify-center gap-2">
                    {GUEST_OPTIONS.map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => { onUpdate('guests', g); onAdvance(3); }}
                        className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold transition-all duration-300 ${booking.guests === g
                            ? 'bg-accent/10 text-accent border border-accent/30'
                            : 'text-gray-500 border border-transparent hover:text-accent hover:border-accent/20'
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Budget */}
              {step === 3 && (
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-[#2D2D2D] text-center mb-5">Estimated Budget</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {BUDGET_OPTIONS.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => { onUpdate('budget', b); onAdvance(4); }}
                        className={`py-4 px-4 rounded-[12px] font-sans text-sm font-semibold tracking-wide transition-all duration-300 ${booking.budget === b
                            ? 'bg-accent text-white shadow-md ring-2 ring-accent/30'
                            : 'bg-accent/[0.04] text-[#1A1A1A] border border-accent/15 hover:border-accent/40 hover:bg-accent/[0.06] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(155,44,79,0.08)]'
                          }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 — Venue */}
              {step === 4 && (
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-[#2D2D2D] text-center mb-5">Venue Preference</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {VENUE_OPTIONS.map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => { onUpdate('venue', v); onAdvance(5); }}
                        className={`py-4 px-4 rounded-[12px] font-sans text-sm font-semibold tracking-wide transition-all duration-300 ${booking.venue === v
                            ? 'bg-accent text-white shadow-md ring-2 ring-accent/30'
                            : 'bg-accent/[0.04] text-[#1A1A1A] border border-accent/15 hover:border-accent/40 hover:bg-accent/[0.06] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(155,44,79,0.08)]'
                          }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 — Notes + Submit */}
              {step === 5 && (
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-[#2D2D2D] text-center mb-5">Special Notes</h4>
                  <textarea
                    value={booking.notes}
                    onChange={e => onUpdate('notes', e.target.value)}
                    placeholder="Tell us about your dream celebration..."
                    rows={4}
                    className="w-full px-5 py-4 bg-accent/[0.03] border border-accent/15 rounded-[12px] font-sans text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Booking Summary */}
          <div className="mt-7 pt-7 border-t border-accent/15">
            <div className="space-y-3 mb-6">
              <SummaryRow label="Date" value={booking.date ? new Date(booking.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '—'} />
              <SummaryRow label="Event" value={booking.eventType || '—'} />
              <SummaryRow label="Guests" value={booking.guests || '—'} />
              <SummaryRow label="Budget" value={booking.budget || '—'} />
              <SummaryRow label="Venue" value={booking.venue || '—'} />
            </div>

            <p className="font-sans text-[11px] text-gray-400 text-center mb-4 italic">
              Our wedding consultants typically respond within 24 hours.
            </p>

            <button
              type="submit"
              disabled={!isComplete || loading}
              className={`w-full py-5 rounded-[12px] font-sans font-bold text-xs tracking-[1.5px] uppercase transition-all duration-500 relative overflow-hidden ${isComplete && !loading
                  ? 'bg-gradient-to-r from-accent to-[#8A2745] text-white shadow-[0_8px_28px_rgba(155,44,79,0.30)] hover:shadow-[0_12px_36px_rgba(155,44,79,0.40)] hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <RoseSpinner />
                  Reserving Your Date...
                </span>
              ) : (
                'Reserve My Date'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-sans text-xs font-medium text-gray-600 tracking-wide">{label}</span>
      <span className="font-sans text-sm font-bold text-[#1A1A1A]">{value}</span>
    </div>
  );
}

function RoseSpinner() {
  return (
    <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
  );
}

/* ════════════════════════════════════════════
   Success Screen
   ════════════════════════════════════════════ */
function SuccessScreen({ onReset }: { onReset: () => void }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-[20px] border border-accent/15 shadow-[0_12px_48px_rgba(0,0,0,0.06)] p-8 md:p-10 text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
    >
      {/* Animated success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.15 }}
        className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle size={48} className="text-accent" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-serif text-3xl md:text-4xl text-[#2D2D2D] mb-3"
      >
        Your Celebration Begins Here
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="font-sans text-sm text-gray-500 leading-relaxed max-w-sm mx-auto mb-8"
      >
        We've received your inquiry and our planning team will contact you shortly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={onReset}
          className="px-8 py-4 bg-accent text-white font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-[12px] shadow-lg hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300"
        >
          Reserve Another Date
        </button>
      </motion.div>

      {/* Floating rose petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full opacity-0"
            style={{
              background: i % 2 === 0 ? 'rgba(155,44,79,0.12)' : 'rgba(155,44,79,0.06)',
              left: `${10 + (i * 11) % 80}%`,
            }}
            animate={{
              y: [60, -20],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              delay: 0.5 + i * 0.25,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   Shared helpers
   ════════════════════════════════════════════ */
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-4 h-4 rounded-[4px] border ${color}`} />
      <span className="font-sans text-xs font-semibold text-gray-600 tracking-[0.5px]">{label}</span>
    </div>
  );
}

/* ════════════════════════════════════════════
   Animation variants
   ════════════════════════════════════════════ */
const monthVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
};
