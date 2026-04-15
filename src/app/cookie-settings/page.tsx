import ImageSlideShow from '@/components/ImageSlideShow';
import Link from 'next/link';

export default function CookieSettingsPage() {
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
              Cookie Policy
            </span>
          </div>
          <p
            className="mt-6 max-w-2xl text-sm uppercase tracking-[0.3em] text-[#383E42]"
            style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
          >
            How we use cookies and similar technologies on the London Move website
          </p>
        </div>

        <article
          className="mx-auto mt-16 max-w-4xl space-y-8 text-justify text-sm leading-8 text-[#383E42] sm:text-base"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Introduction</h2>
            <p>
              This Cookie Policy explains how London Move Property Solutions Limited (“London Move”, “we”, “us” or “our”)
              uses cookies and similar technologies when you visit our website at www.london-move.com (the “Website”). It
              should be read together with our{' '}
              <Link href="/privacy-policy" className="text-[#B87333] hover:underline">
                Privacy Policy
              </Link>
              , which describes how we process personal data more generally.
            </p>
            <p>
              By continuing to use the Website, you agree to the use of cookies in line with this policy, except where you
              have adjusted your browser settings to refuse non-essential cookies (see “How to control cookies” below).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">What are cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or device when you visit a website. They are
              widely used to make websites work more efficiently, improve security, remember preferences, and understand
              how visitors use a site. Similar technologies include local storage, pixels, and device identifiers used for
              the same purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Who we are</h2>
            <p>
              London Move Property Solutions Limited (company number 08766792) of 312 St. Pauls Road, London N1 2LF is the
              data controller for personal data collected through cookies where applicable. For privacy-related questions,
              contact us at{' '}
              <a href="mailto:admin@london-move.com" className="text-[#B87333] hover:underline">
                admin@london-move.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Types of cookies we use</h2>
            <p>We group cookies into the following categories:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="font-medium text-[#111518]">Strictly necessary</strong> — required for the Website to
                function (for example security, network management, accessibility, or load balancing). These cannot
                usually be switched off without affecting how the site works.
              </li>
              <li>
                <strong className="font-medium text-[#111518]">Functional</strong> — remember choices you make (such as
                region or accessibility options) to provide enhanced features.
              </li>
              <li>
                <strong className="font-medium text-[#111518]">Analytics / performance</strong> — help us understand how
                visitors use the Website (for example pages viewed and errors), so we can improve it.
              </li>
              <li>
                <strong className="font-medium text-[#111518]">Marketing</strong> — used to deliver relevant
                advertisements or limit how often you see an ad, including where we work with advertising partners.
              </li>
            </ul>
            <p>
              Where UK law requires consent for non-essential cookies, we will only set those cookies after you have given
              consent through our cookie banner or preference centre, where available.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Cookies in use on this Website</h2>
            <p>
              Our current approach is to keep cookie use to a minimum. Strictly necessary cookies may be used so that the
              Website can operate securely and reliably. Where we introduce analytics, functional, or marketing cookies, we
              will update this policy and the list below.
            </p>
            <div className="overflow-x-auto rounded border border-[#383E42]/20">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#383E42]/20 bg-[#383E42]/5">
                    <th className="p-3 font-semibold uppercase tracking-[0.15em] text-[#111518]">Name / source</th>
                    <th className="p-3 font-semibold uppercase tracking-[0.15em] text-[#111518]">Purpose</th>
                    <th className="p-3 font-semibold uppercase tracking-[0.15em] text-[#111518]">Type</th>
                    <th className="p-3 font-semibold uppercase tracking-[0.15em] text-[#111518]">Typical duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#383E42]/10">
                    <td className="p-3 align-top">Session / security (first-party)</td>
                    <td className="p-3 align-top">
                      Maintains secure operation of the Website, for example admin sessions or fraud prevention where
                      applicable.
                    </td>
                    <td className="p-3 align-top">Strictly necessary</td>
                    <td className="p-3 align-top">Session or up to 24 hours</td>
                  </tr>
                  <tr>
                    <td className="p-3 align-top">Preference cookies (if used)</td>
                    <td className="p-3 align-top">Store cookie choices or interface preferences you select.</td>
                    <td className="p-3 align-top">Functional</td>
                    <td className="p-3 align-top">Up to 12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs sm:text-sm">
              Specific cookie names and durations may vary as we update the Website. If you need an up-to-date list,
              contact{' '}
              <a href="mailto:admin@london-move.com" className="text-[#B87333] hover:underline">
                admin@london-move.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Third-party cookies</h2>
            <p>
              Some pages may include content or tools provided by third parties (for example embedded maps, videos, or
              social plugins). Those providers may set their own cookies. We do not control third-party cookies; please
              refer to the relevant third party’s privacy and cookie policies for more information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">How to control cookies</h2>
            <p>
              Most browsers let you refuse or delete cookies through their settings. You can usually find these under
              “Privacy”, “Security”, or “Cookies”. Blocking all cookies may affect how the Website works.
            </p>
            <p>
              For more information about cookies, including how to see what cookies have been set, visit{' '}
              <a
                href="https://www.aboutcookies.org"
                className="text-[#B87333] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                aboutcookies.org
              </a>{' '}
              or{' '}
              <a
                href="https://ico.org.uk/for-the-public/online/cookies/"
                className="text-[#B87333] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                ICO guidance on cookies
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Changes to this policy</h2>
            <p>
              We may update this Cookie Policy from time to time. The “last updated” indication will be reflected by
              changes posted on this page. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#111518]">Contact us</h2>
            <p>
              If you have questions about our use of cookies, contact us at{' '}
              <a href="mailto:admin@london-move.com" className="text-[#B87333] hover:underline">
                admin@london-move.com
              </a>{' '}
              or{' '}
              <a href="mailto:info@london-move.com" className="text-[#B87333] hover:underline">
                info@london-move.com
              </a>
              .
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#383E42]/80">Last updated: April 2026</p>
          </section>
        </article>
      </section>
    </main>
  );
}
