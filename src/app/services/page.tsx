import ImageSlideShow from '@/components/ImageSlideShow'; 

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="mx-auto">
      <div className="absolute -z-10 w-full h-full opacity-50 hidden md:block" style={{
      backgroundImage: "url('/bg1.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
        }}>
          
        </div>
        {/* Heading */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex flex-col md:items-end">
            <span
              className="text-[48px] sm:text-[64px] text-black uppercase md:text-[90px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
            >
              Services
            </span>
            <span
              className="absolute text-[48px] md:top-[85px] top-8 text-[#B87333] md:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              We Provide
            </span>
          </div>
        </div>

        <div
          className="mx-auto mt-10 px-4 flex max-w-4xl flex-col gap-12 text-sm text-[#383E42] sm:text-base text-center md:text-start"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          <section className="">
            <h2 className="text-2xl font-semibold uppercase text-[#111518] mb-4">Building & Maintenance</h2>
            <p className="text-start">
              We work with a carefully selected panel of qualified, industry-approved tradespeople, offering a wide
              range of skilled services. Whether you need a GAS SAFE registered engineer or a NICEIC certified
              electrician, every contractor we recommend is fully vetted, holds public liability insurance, and
              complies with HHSRS standards.
            </p>
            <p className="text-start">
              From complete refurbishments and property makeovers to routine maintenance and small handyman tasks,
              no job is too big or too small. Our trusted contractors approach every project with professionalism and
              efficiency, ensuring high-quality workmanship every time.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold uppercase  text-[#111518]">Tenant Permitted Payments</h2>
            <div>
              <h3 className="font-semibold text-[#111518]">Tenant Payments Summary:</h3>
              <ul className="list-disc pl-6 text-start">
                <li>One month’s rent in advance (unless otherwise agreed).</li>
                <li>Five weeks’ rent as a tenancy deposit ("the Deposit").</li>
                <li>One week’s holding deposit paid to London Move does not guarantee the tenancy.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[#111518]">Holding Deposit Conditions:</h3>
              <ul className="list-disc pl-6 text-start">
              <p>London Move may keep the holding deposit if:</p>
                <li>False or misleading information is provided.</li>
                <li>The applicant fails the right to rent check.</li>
                <li>The applicant withdraws from the tenancy.</li>
                <li>The applicant does not respond within 24 hours when requested for information.</li>
              </ul>
              <p className="text-start">
                If retained, London Move will notify applicants within 7 days with reasons. Applicants must complete
                referencing within 24 hours of notification. After satisfactory references, the Tenancy Agreement will
                be issued within 48 hours. All tenants must sign the agreement together at the London Move office before
                the tenancy starts.
              </p>
              <p className="text-start">The holding deposit is not protected under the Housing Act 2008 deposit schemes.</p>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold uppercase text-[#111518]">Our Fees</h2>
            <div>
              <div>
                <h3 className="font-semibold text-[#111518]">Landlord Fees:</h3>
                <ul className="list-disc pl-6 text-start">
                  <li>Letting Only – 9.6% inc VAT.</li>
                  <li>Letting & Rent Collection – 12% inc VAT.</li>
                  <li>Rent Collection and Property Management – 6% inc VAT.</li>
                  <li>Letting, Rent Collection and Property Management – 15.6% inc VAT.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
