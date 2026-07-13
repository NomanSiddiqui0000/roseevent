import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Services', to: '/services' },
  { name: 'Portfolio', to: '/portfolio' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Testimonials', to: '/testimonials' },
  { name: 'Contact', to: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5'
            : 'absolute bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={handleNavClick}>
              <span className={`font-serif text-2xl font-semibold tracking-wider transition-colors duration-300 ${isScrolled || isHomePage ? 'text-white' : 'text-black'}`}>
                ROSE
              </span>
              <span className="heading-script text-3xl text-accent">Events</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={handleNavClick}
                  className={`relative py-2 font-sans text-[15px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 group ${
                    location.pathname === link.to
                      ? 'text-accent'
                      : isScrolled || isHomePage
                        ? 'text-white hover:text-accent'
                        : 'text-black hover:text-accent'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${isScrolled || isHomePage ? 'text-white' : 'text-black'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={handleNavClick}
              className="font-serif text-4xl text-white tracking-wide transition-colors hover:text-accent font-light"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="mt-8 px-8 py-4 bg-accent text-white font-sans font-bold tracking-[1.5px] uppercase text-sm rounded-[10px] transition-all duration-300 hover:bg-accent-dark"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
