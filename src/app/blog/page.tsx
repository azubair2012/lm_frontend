import ImageSlideShow from '@/components/ImageSlideShow';
import Link from 'next/link';

type BlogLink = {
  label: string;
  href: string;
};

type BlogPost = {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  links: BlogLink[];
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: 'Market Insights',
    title: 'London Housing Market: Quick Read',
    subtitle: 'London Housing Market Outlook | What Buyers, Sellers and Landlords Should Know',
    excerpt: 'A short take on London\'s market now. Lending calmer, buyers selective, rents easing from last year\'s pace. Practical moves for each group.',
    content: [
      'London feels steadier than it did at the peak of uncertainty. Mortgage pricing has eased from 2023 highs, which has brought more serious viewings back into the diary, but buyers are still selective and quality matters. Well-presented homes in good pockets close to Tube or Overground stations continue to move fastest. The middle of the market is active where pricing is realistic and photographs tell a clear story. Chains are holding together better, although anything that looks like work without a clear upside can linger.',
      'On the rental side, the frenzy has cooled. Demand remains strong but tenants have a shade more choice than last year, so presentation and sensible pricing now make a visible difference to time on market. Energy performance and running costs are in sharper focus, with applicants asking more questions about insulation, glazing and heating systems.',
      'For sellers, the best strategy is simple. Fix the easy wins, stage to show space, price off the last good comparable rather than the frothiest outlier and use editorial-quality marketing. For buyers, line up an agreement in principle, target layouts that use space well and be ready to move when the right home appears. For landlords, reduce voids with smart refreshes, clean compliance and clear tenant communications.',
      'If you want a street-level view, we can map likely demand, recommend value-add improvements and guide timing so you launch at your best.',
    ],
    links: [
      { label: 'concierge service', href: '/concierge' },
      { label: 'recent sales', href: '/properties' },
      { label: 'book a market appraisal', href: '/valuation' },
    ],
  },
  {
    id: 2,
    category: 'Neighbourhood Guide',
    title: 'Islington',
    subtitle: 'Islington Neighbourhood Guide | Culture, Dining, Connectivity',
    excerpt: 'A local\'s cut on Islington. Upper Street energy, Camden Passage browsing, canal walks and excellent Tube and Overground links.',
    content: [
      'Islington manages that rare London trick of feeling like a village and a city at once. Upper Street is the spine, running from Angel to Highbury Corner with restaurants, cinemas and independent shops strung along it. Slip into Camden Passage for antiques and vintage finds, then wander the Regent\'s Canal for an easy reset. Evenings often end at the Almeida, a small theatre that consistently punches above its weight.',
      'Homes are varied and good looking. Elegant terraces and squares sit beside conversions and mansion blocks, with newer apartments dotted close to transport. Barnsbury and Canonbury are favourites for their calm streets and classic façades, while apartments near Angel and Highbury & Islington draw first-time buyers and renters who want everything on the doorstep.',
      'Getting around is simple. Angel gives you the Northern line, Highbury & Islington brings the Victoria line and the Overground, and buses fill the gaps. If you want walkable living with culture and fast links to the City and West End, Islington keeps life easy.',
    ],
    links: [
      { label: 'property search Islington', href: '/properties' },
      { label: 'book a valuation', href: '/valuation' },
      { label: 'landlord services', href: '/landlords' },
    ],
  },
  {
    id: 3,
    category: 'Neighbourhood Guide',
    title: 'Highbury',
    subtitle: 'Highbury Neighbourhood Guide | Parks, Period Homes, Fast Transport',
    excerpt: 'A quick, local take on living in Highbury. Green space, period terraces, Arsenal heritage and speedy links from Highbury & Islington.',
    content: [
      'Highbury has that easy North London rhythm people move for. Mornings begin on Highbury Fields with runners, dogs and strong coffees, and most errands can be done on foot between the Barn and Blackstock Road. The housing is a big part of the appeal. Georgian and Victorian terraces wrap quiet streets near the park, while conversions and mansion blocks offer handsome flats with good proportions. Around Drayton Park and towards Finsbury Park you will find great value one and two beds that rent or sell quickly when well presented.',
      'The transport story is hard to beat. Highbury & Islington connects to the Victoria line, the Overground and trains to Moorgate, so the West End, the City and Shoreditch are all within easy reach. Football is woven into the place too. The old Arsenal ground lives on as Highbury Square, where the Art Deco façades frame calm communal gardens and a sense of history without the match day crush.',
      'If you like character, walkability and a short commute, Highbury hits the brief. And if you are selling or letting, light upgrades and thoughtful staging go a long way here.',
    ],
    links: [
      { label: 'valuations', href: '/valuation' },
      { label: 'concierge service', href: '/concierge' },
      { label: 'Highbury area listings', href: '/properties' },
    ],
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[48px] sm:text-[64px] md:text-[80px] text-black uppercase"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif'}}
            >
              Blog
            </span>
           
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mx-auto max-w-6xl space-y-16 sm:space-y-20 md:space-y-24">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative"
            >
              {/* Card Container */}
              <div className="bg-white/80 backdrop-blur-sm border border-[#e5e7eb]/50 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 hover:shadow-xl hover:border-[#B87333]/30">
                {/* Category Badge */}
                <div className="mb-4 sm:mb-6">
                  <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#B87333] bg-[#B87333]/10 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title Section */}
                <header className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111518] mb-3 sm:mb-4 leading-tight" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                    {post.title}
                  </h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-[#383E42] mb-4 sm:mb-6 leading-relaxed" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                    {post.subtitle}
                  </h3>
                  <div className="h-px w-20 bg-[#B87333] mb-6"></div>
                </header>

                {/* Excerpt */}
                <p className="text-base sm:text-lg text-[#383E42] mb-6 sm:mb-8 leading-relaxed font-medium" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 400 }}>
                  {post.excerpt}
                </p>

                {/* Content */}
                <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                  {post.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-sm sm:text-base text-[#383E42] leading-7 sm:leading-8"
                      style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Links Section */}
                <footer className="pt-6 sm:pt-8 border-t border-[#e5e7eb]">
                  <p className="text-xs sm:text-sm text-[#8c8c8c] mb-3 sm:mb-4 italic" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                    Suggested links:
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {post.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="inline-block px-3 py-1.5 text-xs sm:text-sm text-[#383E42] bg-[#f6f4f2] hover:bg-[#B87333] hover:text-white rounded-md transition-colors cursor-pointer"
                        style={{ fontFamily: 'Public Sans, sans-serif' }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </footer>
              </div>

              {/* Divider between posts (except last) */}
              {index < blogPosts.length - 1 && (
                <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
                  <div className="h-px w-24 bg-[#B87333]/20"></div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
