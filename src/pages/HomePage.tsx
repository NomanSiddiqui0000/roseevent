import Hero from '../components/Hero';
import About from '../components/About';
import WhoWeAre from '../components/WhoWeAre';
import Services from '../components/Services';
import EventCategories from '../components/EventCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Journey from '../components/Journey';
import WeddingJourney from '../components/WeddingJourney';
import FeaturedIn from '../components/FeaturedIn';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Awards from '../components/Awards';
import Gallery from '../components/Gallery';
import DateReservation from '../components/DateReservation';
import ErrorBoundary from '../components/ErrorBoundary';
import Booking from '../components/Booking';
import Instagram from '../components/Instagram';
import InstagramGallery from '../components/InstagramGallery';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import FloatingContact from '../components/FloatingContact';
import ScrollProgress from '../components/ScrollProgress';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <About />
      <WhoWeAre />
      <Services />
      <EventCategories />
      <WhyChooseUs />
      <Process />
      <Journey />
      <WeddingJourney />
      <FeaturedIn />
      <Portfolio />
      <Testimonials />
      <Awards />
      <Gallery />
      <ErrorBoundary name="DateReservation"><DateReservation /></ErrorBoundary>
      <Booking />
      <Instagram />
      <InstagramGallery />
      <FAQ />
      <CTA />
      <FloatingContact />
    </>
  );
}
