// Shared services data — used by both homepage preview cards and the detailed Services page.

export type ServiceFeature = {
  icon: string;
  label: string;
  description: string;
};

export type ServiceHighlight = {
  label: string;
  value: string;
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceGallery = {
  main: string;
  thumbs: string[];
};

export type Service = {
  id: string;
  number: string;
  title: string;
  scriptAccent: string;
  shortDescription: string;
  paragraphs: string[];
  image: string;
  gallery: ServiceGallery;
  features: ServiceFeature[];
  highlights: ServiceHighlight[];
  faqs: ServiceFAQ[];
  ctaHeadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

// Custom illustrations placeholder — we use Pexels for premium imagery.
export const services: Service[] = [
  {
    id: 'luxury-weddings',
    number: '01',
    title: 'Luxury Weddings',
    scriptAccent: 'Forever',
    shortDescription:
      'From intimate ceremonies to grand celebrations, we craft weddings that reflect your unique love story with timeless elegance.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'A wedding is the most cherished milestone of a lifetime, and we believe it deserves to be nothing short of extraordinary. At Rose Events, we orchestrate luxury weddings that blend romance, heritage, and refined artistry into a single unforgettable day. From the first consultation to the final toast, every detail is planned with intention and styled with sophistication.',
      'Our planning process begins with listening. We take time to understand your love story, your family traditions, and the atmosphere you envision. We then translate that vision into a cohesive design language — from color palettes and floral arches to stationery, lighting, and tablescapes — ensuring every element speaks to who you are as a couple.',
      'We collaborate with the finest venues, photographers, florists, and couture designers to bring your dreams to life. Whether you imagine a candlelit cathedral ceremony, a sun-drenched garden union, or a black-tie ballroom reception, our team has the experience and network to make it seamlessly possible.',
      'Personalization is at the heart of our philosophy. No two weddings we plan are ever alike. We weave your culture, faith, language, and personal taste into every touchpoint — making the celebration feel unmistakably yours. Our clients return to us because they trust that their most precious day will be handled with discretion, warmth, and uncompromising quality.',
    ],
    gallery: {
      main:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      thumbs: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      ],
    },
    features: [
      { icon: 'MapPin', label: 'Premium Venue Selection', description: 'Curated access to the most sought-after venues worldwide.' },
      { icon: 'Flower', label: 'Floral Design', description: 'Bespoke floral installations tailored to your palette.' },
      { icon: 'Sparkles', label: 'Luxury Decorations', description: 'Hand-crafted decor elements that elevate every frame.' },
      { icon: 'Lightbulb', label: 'Lighting Design', description: 'Architectural lighting that sets the perfect mood.' },
      { icon: 'Camera', label: 'Photography Coordination', description: 'Coordination with acclaimed photographers and film crews.' },
      { icon: 'Utensils', label: 'Catering Coordination', description: 'Couture menus crafted with Michelin-trained chefs.' },
    ],
    highlights: [
      { label: 'Duration', value: '6–14 Months' },
      { label: 'Guests', value: '50–1000+' },
      { label: 'Venue Options', value: 'Gardens • Ballrooms • Destinations' },
      { label: 'Decoration Styles', value: 'Classic • Couture • Avant-Garde' },
      { label: 'Budget Range', value: 'Premium to Bespoke' },
      { label: 'Customization', value: 'Fully Personalized' },
    ],
    faqs: [
      {
        question: 'How early should we book our luxury wedding?',
        answer:
          'We recommend booking 8–14 months in advance to secure your preferred venue, vendors, and design team. Peak season dates fill quickly, so an early consultation gives us the runway to curate every detail.',
      },
      {
        question: 'Do you arrange destination weddings?',
        answer:
          'Absolutely. We have coordinated luxury destination weddings across Europe, the Middle East, the Caribbean, and Asia — managing every logistical detail from travel and lodging to permits and on-site coordination.',
      },
      {
        question: 'Can the decoration match our specific color palette and culture?',
        answer:
          'Yes. Every wedding is entirely bespoke. We design florals, Stationery, and decor around your cultural traditions, faith, and personal palette — no two celebrations are ever identical.',
      },
    ],
    ctaHeadline: 'Ready to Create Your Dream Wedding?',
    ctaPrimary: 'Book Your Consultation',
    ctaSecondary: 'View Portfolio',
  },
  {
    id: 'mehndi-barat',
    number: '02',
    title: 'Mehndi & Barat',
    scriptAccent: 'Heritage',
    shortDescription:
      'Traditional celebrations infused with modern elegance, honoring your heritage with style and soul.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'Mehndi and Barat celebrations hold a sacred place in the heart of South Asian weddings — they are days of color, music, family, and ritual that span generations. At Rose Events, we honor these traditions while elevating them with contemporary luxury, creating moments that are both culturally authentic and visually breathtaking.',
      'Our team is fluent in the nuanced customs of Mehndi and Barat — from the rhythm of the dholak and the placement of the mandap, to the choreography of the baraat procession and the precise timing of the rukhsati. We coordinate with families, decorators, and clergy to ensure every ceremony unfolds with the dignity it deserves.',
      'For the Mehndi, we design vibrant, festive environments — colorful drapes, hanging florals, henna lounges, and live music stages that invite joyful celebration. For the Barat, we orchestrate grand entrances, ornate mandaps, regal seating, and the seamless flow of rituals — all under the gaze of curated lighting and couture decor.',
      'We understand that these celebrations are deeply personal and often span multiple days. Our multi-day planning service ensures continuity across every event — a cohesive design thread that ties your Mehndi, Barat, and Walima together while letting each shine with its own personality.',
    ],
    gallery: {
      main:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      thumbs: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      ],
    },
    features: [
      { icon: 'Sparkles', label: 'Traditional Mandap Design', description: 'Hand-carved mandaps styled in classic and modern motifs.' },
      { icon: 'Flower', label: 'Festive Floral Installations', description: 'Marigold, rose, and jasmine creations in vivid palettes.' },
      { icon: 'Music', label: 'Live Music Coordination', description: 'Dholak, Qawwali, and DJ ensembles for every mood.' },
      { icon: 'Utensils', label: 'Regional Cuisine Curation', description: 'Traditional feasts featuring regional specialties and sweets.' },
      { icon: 'Users', label: 'Family Ritual Coordination', description: 'Respectful management of every cultural ceremony.' },
      { icon: 'Camera', label: 'Cinematic Coverage', description: 'Coordination with South Asian wedding film specialists.' },
    ],
    highlights: [
      { label: 'Duration', value: '2–4 Days of Celebration' },
      { label: 'Guests', value: '100–2000+' },
      { label: 'Venue Options', value: 'Banquet Halls • Marquees • Heritage Venues' },
      { label: 'Decoration Styles', value: 'Traditional • Royal • Contemporary' },
      { label: 'Budget Range', value: 'Premium to Couture' },
      { label: 'Customization', value: 'Culturally Personalized' },
    ],
    faqs: [
      {
        question: 'Can you coordinate multi-day Mehndi, Barat, and Walima celebrations?',
        answer:
          'Yes. Our multi-day planning service is designed exactly for this — we create a cohesive design language across all events while letting each day carry its own personality, from henna lounges to regal mandaps.',
      },
      {
        question: 'Do you work with religious clergy and ritual requirements?',
        answer:
          'Absolutely. We coordinate respectfully with molvis, pandits, imams, and family elders to ensure every religious and cultural ritual is performed with the dignity and precision it deserves.',
      },
      {
        question: 'Can the decor blend traditional and contemporary styles?',
        answer:
          'Yes — our specialty is balancing the richness of South Asian tradition with the elegance of modern minimalism. From royal-color florals to sleek contemporary mandaps, we tailor every element to your taste.',
      },
    ],
    ctaHeadline: "Let's Honor Your Heritage in Style",
    ctaPrimary: 'Plan Your Celebration',
    ctaSecondary: 'View Portfolio',
  },
  {
    id: 'reception-events',
    number: '03',
    title: 'Reception Events',
    scriptAccent: 'Grandeur',
    shortDescription:
      'Grand receptions that captivate your guests with extraordinary ambience and luxury decor.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'A reception is the moment your celebration truly comes alive — when family and friends gather to toast, dance, and create memories that linger for a lifetime. At Rose Events, we design receptions that feel cinematic in their beauty and effortless in their execution.',
      'We approach each reception as a blank canvas. Our design team builds immersive environments — from candlelit dinner spaces and crystal installations to live performance stages and interactive food stations. Every element is choreographed to guide your guests through an evening of surprise, delight, and connection.',
      'Logistics, when done invisibly, are what make a reception feel effortless. We coordinate vendor timelines, sound checks, lighting cues, catering service, guest seating, and entertainment down to the minute — so the only thing you need to think about is enjoying your evening.',
      'Whether you envision a regal ballroom dinner for 800 or an intimate rooftop reception for 80, our team brings the same meticulous care. We tailor scale, mood, and pace to your vision, ensuring your reception feels as grand or as intimate as you desire.',
    ],
    gallery: {
      main:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      thumbs: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      ],
    },
    features: [
      { icon: 'Lightbulb', label: 'Architectural Lighting', description: 'Dramatic lighting design that layers mood and movement.' },
      { icon: 'Music', label: 'Live Entertainment', description: 'Bands, DJs, and performers curated for your atmosphere.' },
      { icon: 'Sparkles', label: 'Stage & Dance floor Design', description: 'Custom-built stages and floors as focal points.' },
      { icon: 'Utensils', label: 'Couture Catering', description: 'Plated tasting menus and interactive food experiences.' },
      { icon: 'Camera', label: 'Stage Photography', description: 'Photo and film coverage that captures every moment.' },
      { icon: 'Users', label: 'Guest Experience', description: 'Concierge-level care for every attendee.' },
    ],
    highlights: [
      { label: 'Duration', value: '4–8 Hour Evenings' },
      { label: 'Guests', value: '80–1500' },
      { label: 'Venue Options', value: 'Ballrooms • Rooftops • Tented Spaces' },
      { label: 'Decoration Styles', value: 'Glamorous • Minimalist • Theatrical' },
      { label: 'Budget Range', value: 'Premium to Grand' },
      { label: 'Customization', value: 'Highly Personalized' },
    ],
    faqs: [
      {
        question: 'Can you coordinate both ceremony and reception on the same day?',
        answer:
          'Yes. We specialize in day-long orchestration — seamlessly transitioning your guests from a daytime ceremony to an evening reception with carefully choreographed set-up timing and design continuity.',
      },
      {
        question: 'Do you provide AV, lighting, and live entertainment?',
        answer:
          'We coordinate every technical and creative element — from architectural lighting design and sound engineering to live bands, DJs, dancers, and surprise performance pieces — all under one cohesive plan.',
      },
      {
        question: 'Can we have interactive food and bar stations?',
        answer:
          'Absolutely. We collaborate with renowned chefs to design live cooking stations, sushi bars, mixology counters, and dessert galleries that delight your guests and elevate your reception.',
      },
    ],
    ctaHeadline: "Let's Plan Your Perfect Reception",
    ctaPrimary: 'Book Your Consultation',
    ctaSecondary: 'View Portfolio',
  },
  {
    id: 'birthday-celebrations',
    number: '04',
    title: 'Birthday Celebrations',
    scriptAccent: 'Wonder',
    shortDescription:
      'Milestone birthdays transformed into extraordinary celebrations filled with joy and wonder.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'A milestone birthday is more than a party — it is a celebration of a life lived, the chapters written, and the people who helped shape them. At Rose Events, we design birthday celebrations that honor the guest of honor with elegance, joy, and unforgettable surprise.',
      'From sweet sixteens and thirtieth soirées to fiftieth jubilees and eightieth family reunions, we tailor every element to the person being celebrated. We discover their passions, travels, music, and memories — then weave those threads into the design of the evening.',
      'Our parties balance the festive with the refined. We create spaces where guests dance, dine, and mingle — but also where they pause, reflect, and feel moved. Live music, custom desserts, curated playlists, surprise performances, and personal video tributes are all part of our toolkit.',
      'For children and teens, we craft immersive themed experiences — from enchanted forest settings and circus-inspired carnivals to music festival recreations and black-tie junior galas. For adults, we lean into sophistication: cocktail receptions, plated dinners, and after-parties that last into the early hours.',
    ],
    gallery: {
      main:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      thumbs: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      ],
    },
    features: [
      { icon: 'Palette', label: 'Custom Theme Design', description: 'Immersive themes tailored to the guest of honor.' },
      { icon: 'Cake', label: 'Custom Cake & Dessert Art', description: 'Hand-sculpted cakes and dessert galleries.' },
      { icon: 'Music', label: 'DJ & Live Performances', description: 'Hit-makers and entertainers to set the mood.' },
      { icon: 'Camera', label: 'Photo & Video Tributes', description: 'Personal memory films and surprise video messages.' },
      { icon: 'Sparkles', label: 'Themed Installations', description: 'Photo-worthy moments and immersive stage decor.' },
      { icon: 'Gift', label: 'Personalized Favors', description: 'Bespoke keepsakes guests will treasure.' },
    ],
    highlights: [
      { label: 'Duration', value: '4–8 Hours' },
      { label: 'Guests', value: '20–500' },
      { label: 'Venue Options', value: 'Private Homes • Halls • Outdoor Spaces' },
      { label: 'Decoration Styles', value: 'Whimsical • Glamorous • Themed' },
      { label: 'Budget Range', value: 'Accessible to Premium' },
      { label: 'Customization', value: 'Fully Personalized' },
    ],
    faqs: [
      {
        question: 'Can you plan themed children and teen birthday parties?',
        answer:
          'Absolutely. We design immersive, age-appropriate themes — from enchanted forest settings to circus-inspired carnivals and black-tie junior galas — that delight younger guests while keeping parents relaxed.',
      },
      {
        question: 'Do you handle milestone adult birthdays like 50th or 80th?',
        answer:
          'Yes. Our milestone adult celebrations lean into sophistication: cocktail receptions, plated dinners, tribute videos, and after-parties that celebrate a life well-lived with elegance.',
      },
      {
        question: 'Can we include surprise performances or video tributes?',
        answer:
          'Yes — surprise musical guests, dance performances, and personal video tributes from friends and family are some of our favorite touches. We coordinate all the logistics to keep everything truly secret.',
      },
    ],
    ctaHeadline: "Let's Create a Birthday to Remember",
    ctaPrimary: 'Plan Your Celebration',
    ctaSecondary: 'View Portfolio',
  },
  {
    id: 'corporate-events',
    number: '05',
    title: 'Corporate Events',
    scriptAccent: 'Sophistication',
    shortDescription:
      'Professional events that leave lasting impressions with sophisticated design and seamless execution.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'Corporate events are moments where brands meet their communities — employees, clients, partners, and press. At Rose Events, we design corporate experiences that embody your brand values while creating memories that linger long after the event closes.',
      'From annual galas, award ceremonies, and luxury product launches to conferences, brand activations, and leadership retreats, we offer end-to-end planning with discretion and precision. We align aesthetics, messaging, and logistics — so your event not only looks exceptional, but also delivers on your strategic goals.',
      'Our production team brings strong technical fluency. We handle stage design, AV engineering, lighting plots, livestreaming, simultaneous interpretation, registration, seating, signage, and attendee tracking — ensuring no detail is missed and every minute runs to plan.',
      'We collaborate closely with your marketing, HR, and leadership teams to ensure the event speaks your language. From keynote speaker care and VIP hospitality to branded environments and after-parties, every touchpoint is intentionally crafted to reflect your brand at its finest.',
    ],
    gallery: {
      main:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      thumbs: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      ],
    },
    features: [
      { icon: 'Lightbulb', label: 'Stage & AV Production', description: 'Engineering-grade stage, sound, and lighting design.' },
      { icon: 'Mic', label: 'Keynote & Speaker Care', description: 'VIP hospitality for high-profile speakers.' },
      { icon: 'Camera', label: 'Brand & Signage Design', description: 'Cohesive branded environments and wayfinding.' },
      { icon: 'Users', label: 'Registration & Ticketing', description: 'Streamlined attendee management platforms.' },
      { icon: 'Video', label: 'Livestream & Hybrid', description: 'Multi-camera livestream and remote audience tools.' },
      { icon: 'Utensils', label: 'Catering & Hospitality', description: 'Refined menus and attentive service.' },
    ],
    highlights: [
      { label: 'Duration', value: 'Half-Day to Multi-Day' },
      { label: 'Guests', value: '50–5,000' },
      { label: 'Venue Options', value: 'Convention Centers • Hotels • Offices' },
      { label: 'Decoration Styles', value: 'Branded • Minimalist • Bold' },
      { label: 'Budget Range', value: 'Mid to Enterprise' },
      { label: 'Customization', value: 'Brand-Aligned' },
    ],
    faqs: [
      {
        question: 'Can you handle large-scale conferences and award galas?',
        answer:
          'Yes. We plan everything from intimate boardroom dinners to 5,000-guest conferences — handling AV, registration, seating, signage, hospitality, and after-parties with engineering-grade precision.',
      },
      {
        question: 'Do you offer livestreaming and hybrid event capabilities?',
        answer:
          'Absolutely. We coordinate multi-camera livestream productions, remote audience tools, simultaneous interpretation, and digital engagement platforms to bridge in-person and virtual attendees.',
      },
      {
        question: 'Can the event reflect our corporate brand identity?',
        answer:
          'Yes. We collaborate with your marketing and brand teams to weave logos, color languages, slogans, and brand values into the stage design, signage, decor, and guest experience.',
      },
    ],
    ctaHeadline: 'Elevate Your Next Corporate Experience',
    ctaPrimary: 'Request a Proposal',
    ctaSecondary: 'View Portfolio',
  },
  {
    id: 'engagement-ceremonies',
    number: '06',
    title: 'Engagement Ceremonies',
    scriptAccent: 'Romance',
    shortDescription:
      'Romantic celebrations designed around your love story — intimate, intentional, and unforgettable.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'An engagement ceremony is the prologue to your wedding story — the moment you and your partner make your promise known to family and friends. At Rose Events, we craft intimate, intentional celebrations that honor the romance at the center of it all.',
      'We design engagement ceremonies that feel personal above all else. Whether you envision a surprise rooftop proposal, an intimate family blessing, or a grand engagement party with all your favorite people, we orchestrate every detail — from the moment the question is asked to the final dance of the evening.',
      'Our approach is romantic and editorial — soft florals, candlelit ambience, custom signage, and beautifully styled food and bars. We layer personal touches — your first song, your shared travels, photos from your relationship — into the decor so the celebration feels unmistakably yours.',
      'For couples planning destination engagements or surprise proposals, we handle travel logistics, confidential itineraries, secret vendor coordination, and discreet timing — so the only surprise is the one your partner experiences.',
    ],
    gallery: {
      main:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      thumbs: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      ],
    },
    features: [
      { icon: 'Heart', label: 'Proposal & Surprise Planning', description: 'Discreetly orchestrated surprise moments.' },
      { icon: 'Flower', label: 'Romantic Floral Design', description: 'Soft, editorial florals in your chosen palette.' },
      { icon: 'Camera', label: 'Photography & Film', description: 'Coordination with proposal and engagement specialists.' },
      { icon: 'Utensils', label: 'Intimate Catering', description: 'Curated tasting menus and signature cocktails.' },
      { icon: 'Music', label: 'Live Music & Soundtrack', description: 'Acoustic sets, harpists, and personal playlists.' },
      { icon: 'MapPin', label: 'Destination Proposals', description: 'Travel logistics for romantic getaways and hides.' },
    ],
    highlights: [
      { label: 'Duration', value: 'A few hours to a full day' },
      { label: 'Guests', value: '2 to 200' },
      { label: 'Venue Options', value: 'Rooftops • Gardens • Private Villas' },
      { label: 'Decoration Styles', value: 'Romantic • Editorial • Minimalist' },
      { label: 'Budget Range', value: 'Accessible to Premium' },
      { label: 'Customization', value: 'Story-Driven' },
    ],
    faqs: [
      {
        question: 'Can you plan a secret proposal and keep it completely confidential?',
        answer:
          'Absolutely. We specialize in discreet proposal planning — coordinating secret vendor meetings, confidential travel itineraries, decoy invitations, and unknown timing so the only surprise is the one your partner experiences.',
      },
      {
        question: 'Do you handle destination engagements?',
        answer:
          'Yes. We curate romantic destinations worldwide — from Italian seaside towns to cliffside Caribbean resorts — and manage every travel, lodging, and vendor detail so the moment is effortless for you.',
      },
      {
        question: 'Can the engagement decor reflect our love story?',
        answer:
          'Yes. We weave in personal touches — photos from your relationship, your first song, places you have traveled together — so the decor tells the story of the two of you, not just a generic theme.',
      },
    ],
    ctaHeadline: 'Make Your Promise Unforgettable',
    ctaPrimary: 'Plan Your Engagement',
    ctaSecondary: 'View Portfolio',
  },
  {
    id: 'private-parties',
    number: '07',
    title: 'Private Parties',
    scriptAccent: 'Intimacy',
    shortDescription:
      'Exclusive gatherings tailored to your vision, creating intimate moments of pure luxury.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    paragraphs: [
      'Some of the most memorable celebrations are the most private — anniversaries at a beloved vacation home, intimate dinners with close friends, family reunions in a meaningful setting, or holiday gatherings that bring together the people who matter most. At Rose Events, we design private parties that feel as personal as a handwritten letter.',
      'We approach private events with discretion as our foundation. Whether you are hosting heads of state, public figures, or simply your nearest and dearest, we ensure every guest feels cared for and every detail remains confidential.',
      'Our styling for private parties ranges from understated elegance — candle and floral tablescapes, refined menus, soft background music — to immersive themed evenings with custom installations, performance art, and curated entertainment.',
      'We handle every logistical element — staffing, rentals, catering, valets, security, parking, and noise management — so you can be fully present with your guests from the moment they arrive.',
    ],
    gallery: {
      main:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      thumbs: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      ],
    },
    features: [
      { icon: 'Users', label: 'Discreet Hospitality', description: 'Confidential planning for high-profile guests.' },
      { icon: 'Utensils', label: 'Private Chef Coordination', description: 'Custom menus prepared tableside.' },
      { icon: 'Music', label: 'Ambient & Live Music', description: 'Acoustic sets, harpists, jazz trios.' },
      { icon: 'Sparkles', label: 'Intimate Decor Styling', description: 'Editorial florals and tablescapes.' },
      { icon: 'Shield', label: 'Security & Privacy', description: 'Valet, security, and discretion management.' },
      { icon: 'Heart', label: 'Personal Touches', description: 'Family heirlooms, memory displays, and tributes.' },
    ],
    highlights: [
      { label: 'Duration', value: '4–8 Hours' },
      { label: 'Guests', value: '8 to 150' },
      { label: 'Venue Options', value: 'Private Homes • Villas • Yachts' },
      { label: 'Decoration Styles', value: 'Understated • Editorial • Themed' },
      { label: 'Budget Range', value: 'Accessible to Couture' },
      { label: 'Customization', value: 'Completely Personal' },
    ],
    faqs: [
      {
        question: 'Can you plan events at private homes and estates?',
        answer:
          'Yes. We frequently design celebrations at private homes, villas, and estates — managing rentals, power, staffing, valets, and noise management so your home becomes a flawless event venue for the evening.',
      },
      {
        question: 'Will our privacy be respected?',
        answer:
          'Absolutely. Discretion is the foundation of our private events practice. We work with NDAs, confidential vendors, and experienced staff who understand the needs of high-profile guests.',
      },
      {
        question: 'Can you arrange private chefs and customized menus?',
        answer:
          'Yes. We collaborate with private chefs and Michelin-trained culinary teams to design custom menus prepared tableside — accommodating every dietary preference and personal favorite.',
      },
    ],
    ctaHeadline: 'Create an Intimate Evening to Treasure',
    ctaPrimary: 'Plan Your Gathering',
    ctaSecondary: 'View Portfolio',
  },
];
