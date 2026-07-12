import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import EventCategories from '../components/EventCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Awards from '../components/Awards';
import Gallery from '../components/Gallery';
import Booking from '../components/Booking';
import Instagram from '../components/Instagram';
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
      <Services />
      <EventCategories />
      <WhyChooseUs />
      <Process />
      <Portfolio />
      <Testimonials />
      <Awards />
      <Gallery />
      <Booking />
      <Instagram />
      <FAQ />
      <CTA />
      <FloatingContact />
    </>
  );
}