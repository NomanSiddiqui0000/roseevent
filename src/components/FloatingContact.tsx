import { useState } from 'react';
import { MessageCircle, Phone, Mail, Instagram, X } from 'lucide-react';

const contacts = [
  {
    icon: Phone,
    label: 'Call Us',
    href: 'tel:+1234567890',
    color: '#9B2C4F',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/1234567890',
    color: '#25D366',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:hello@roseevents.com',
    color: '#9B2C4F',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com',
    color: '#E1306C',
  },
];

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating Buttons */}
      {contacts.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg transition-all duration-400 ease-out ${
            isOpen ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-75 pointer-events-none'
          }`}
          style={{
            background: item.color,
            transitionDelay: `${index * 60}ms`,
          }}
        >
          <item.icon size={18} className="text-white" />
          <span className="text-white font-sans font-semibold text-xs tracking-wide whitespace-nowrap">
            {item.label}
          </span>
        </a>
      ))}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-400 ${
          isOpen ? 'bg-black/80 rotate-45' : 'bg-accent'
        }`}
        aria-label="Toggle contact menu"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>
    </div>
  );
}