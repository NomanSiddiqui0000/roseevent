import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Luxury Weddings', to: '/services' },
    { name: 'Corporate Events', to: '/services' },
    { name: 'Private Parties', to: '/services' },
    { name: 'Birthday Celebrations', to: '/services' },
  ],
  company: [
    { name: 'About Us', to: '/about' },
    { name: 'Our Process', to: '/about' },
    { name: 'Portfolio', to: '/portfolio' },
    { name: 'Testimonials', to: '/testimonials' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer id="contact" className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 tracking-[-0.5px]">
              Stay Inspired
            </h3>
            <p className="font-sans text-white/60 mb-8 leading-[1.9]">
              Subscribe for exclusive event inspiration, trends, and behind-the-scenes glimpses.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-accent text-white font-sans font-bold tracking-[1.5px] uppercase text-sm rounded-[10px] transition-all duration-300 hover:bg-accent-dark"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <div className="text-accent text-sm mt-4 animate-fade-in text-center">
                Thank you for subscribing! We will send you exclusive inspiration soon.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="font-serif text-2xl font-semibold tracking-wider">
                LUXE
              </span>
              <span className="heading-script text-3xl text-accent">Events</span>
            </Link>
            <p className="font-sans text-white/60 mb-6 leading-[1.9]">
              Creating timeless celebrations and unforgettable experiences with elegance and sophistication.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 transition-all duration-300 hover:border-accent hover:text-accent"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-white/60 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-white/60 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <p className="text-white/60">
                  123 Luxury Boulevard, Suite 500<br />
                  New York, NY 10001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent" />
                <a
                  href="tel:+1234567890"
                  className="text-white/60 transition-colors hover:text-accent"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent" />
                <a
                  href="mailto:hello@luxeevents.com"
                  className="text-white/60 transition-colors hover:text-accent"
                >
                  hello@luxeevents.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Luxe Events. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <button
                  key={index}
                  className="text-white/40 text-sm transition-colors hover:text-accent"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
