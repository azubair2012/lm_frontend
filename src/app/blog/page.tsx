export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.25em' }}
            >
              Blog
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-14 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Around the World
            </span>
          </div>
        </div>

        <article
          className="mx-auto mt-16 max-w-4xl space-y-12 text-left text-sm leading-8 text-[#383E42] sm:text-base"
          style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
        >
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-[#111518]">
              London Housing Market: Quick Read
            </h2>
            <h3 className="text-xl font-medium uppercase tracking-[0.25em] text-[#111518]">
              London Housing Market Outlook | What Buyers, Sellers and Landlords Should Know
            </h3>
            <p>
              A short take on London’s market now. Lending calmer, buyers selective, rents easing from last year’s pace.
              Practical moves for each group.
            </p>
            <p>
              London feels steadier than it did at the peak of uncertainty. Mortgage pricing has eased from 2023 highs,
              which has brought more serious viewings back into the diary, but buyers are still selective and quality
              matters. Well-presented homes in good pockets close to Tube or Overground stations continue to move fastest.
              The middle of the market is active where pricing is realistic and photographs tell a clear story. Chains are
              holding together better, although anything that looks like work without a clear upside can linger.
            </p>
            <p>
              On the rental side, the frenzy has cooled. Demand remains strong but tenants have a shade more choice than
              last year, so presentation and sensible pricing now make a visible difference to time on market. Energy
              performance and running costs are in sharper focus, with applicants asking more questions about insulation,
              glazing and heating systems.
            </p>
            <p>
              For sellers, the best strategy is simple. Fix the easy wins, stage to show space, price off the last good
              comparable rather than the frothiest outlier and use editorial-quality marketing. For buyers, line up an
              agreement in principle, target layouts that use space well and be ready to move when the right home appears.
              For landlords, reduce voids with smart refreshes, clean compliance and clear tenant communications.
            </p>
            <p>
              If you want a street-level view, we can map likely demand, recommend value-add improvements and guide timing
              so you launch at your best.
            </p>
            <p className="italic">Suggested internal links: concierge service, recent sales, book a market appraisal.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-[#111518]">Islington</h2>
            <h3 className="text-xl font-medium uppercase tracking-[0.25em] text-[#111518]">
              Islington Neighbourhood Guide | Culture, Dining, Connectivity
            </h3>
            <p>
              A local’s cut on Islington. Upper Street energy, Camden Passage browsing, canal walks and excellent Tube and
              Overground links.
            </p>
            <p>
              Islington manages that rare London trick of feeling like a village and a city at once. Upper Street is the
              spine, running from Angel to Highbury Corner with restaurants, cinemas and independent shops strung along it.
              Slip into Camden Passage for antiques and vintage finds, then wander the Regent’s Canal for an easy reset.
              Evenings often end at the Almeida, a small theatre that consistently punches above its weight.
            </p>
            <p>
              Homes are varied and good looking. Elegant terraces and squares sit beside conversions and mansion blocks,
              with newer apartments dotted close to transport. Barnsbury and Canonbury are favourites for their calm streets
              and classic façades, while apartments near Angel and Highbury &amp; Islington draw first-time buyers and renters
              who want everything on the doorstep.
            </p>
            <p>
              Getting around is simple. Angel gives you the Northern line, Highbury &amp; Islington brings the Victoria line
              and the Overground, and buses fill the gaps. If you want walkable living with culture and fast links to the
              City and West End, Islington keeps life easy.
            </p>
            <p className="italic">Suggested internal links: property search Islington, book a valuation, landlord services.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-[#111518]">Highbury</h2>
            <h3 className="text-xl font-medium uppercase tracking-[0.25em] text-[#111518]">
              Highbury Neighbourhood Guide | Parks, Period Homes, Fast Transport
            </h3>
            <p>
              A quick, local take on living in Highbury. Green space, period terraces, Arsenal heritage and speedy links
              from Highbury &amp; Islington.
            </p>
            <p>
              Highbury has that easy North London rhythm people move for. Mornings begin on Highbury Fields with runners,
              dogs and strong coffees, and most errands can be done on foot between the Barn and Blackstock Road. The
              housing is a big part of the appeal. Georgian and Victorian terraces wrap quiet streets near the park, while
              conversions and mansion blocks offer handsome flats with good proportions. Around Drayton Park and towards
              Finsbury Park you will find great value one and two beds that rent or sell quickly when well presented.
            </p>
            <p>
              The transport story is hard to beat. Highbury &amp; Islington connects to the Victoria line, the Overground and
              trains to Moorgate, so the West End, the City and Shoreditch are all within easy reach. Football is woven into
              the place too. The old Arsenal ground lives on as Highbury Square, where the Art Deco façades frame calm
              communal gardens and a sense of history without the match day crush.
            </p>
            <p>
              If you like character, walkability and a short commute, Highbury hits the brief. And if you are selling or
              letting, light upgrades and thoughtful staging go a long way here.
            </p>
            <p className="italic">Suggested internal links: valuations, concierge service, Highbury area listings.</p>
          </section>
        </article>
      </section>
    </main>
  );
}
