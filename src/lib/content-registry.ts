export type EditableContentType = 'text' | 'textarea' | 'richtext' | 'json';

export interface EditableContentDefinition {
  key: string;
  label: string;
  group: string;
  type: EditableContentType;
  defaultValue: string;
}

import { PropertyData } from '@/app/international-properties/types';

export const DEFAULT_INTERNATIONAL_PROPERTIES: PropertyData[] = [
  {
    title: 'Binghatti Elite',
    blurb: '',
    cardDescription: 'An icon in the skyline, where bold architecture meets an artistic vision. Steel and glass merge with unparalleled finesse, creating an indelible mark of luxury.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/elit.jpg',
    images: [
      'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/Livingroom_Shot_1.jpg',
      'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/Lobby_Shot-1.jpg',
    ],
    modalDescription: [
      "In the heart of Dubai's vibrant real estate landscape, Binghatti stands as a testament to architectural ingenuity and unwavering commitment to excellence. As a distinguished Emirati property brand, Binghatti has carved a niche for itself by creating iconic landmarks that redefine the skyline.",
      "The brand's diverse portfolio caters to a wide spectrum of discerning clientele, offering projects that range from accessible elegance to ultra-high-end luxury. Binghatti's signature design DNA, meticulously woven into each development, sets it apart on the global stage.",
    ],
    ctas: [{ label: 'Project Map', href: '#' }, { label: 'Brochure', href: '#' }],
  },
  {
    title: 'Binghatti Skyblade',
    blurb: '',
    cardDescription: 'Skyblade stands at the heart of Downtown Dubai. Minutes from the Burj Khalifa and Dubai Mall, offering seamless access to the city\'s main attractions.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-skyblade-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Skyblade is the city within the city. Located directly on the Boulevard, it is minutes from the iconic Burj Khalifa and Dubai Mall. It offers strategic access to Dubai\'s main tourist and business areas.',
      'This unmistakable location caters to those who appreciate the unparalleled, offering world-class landmarks, entertainment and glamour.',
    ],
    ctas: [{ label: 'Project Map', href: '#' }, { label: 'Brochure', href: '#' }],
  },
  {
    title: 'Binghatti Flare',
    blurb: '',
    cardDescription: "Flare's design is a symphony of lines and light, a carefully orchestrated composition that evokes wonder and intrigue.",
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-flare-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      "Flare's design is a symphony of lines and light, a carefully orchestrated composition that evokes a sense of wonder and intrigue. It's an architecture that transcends mere functionality, capturing the very essence of human emotion.",
    ],
    ctas: [{ label: 'Project Map', href: '#' }, { label: 'Brochure', href: '#' }],
  },
  {
    title: 'Mercedes-Benz Places',
    blurb: '',
    cardDescription: 'A joint vision between Binghatti and Mercedes-Benz, setting a new benchmark for intelligent, luxurious living.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/benz.jpg',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      "This visionary project represents the zenith of Binghatti and Mercedes-Benz's shared passion for iconic design and innovation, setting a new benchmark for luxurious and intelligent living.",
    ],
    ctas: [{ label: 'Project Map', href: '#' }, { label: 'Brochure', href: '#' }],
  },
  {
    title: 'Binghatti Twilight',
    blurb: '',
    cardDescription: 'Twilight is an exclusive collection of residences and office spaces, where every element is carefully considered to inspire.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/twilight-hero-banner.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Twilight is an exclusive collection of 228 residential units, comprising 104 one-bedroom, 118 two-bedroom, and 6 three-bedroom residences. Alongside, 47 meticulously designed office spaces and two ground-floor retail shops complete this distinctive offering.',
    ],
    ctas: [{ label: 'Project Map', href: '#' }, { label: 'Brochure', href: '#' }],
  },
  {
    title: 'Binghatti Hills',
    blurb: '',
    cardDescription: 'Inspired by the undulating slopes of nature, Hills captures dynamic movement and organic grandeur in a single expression.',
    image: 'https://oncklxh09kyqnp5l.public.blob.vercel-storage.com/international%20properties/binghatti-hills.webp',
    images: ['/placeholder-property.jpg', '/placeholder-property.jpg'],
    modalDescription: [
      'Drawing inspiration from the undulating slopes of the terrain, Binghatti Hills captures the essence of dynamic movement and organic grandeur. The rhythmic waves form a captivating illustration of two limbs intertwined representing the seamless integration of modernity and tranquility.',
    ],
    ctas: [{ label: 'Project Map', href: '#' }, { label: 'Brochure', href: '#' }],
  },
];

export const CONTENT_REGISTRY: Record<string, EditableContentDefinition> = {
  conciergeDescription: {
    key: 'home.concierge.description',
    label: 'Home Concierge Description',
    group: 'home',
    type: 'textarea',
    defaultValue:
      "London Move's concierge service transforms properties to maximize their market value. Our team of experts handles everything from minor repairs to complete renovations, staging, and bespoke marketing strategies, ensuring your home launches with impact.",
  },
  homeAboutDescription: {
    key: 'home.about.description',
    label: 'Home About Description',
    group: 'home',
    type: 'textarea',
    defaultValue:
      "At London Move, we appreciate that sales, lettings and property management are specialist disciplines in their own right. That's why we've established fully independent departments run by dedicated experts. Each team is empowered to deliver tailored strategies, transparent communication and impressive results.\n\nWhether you're planning to sell, letting for the first time or scaling a portfolio, we align our advice to your goals. Expect clear timelines, thoughtful presentation and meticulous care at every stage of the journey.",
  },
  servicesPageBody: {
    key: 'services.page.body',
    label: 'Services Page Body',
    group: 'services',
    type: 'richtext',
    defaultValue:
      "<section><h2>Building & Maintenance</h2><p>We work with a carefully selected panel of qualified, industry-approved tradespeople, offering a wide range of skilled services. Whether you need a GAS SAFE registered engineer or a NICEIC certified electrician, every contractor we recommend is fully vetted, holds public liability insurance, and complies with HHSRS standards.</p><p>From complete refurbishments and property makeovers to routine maintenance and small handyman tasks, no job is too big or too small. Our trusted contractors approach every project with professionalism and efficiency, ensuring high-quality workmanship every time.</p></section><section><h2>Tenant Permitted Payments</h2><h3>Tenant Payments Summary:</h3><ul><li>One month's rent in advance (unless otherwise agreed).</li><li>Five weeks' rent as a tenancy deposit (\"the Deposit\").</li><li>One week's holding deposit paid to London Move does not guarantee the tenancy.</li></ul><h3>Holding Deposit Conditions:</h3><p>London Move may keep the holding deposit if:</p><ul><li>False or misleading information is provided.</li><li>The applicant fails the right to rent check.</li><li>The applicant withdraws from the tenancy.</li><li>The applicant does not respond within 24 hours when requested for information.</li></ul><p>If retained, London Move will notify applicants within 7 days with reasons. Applicants must complete referencing within 24 hours of notification. After satisfactory references, the Tenancy Agreement will be issued within 48 hours. All tenants must sign the agreement together at the London Move office before the tenancy starts.</p><p>The holding deposit is not protected under the Housing Act 2008 deposit schemes.</p></section><section><h2>Our Fees</h2><h3>Landlord Fees:</h3><ul><li>Letting Only - 10% + VAT</li><li>Letting & Rent collection - 12% + VAT</li><li>Lettings, Rent collection & Management Service - 15% + VAT</li><li>Rent Collection & Property Management - 6% +VAT</li></ul></section>",
  },
  aboutPageBody: {
    key: 'about.page.body',
    label: 'About Page Body',
    group: 'about',
    type: 'richtext',
    defaultValue:
      '<p>It is widely accepted amongst those involved in the residential property industry that the sale, letting and management of property are all independent fields of expertise. All too commonly vendors, landlords and tenants find themselves pigeon-holed within a rigid procedure which ultimately stifles both the spirit, ethos and results achieved by their real estate advisors.</p><p>Dynamic and innovative, London Move provides a spectrum of solutions across the property sector. Our team is apt in multi-disciplinary activities that represent clients both in London and across the United Kingdom. We pride ourselves on building long-standing relationships based on trust, transparency and tangible performance, delivering a bespoke service tailored to every client\'s goals.</p><p>All staff and associates undergo ongoing training and development to ensure consistent quality and care. London Move is hosted by a team of property specialists each with accountability of their sales or lettings portfolios, ensuring dedicated focus and expertise at every step of your property journey.</p>',
  },
  internationalProperties: {
    key: 'international.properties',
    label: 'International Properties',
    group: 'international',
    type: 'json',
    defaultValue: JSON.stringify(DEFAULT_INTERNATIONAL_PROPERTIES, null, 2),
  },
};

export const CONTENT_REGISTRY_BY_KEY = Object.values(CONTENT_REGISTRY).reduce(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<string, EditableContentDefinition>
);
