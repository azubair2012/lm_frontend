import Link from 'next/link';

type PropertyListing = {
  propref: string;
  displayaddress?: string;
  area?: string;
  saleprice?: string;
  beds?: string;
  singles?: string;
  doubles?: string;
};

type SearchPayload = {
  properties: PropertyListing[];
  pagination?: {
    total?: number;
  };
};

type SearchResponse = {
  success: boolean;
  data: SearchPayload;
};

function toNumber(value?: string): number | null {
  if (!value) return null;
  const cleaned = value.replace(/[^\d.]/g, '');
  if (!cleaned) return null;
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

async function getLondonMarketSnapshot() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
  const response = await fetch(
    `${baseUrl}/properties/search?type=sale&limit=200&page=1`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch property snapshot');
  }

  const payload = (await response.json()) as SearchResponse;
  const listings = payload?.data?.properties ?? [];

  const prices = listings
    .map((property) => toNumber(property.saleprice))
    .filter((price): price is number => price !== null);

  const bedCounts = listings
    .map((property) => {
      const beds = toNumber(property.beds) ?? 0;
      const singles = toNumber(property.singles) ?? 0;
      const doubles = toNumber(property.doubles) ?? 0;
      const total = beds + singles + doubles;
      return total > 0 ? total : null;
    })
    .filter((count): count is number => count !== null);

  const areaCounts = listings.reduce<Record<string, number>>((acc, property) => {
    const area = property.area?.trim();
    if (!area) return acc;
    acc[area] = (acc[area] ?? 0) + 1;
    return acc;
  }, {});

  const topAreas = Object.entries(areaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const averagePrice =
    prices.length > 0 ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length) : 0;
  const medianPrice = prices.length > 0 ? Math.round(median(prices)) : 0;
  const averageBeds =
    bedCounts.length > 0
      ? (bedCounts.reduce((sum, count) => sum + count, 0) / bedCounts.length).toFixed(1)
      : 'N/A';

  return {
    totalListings: payload?.data?.pagination?.total ?? listings.length,
    averagePrice,
    medianPrice,
    averageBeds,
    topAreas,
    sampleListings: listings.slice(0, 3),
  };
}

export default async function BuyerGuidesPage() {
  let snapshot: Awaited<ReturnType<typeof getLondonMarketSnapshot>> | null = null;
  let dataError = false;

  try {
    snapshot = await getLondonMarketSnapshot();
  } catch (error) {
    dataError = true;
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <header className="mb-8 space-y-3 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B87333]">London Move Resource</p>
          <h1
            className="text-4xl uppercase text-[#111518] sm:text-5xl"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700 }}
          >
            Buyer Guide
          </h1>
          <p className="text-base leading-7 text-[#2B2F32]" style={{ fontFamily: 'Public Sans, sans-serif' }}>
            A practical overview of the current London sales market to help you shortlist areas, set budgets,
            and move faster when the right home appears.
          </p>
        </header>

        {dataError || !snapshot ? (
          <div className="rounded-lg border border-[#B87333]/30 bg-white p-6">
            <p className="text-sm text-[#383E42]">
              Live market data is temporarily unavailable. Please try again shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-lg border bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#383E42]">Listings Tracked</p>
                <p className="mt-2 text-2xl font-semibold text-[#111518]">{snapshot.totalListings}</p>
              </article>
              <article className="rounded-lg border bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#383E42]">Average Asking Price</p>
                <p className="mt-2 text-2xl font-semibold text-[#111518]">{formatCurrency(snapshot.averagePrice)}</p>
              </article>
              <article className="rounded-lg border bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#383E42]">Median Asking Price</p>
                <p className="mt-2 text-2xl font-semibold text-[#111518]">{formatCurrency(snapshot.medianPrice)}</p>
              </article>
              <article className="rounded-lg border bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#383E42]">Average Bedrooms</p>
                <p className="mt-2 text-2xl font-semibold text-[#111518]">{snapshot.averageBeds}</p>
              </article>
            </section>

            <section className="rounded-lg border bg-white p-6">
              <h2 className="text-xl font-semibold uppercase tracking-[0.12em] text-[#111518]">Top Active Areas</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {snapshot.topAreas.map(([area, count]) => (
                  <div key={area} className="rounded-md border border-[#B87333]/20 bg-[#B87333]/5 p-3">
                    <p className="text-sm font-semibold text-[#111518]">{area}</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#383E42]">{count} listings</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border bg-white p-6">
              <h2 className="text-xl font-semibold uppercase tracking-[0.12em] text-[#111518]">How To Use This Data</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#2B2F32]">
                <li>Use the median price as your baseline budget rather than the headline average.</li>
                <li>Prioritize top active areas first if speed is more important than perfect-fit location.</li>
                <li>Compare bedroom count against your target to avoid overpaying for unusable space.</li>
                <li>Track weekly changes and set alerts so you can move quickly on well-priced listings.</li>
              </ul>
            </section>

            <section className="rounded-lg border bg-white p-6">
              <h2 className="text-xl font-semibold uppercase tracking-[0.12em] text-[#111518]">Recent Listing Examples</h2>
              <div className="mt-4 space-y-3">
                {snapshot.sampleListings.map((listing) => (
                  <div key={listing.propref} className="rounded-md border p-3">
                    <p className="text-sm font-semibold text-[#111518]">{listing.displayaddress || 'London property'}</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#383E42]">
                      {listing.area || 'London'} {listing.saleprice ? `- ${listing.saleprice}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/sale"
            className="inline-flex h-[48px] items-center justify-center rounded-none bg-[#383E42] px-6 text-sm font-semibold text-white transition-colors hover:text-[#B87333]"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            VIEW PROPERTIES FOR SALE
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-[48px] items-center justify-center rounded-none border border-[#383E42] px-6 text-sm font-semibold text-[#383E42] transition-colors hover:border-[#B87333] hover:text-[#B87333]"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            BOOK A BUYER CONSULTATION
          </Link>
        </div>
      </section>
    </main>
  );
}

