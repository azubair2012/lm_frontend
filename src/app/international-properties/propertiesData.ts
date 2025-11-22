type PropertyCTA = { label: string; href: string };

export type PropertyData = {
  title: string;
  blurb: string;
  cardDescription: string;
  image: string;
  images: string[];
  modalDescription: string[];
  ctas: PropertyCTA[];
};

export const PROPERTIES: PropertyData[] = [
  {
    title: 'Binghatti Elite',
    blurb: '',
    cardDescription:
      'An icon in the skyline, where bold architecture meets an artistic vision. Steel and glass merge with unparalleled finesse, creating an indelible mark of luxury.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/elit.jpg',
    images: ['https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/Livingroom_Shot_1.jpg', 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/Lobby_Shot-1.jpg'],
    modalDescription: [
      'In the heart of Dubai\'s vibrant real estate landscape, Binghatti stands as a testament to architectural ingenuity and unwavering commitment to excellence. As a distinguished Emirati property brand, Binghatti has carved a niche for itself by creating iconic landmarks that redefine the skyline.',
      'The brand\'s diverse portfolio caters to a wide spectrum of discerning clientele, offering projects that range from accessible elegance to ultra-high-end luxury. Binghatti\'s signature design DNA, meticulously woven into each development, sets it apart on the global stage.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Skyblade',
    blurb: '',
    cardDescription:
      'Skyblade stands at the heart of Downtown Dubai. Minutes from the Burj Khalifa and Dubai Mall, offering seamless access to the city\'s main attractions.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-skyblade-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Skyblade is the city within the city. Located directly on the Boulevard, it is minutes from the iconic Burj Khalifa and Dubai Mall. It offers strategic access to Dubai\'s main tourist and business areas.',
      'This unmistakable location caters to those who appreciate the unparalleled, offering world-class landmarks, entertainment and glamour.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Flare',
    blurb: '',
    cardDescription:
      'Flare\'s design is a symphony of lines and light, a carefully orchestrated composition that evokes wonder and intrigue.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-flare-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Flare\'s design is a symphony of lines and light, a carefully orchestrated composition that evokes a sense of wonder and intrigue. It\'s an architecture that transcends mere functionality, capturing the very essence of human emotion.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Mercedes-Benz Places',
    blurb: '',
    cardDescription:
      'A joint vision between Binghatti and Mercedes-Benz, setting a new benchmark for intelligent, luxurious living.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/benz.jpg',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'This visionary project represents the zenith of Binghatti and Mercedes-Benz\'s shared passion for iconic design and innovation, setting a new benchmark for luxurious and intelligent living.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Twilight',
    blurb: '',
    cardDescription:
      'Twilight is an exclusive collection of residences and office spaces, where every element is carefully considered to inspire.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/twilight-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Twilight is an exclusive collection of 228 residential units, comprising 104 one-bedroom, 118 two-bedroom, and 6 three-bedroom residences. Alongside, 47 meticulously designed office spaces and two ground-floor retail shops complete this distinctive offering.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
  {
    title: 'Binghatti Hills',
    blurb: '',
    cardDescription:
      'Inspired by the undulating slopes of nature, Hills captures dynamic movement and organic grandeur in a single expression.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-hills.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Drawing inspiration from the undulating slopes of the terrain, Binghatti Hills captures the essence of dynamic movement and organic grandeur. The rhythmic waves form a captivating illustration of two limbs intertwined representing the seamless integration of modernity and tranquility.',
    ],
    ctas: [
      { label: 'Project Map', href: '#' },
      { label: 'Brochure', href: '#' },
    ],
  },
];

