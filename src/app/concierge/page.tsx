import ImageSlideShow from '@/components/ImageSlideShow'; 

export default function ConciergePage() {
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
              concierge
            </span>
          </div>
          <p
            className="mt-4 text-xl uppercase tracking-[0.35em] text-[#383E42] sm:text-2xl"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 500 }}
          >
            Transforming Your Property, Maximising Its Value
          </p>
        </div>

        <article
          className="mx-auto mt-16 max-w-4xl space-y-8 text-justify text-sm leading-8 text-[#383E42] sm:text-base"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          <section className="space-y-4">
            <p>
              At <strong>London Move</strong>, we believe every home has hidden potential. Our <strong>Concierge Service</strong>
              helps property owners across <strong>Highbury, Islington and the wider London area</strong> transform their
              spaces so they attract more buyers or tenants and achieve the best possible price. Whether you are preparing
              to sell, rent or invest, we make your property stand out from the rest.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">
              What the Concierge Service Includes
            </h2>
            <p>
              Our service is a complete property enhancement solution that brings together everything needed to make your
              home market ready. We combine <strong>planning, upgrades, styling and marketing</strong> into one smooth process so you do
              not have to juggle contractors or stress over timelines.
            </p>
            <p>
              We start with a <strong>consultation</strong> to assess your property and recommend the best improvements for impact and
              return. Then we <strong>plan the works</strong>, agree clear costs and timelines, and handle every step of the transformation.
            </p>
            <p>
              Typical works include interior decorating, lighting and flooring upgrades, kitchen and bathroom refreshes,
              landscaping, and deep cleaning. Once the improvements are complete, we <strong>stage your property</strong> with carefully
              selected furnishings and accessories to highlight its best features. We then arrange <strong>professional photography
              and virtual tours</strong> so it looks stunning online, catching buyers’ attention from the very first click.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Why Presentation Matters</h2>
            <p>
              First impressions are everything. Buyers and tenants often decide within moments whether a property feels
              right. A well-presented home attracts stronger offers, reduces time on the market and builds confidence in its
              value. Even modest changes like a fresh coat of paint or updated lighting can turn a property from overlooked
              to highly desirable.
            </p>
            <p>
              We have seen it time and again. A recent two-bedroom flat in Islington received a light refresh costing
              around £6,000 and went on to sell for £35,000 above its initial valuation in less than two weeks. Small
              improvements can make a very big difference.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">
              Perfect for Sellers, Landlords and Investors
            </h2>
            <p>
              Our concierge service works for a wide range of clients. Sellers achieve higher offers and faster sales.
              Landlords reduce void periods and attract quality tenants. Investors maximise their return without lifting a
              finger.
            </p>
            <p>
              We understand the <strong>local market inside out</strong> and know exactly how to position your property to appeal to
              today’s buyers and renters.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">
              Simple and Transparent Process
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>Book your consultation</li>
              <li>Receive your tailored plan</li>
              <li>We complete the works</li>
              <li>Launch to market</li>
              <li>Secure the best result</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Real Client Feedback</h2>
            <blockquote className="space-y-2 border-l-2 border-[#B87333] pl-4 italic text-[#111518]">
              <p>“They handled everything from staging to marketing. We sold £50,000 above asking.” – Claire, N5</p>
              <p>“Our rental was filled within three days. Worth every penny.” – Daniel, N1</p>
            </blockquote>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">
              Ready to Transform Your Property?
            </h2>
            <p>
              Let London Move elevate your home to its full potential. Whether your goal is to sell quickly or rent at a
              premium, our <strong>Concierge Service</strong> delivers results.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
