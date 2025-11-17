import ImageSlideShow from '@/components/ImageSlideShow'; 
export default function LandlordsPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.25em' }}
            >
              letting
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              With Us
            </span>
          </div>
        </div>

        <article
          className="mx-auto mt-16 max-w-4xl space-y-8 text-justify text-sm leading-8 text-[#383E42] sm:text-base"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          <section className="space-y-4">
            <p>
              <strong>London Move has a dedicated team installed solely for the purpose of serving the requirements of landlords and tenants.</strong>
            </p>
            <p>
              <strong>We recognize that the letting of property must be approached with diligence and expertise.</strong>
            </p>
            <p>
              Upon instruction, professional photographs and floor-plans will be arranged after which the property will be advertised on our bespoke market leading website
              <span className="whitespace-pre"> www.london-move.com, www.rightmove.co.uk, www.primelocation.com, www.zoopla.co.uk, www.globrix.com,</span>
              <span className="whitespace-pre"> www.homes&property.co.uk, Evening Standard Homes &amp; Property,</span>
              various other property forums and circulation of property details to independent relocation agents. In addition, details of the property will be displayed in our prominent shop window.
            </p>
            <p>
              Upon instruction, professional photographs and floor-plans will be arranged after which the property will be advertised on our bespoke market leading website
              <span className="whitespace-pre"> www.london-move.com, www.rightmove.co.uk, www.primelocation.com, www.zoopla.co.uk, www.globrix.com,</span>
              <span className="whitespace-pre"> www.homes&property.co.uk, Evening Standard Homes &amp; Property,</span>
              various other property forums and circulation of property details to independent relocation agents. In addition, details of the property will be displayed in our prominent shop window.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Features:</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Arranging and accompanying views</li>
              <li>Negotiate rental offer between landlord &amp; tenant</li>
              <li>Conduct referencing through Rentshield, an independent referencing and credit check agency</li>
              <li>Ensure compliance with gas &amp; electric safety, EPC and Deposit Protection regulations</li>
              <li>Prepare comprehensive tenancy agreement with relevant notices in accordance with Housing Act and common law</li>
              <li>Receive first month's rent and six weeks deposit from incoming tenants</li>
              <li>Check-in/inventory and handover of keys to tenants</li>
              <li>Ensure prompt payment of rent into landlord bank account</li>
            </ul>
          </section>
        </article>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.25em' }}
            >
              property
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Management
            </span>
          </div>
        </div>

        <article
          className="mx-auto mt-16 max-w-4xl space-y-8 text-justify text-sm leading-8 text-[#383E42] sm:text-base"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          <section className="space-y-4">
            <p>
              <strong>Each managed property has a dedicated property manager utilising state of the art bespoke software ensuring efficient and accountable management.</strong>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Features:</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Rent Demand and collection</strong></li>
              <li><strong>Monthly statements and BACS remittance</strong></li>
              <li><strong>Non-Resident Landlord tax submission</strong></li>
              <li><strong>Settlement of service charge and other landlord disbursements</strong></li>
              <li><strong>Maintenance/repairs including provision of quotes and overseeing works</strong></li>
              <li><strong>Property visits and subsequent reporting</strong></li>
              <li><strong>Tenancy expiry and renewal support</strong></li>
              <li><strong>Check-out/inventory</strong></li>
              <li><strong>Assistance with tenant deposit determination where appropriate</strong></li>
            </ul>
          </section>
        </article>
      </section>
    </main>
  );
}
