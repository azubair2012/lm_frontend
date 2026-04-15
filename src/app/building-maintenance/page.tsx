import Link from 'next/link';
import ImageSlideShow from '@/components/ImageSlideShow';

const services = [
  {
    title: 'Repairs & Ongoing Maintenance',
    points: [
      'Plumbing, electrical, carpentry, and general repair call-outs.',
      'Preventive maintenance schedules to reduce emergency issues.',
      'Fast turnaround for urgent tenant and landlord requests.',
    ],
  },
  {
    title: 'Refurbishment & Upgrades',
    points: [
      'Kitchen and bathroom refurbishments for better rental/sale appeal.',
      'Painting, flooring, lighting, and fixture upgrades.',
      'Cost-conscious options aligned with your target return.',
    ],
  },
  {
    title: 'Compliance & Safety',
    points: [
      'Support with gas, electrical, fire-safety, and certification readiness.',
      'Property checks and issue tracking for peace of mind.',
      'Documentation coordination to keep your property market-ready.',
    ],
  },
];

const processSteps = [
  'Book a free initial assessment of your property.',
  'Receive a clear scope, timeline, and transparent quote.',
  'Works are delivered by vetted professionals with regular updates.',
  'Final quality check and handover with next-step recommendations.',
];

export default function BuildingMaintenancePage() {
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
            Building & Maintenance
          </h1>
          <p
            className="mt-4 text-base leading-7 text-[#2B2F32] sm:text-lg"
            style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
          >
            From small repairs to full refurbishments, we help landlords, sellers, and homeowners
            protect value, improve presentation, and keep properties performing at their best.
          </p>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-lg border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold uppercase tracking-[0.08em] text-[#111518]">{service.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#383E42]">
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-2xl uppercase text-[#111518]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}>
            How It Works
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-[#2B2F32] sm:text-base">
            {processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-lg border border-[#B87333]/30 bg-[#B87333]/5 p-6 text-center sm:text-left">
          <h2 className="text-xl uppercase text-[#111518]" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}>
            Planning Works Before Sale or Let?
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#383E42] sm:text-base">
            We can recommend practical improvements that help your property attract stronger offers
            and reduce time on market.
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
