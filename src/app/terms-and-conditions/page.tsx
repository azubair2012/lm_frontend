import ImageSlideShow from '@/components/ImageSlideShow'; 

export default function TermsAndConditionsPage() {
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
              terms & conditions
            </span>
          </div>
        </div>

        <article
          className="mx-auto mt-16 max-w-4xl space-y-8 text-justify text-sm leading-8 text-[#383E42] sm:text-base"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          <section className="space-y-4">
            <p>
              This website is the property of London Move of 312 St. Pauls Road London N1 2LF registered number
              08766792. By using this website, you agree that you consent to and are bound by the following terms and
              conditions:
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Disclaimer</h2>
            <p>
              London Move takes all reasonable care to ensure that the information contained on this website is accurate,
              however, we cannot guarantee its accuracy and we reserve the right to change the information on this website
              (including these terms and conditions) at any time. You must therefore check these terms and conditions for
              any such changes each time you visit this website.
            </p>
            <p>
              The description of the properties offered are for information purposes only. The information and
              descriptions contained herein are not intended to be complete descriptions of all the features. While we
              endeavour to ensure that the information and description is accurate and up-to-date we cannot guarantee
              this. Any reliance on the information contained is at your own risk.
            </p>
            <p>
              While we take every care to ensure that the standard of the website remains high and to maintain the
              continuity of the website, errors, omissions, interruptions of service and delays may occur at any time. In
              addition, we make no representations or warranties about the accuracy, completeness, and freedom from
              viruses, availability, reliability or suitability for any purpose of the information and related graphics
              published on the website (including all texts, advertisements, links or other items) which may contain
              technical inaccuracies and typographical errors.
            </p>
            <p>
              Nothing on this website shall be deemed to constitute financial advice and in the event that you wish to
              have any such advice, you should contact a financial advisor.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">
              Copyright, Trade Mark and other Intellectual Property Rights
            </h2>
            <p>
              The copyright and all other intellectual property rights in the London Move website including all text,
              graphics, photos, code, files and links belong to London Move and the London Move website may not be
              reproduced, transmitted or stored in whole or in part without London Move&apos;s prior written consent.
              However, you may print out, save or download individual selections for your own personal, private and
              non-commercial use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Applicable Law</h2>
            <p>
              Any disputes arising from the use of this website shall at all times be governed by the laws of England and
              Wales and the parties shall submit to the exclusive jurisdiction of the English Courts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Force Majeure</h2>
            <p>
              We shall not be liable to you for any breach of conditions of use or any failure to provide or delay in us
              providing our services through our website resulting from any event or circumstance beyond our reasonable
              control including (without limitation) strikes, lock-outs and other industrial disputes, break-down of
              systems or network access, fire, explosion or accident failure of any third party telecommunications or
              service provider.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Account registration</h2>
            <p>
              When you register with us you are stating that you are eighteen [18] years of age or over. You agree that any
              information you provide to us about yourself upon registration or at any other time will be true, accurate
              and complete and that you will ensure that this information is kept accurate and up-to-date at all times.
              Details of the information that we collect and how this is used is contained within our Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Other Applicable Terms</h2>
            <p>These terms of use refer to the following additional terms, which also apply to your use of the London Move website:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Our Privacy Policy, which sets out the terms on which we process any personal data we collect from you, or that you provide to us.</li>
              <li>Our Cookies Policy, which sets out the way in which we use cookies on the London Move website.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">How to contact London Move</h2>
            <p>
              We welcome your views. If you would like to contact us with any queries or comments please send an e-mail to
              <a href="mailto:info@london-move.com" className="text-[#B87333] hover:underline"> info@london-move.com</a>.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
