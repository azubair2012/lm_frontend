import Link from 'next/link';
import ImageSlideShow from '@/components/ImageSlideShow';

const managementServices = [
  {
    title: 'Tenant Management',
    items: [
      'End-to-end tenant onboarding with referencing support.',
      'Rent collection monitoring and arrears follow-up.',
      'Clear communication for renewals, notices, and move-outs.',
    ],
  },
  {
    title: 'Property Care',
    items: [
      'Routine inspections with actionable reports.',
      'Maintenance coordination through trusted contractors.',
      'Preventive upkeep planning to reduce long-term costs.',
    ],
  },
  {
    title: 'Compliance & Reporting',
    items: [
      'Support with key landlord safety and compliance requirements.',
      'Documentation tracking for certificates and deadlines.',
      'Regular performance updates so you can make informed decisions.',
    ],
  },
];

const managementSteps = [
  'Initial landlord consultation and property review.',
  'Tailored management plan based on your goals and property type.',
  'Active day-to-day management with transparent updates.',
  'Ongoing optimization to improve occupancy and returns.',
];

export default function PropertyManagementPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B87333]">London Move Service</p>
          <h1
            className="mt-3 text-[48px] uppercase leading-none text-[#111518] sm:text-[72px]"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
          >
            Property Management
          </h1>
          <p
            className="mt-4 text-base leading-7 text-[#2B2F32] sm:text-lg"
            style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
          >
            Professional, hands-on management for landlords who want reliable performance
            without the day-to-day stress of operations.
          </p>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {managementServices.map((service) => (
            <article key={service.title} className="rounded-lg border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold uppercase tracking-[0.08em] text-[#111518]">{service.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#383E42]">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2
            className="text-2xl uppercase text-[#111518]"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
          >
            Our Management Process
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-[#2B2F32] sm:text-base">
            {managementSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-lg border border-[#B87333]/30 bg-[#B87333]/5 p-6 text-center sm:text-left">
          <h2
            className="text-xl uppercase text-[#111518]"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
          >
            Ready to Simplify Your Portfolio?
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#383E42] sm:text-base">
            Speak with our team about a management package tailored to your property and goals.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Link
              href="/contact"
              className="inline-flex h-[48px] items-center justify-center rounded-none bg-[#383E42] px-6 text-sm font-semibold text-white transition-colors hover:text-[#B87333]"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              CONTACT OUR TEAM
            </Link>
            <Link
              href="/valuation"
              className="inline-flex h-[48px] items-center justify-center rounded-none border border-[#383E42] px-6 text-sm font-semibold text-[#383E42] transition-colors hover:border-[#B87333] hover:text-[#B87333]"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              GET A VALUATION
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

