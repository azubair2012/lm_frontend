'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Property } from '@/lib/api';
import { rentmanApi } from '@/lib/api';
import TopPropertyCard from '@/components/TopPropertyCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Loader2 } from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import HomeServicesGrid from '@/components/HomeServicesGrid';
import HomeAboutPreview from '@/components/HomeAboutPreview';
import HomeContactPreview from '@/components/HomeContactPreview';

const CACHE_KEY = 'home-top-properties-cache';
const CACHE_TIMESTAMP_KEY = 'home-top-properties-cache-timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopProperties();
  }, []);

  const loadTopProperties = async () => {
    try {
      setLoading(true);

      if (typeof window !== 'undefined') {
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTimestamp = sessionStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedData && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp);
          if (age < CACHE_DURATION) {
            const parsed = JSON.parse(cachedData);
            setProperties(parsed);
            setLoading(false);
            return;
          }
        }
      }

      const searchResponse = await rentmanApi.searchProperties({ page: 1, limit: 7 });
      setProperties(searchResponse.properties);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(searchResponse.properties));
        sessionStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      }
    } catch (error) {
      console.error('Error loading top properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="space-y-4 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                <p className="text-muted-foreground">Loading top properties...</p>
              </div>
            </div>
          ) : properties.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Home className="mb-4 mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No properties available</h3>
                <p className="text-muted-foreground">Please check back later for our top property listings.</p>
              </CardContent>
            </Card>
          ) : (
            (() => {
              const slots: Array<Property | null> = Array(9).fill(null);
              const items = properties.slice(0, 7);
              const positions = [1, 2, 3, 4, 5, 6, 7];
              positions.forEach((pos, idx) => {
                slots[pos] = items[idx] || null;
              });

              return (
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 auto-rows-[180px] md:grid-cols-3 md:auto-rows-[220px] lg:auto-rows-[240px] lg:gap-0">
                  {slots.map((prop, idx) => (
                    <div key={idx} className="relative">
                      {prop ? (
                        <TopPropertyCard property={prop} />
                      ) : idx === 0 ? (
                        <div className="flex h-full w-full flex-col items-center justify-center p-2">
                          <div className="relative flex flex-col items-center md:items-end">
                            <p
                              className="text-[60px] text-black uppercase sm:text-[80px]"
                              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}
                            >
                              FEATURED
                            </p>
                            <p
                              className="absolute top-12 text-5xl text-[#B87333] sm:top-16 sm:text-7xl"
                              style={{ fontFamily: 'Southland, serif' }}
                            >
                              Listings
                            </p>
                          </div>
                          <Link href="/properties">
                            <Button
                              className="mt-4 h-[55px] rounded-none bg-[#383E42] px-6 text-sm tracking-tight text-white transition hover:text-[#B87333]"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              VIEW ALL PROPERTIES
                            </Button>
                          </Link>
                        </div>
                      ) : idx === 8 ? (
                        <div
                          className="flex h-full w-full flex-col items-center justify-center gap-3 p-2"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          <Button className="h-[55px] w-full rounded-none bg-[#383E42] text-white transition hover:text-[#B87333] md:w-[320px]">
                            SELL YOUR HOMES
                          </Button>
                          <Button className="h-[55px] w-full rounded-none bg-[#383E42] text-white transition hover:text-[#B87333] md:w-[320px]">
                            TO LET
                          </Button>
                          <Button className="h-[55px] w-full rounded-none bg-[#383E42] text-white transition hover:text-[#B87333] md:w-[320px]">
                            GET VALUATION
                          </Button>
                        </div>
                      ) : (
                        <div className="hidden h-full w-full md:block" />
                      )}
                    </div>
                  ))}
                </div>
              );
            })()
          )}
        </div>
      </section>

      <section className="bg-black/95 py-16 text-white">
        <div className="container mx-auto flex max-w-6xl flex-col gap-8 rounded-[32px] bg-white/5 p-6 backdrop-blur-lg md:flex-row md:p-10">
          <div className="flex-1">
            <BeforeAfterSlider
              beforeSrc="https://framerusercontent.com/images/dkpVPiJfr1AJeuHnZUECtNJVrk.jpg?width=1920&height=1280"
              afterSrc="https://framerusercontent.com/images/a2WN7l3qDsoWAYmC7wnAKXTdY8Q.jpg?width=1920&height=1280"
              alt="Before and after concierge transformation"
            />
          </div>
          <div className="flex max-w-xl flex-1 flex-col gap-6 text-left" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
            <header className="space-y-3 text-[#101418]">
              <h2 className="text-3xl font-semibold uppercase tracking-[0.25em] text-white" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}>
                Before & After
              </h2>
              <div className="h-px w-24 bg-[#B87333]" />
            </header>
            <p className="text-base leading-7 text-white/80">
              Concierge Service
            </p>
            <p className="text-base leading-7 text-white/80">
              London Move&apos;s concierge service transforms properties to maximize their market value. Our team of experts
              handles everything from minor repairs to complete renovations, staging, and bespoke marketing strategies,
              ensuring your home launches with impact.
            </p>
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <a
                href="/concierge"
                className="rounded-none bg-[#B87333] px-8 py-3 text-center text-xs uppercase tracking-[0.4em] text-white transition hover:bg-[#9f622b]"
              >
                Concierge Service
              </a>
              <a
                href="/contact"
                className="rounded-none border border-white/60 px-8 py-3 text-center text-xs uppercase tracking-[0.4em] text-white transition hover:border-white hover:bg-white/10"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <HomeServicesGrid />

      <HomeAboutPreview />

      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="relative mb-12 flex flex-col items-center md:items-end">
            <span
              className="text-[56px] text-black uppercase sm:text-[72px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.25em' }}
            >
              WHAT OUR
            </span>
            <span
              className="absolute top-10 text-4xl text-[#B87333] sm:top-14 sm:text-6xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Customers
            </span>
            <span
              className="mt-12 text-[56px] text-black uppercase sm:text-[72px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.25em' }}
            >
              Are Saying
            </span>
          </div>
          <p className="mx-auto max-w-xl text-lg leading-9 text-[#383E42]" style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 300 }}>
            “I have used London Move for a few years now. Great communication. They support when I need them and don’t
            bother me for unnecessary things. Very personable too! I highly recommend their team for a smooth letting
            experience.”
          </p>
        </div>
      </section>

      <HomeContactPreview />

    </main>
  );
}
