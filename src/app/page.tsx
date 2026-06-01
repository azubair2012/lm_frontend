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
import HeroSlider from '@/components/HeroSlider';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { CONTENT_REGISTRY } from '@/lib/content-registry';

const CACHE_KEY = 'home-top-properties-cache';
const CACHE_TIMESTAMP_KEY = 'home-top-properties-cache-timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [conciergeDescription, setConciergeDescription] = useState(
    CONTENT_REGISTRY.conciergeDescription.defaultValue
  );

  useEffect(() => {
    loadTopProperties();
    loadEditableContent();
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

  const loadEditableContent = async () => {
    try {
      const response = await fetch(
        `/api/content?keys=${encodeURIComponent(CONTENT_REGISTRY.conciergeDescription.key)}`
      );
      const payload = (await response.json()) as {
        success: boolean;
        data?: Array<{ key: string; value: string }>;
      };
      if (!response.ok || !payload.success || !payload.data) {
        return;
      }

      const conciergeEntry = payload.data.find(
        (entry) => entry.key === CONTENT_REGISTRY.conciergeDescription.key
      );
      if (conciergeEntry?.value?.trim()) {
        setConciergeDescription(conciergeEntry.value.trim());
      }
    } catch (error) {
      console.error('Error loading editable homepage content:', error);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <HeroSlider />
      <section className="md:py-12 py-2">
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
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[200px] md:grid-cols-3 md:auto-rows-[220px] lg:auto-rows-[240px] lg:gap-0">
                  {slots.map((prop, idx) => (
                    <div key={idx} className="relative">
                      {prop ? (
                        <TopPropertyCard property={prop} />
                      ) : idx === 0 ? (
                         // Position 0 (top-left): Featured section
                         <div className="h-full w-full flex flex-col items-center p-2 justify-center">
                         <div className='flex flex-col items-center md:items-end relative'>
                        <p className="text-[80px] text-black uppercase" style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 600 }}>FEATURED</p>
                        <p className="text-7xl font-medium top-16 text-[#B87333] absolute" style={{ fontFamily: 'Southland, serif' }}>Listings</p>
                         </div>
                         <Button 
                           className="bg-[#383E42] text-sm hover:text-[#B87333] tracking-tight text-white rounded-none h-[55px] w-fit mt-4" style={{ fontFamily: 'Roboto, sans-serif' }}
                         >
                           VIEW ALL PROPERTIES
                         </Button>
                       </div>
                      ) : idx === 8 ? (
                        <div
                          className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 sm:p-2"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          <Button className="h-[50px] sm:h-[55px] w-full rounded-none bg-[var(--charcoal)] text-white transition hover:text-[var(--copper)] md:w-[320px]">
                            SELL YOUR HOMES
                        </Button>
                          <Button className="h-[50px] sm:h-[55px] w-full rounded-none bg-[var(--charcoal)] text-white transition hover:text-[var(--copper)] md:w-[320px]">
                            TO LET
                        </Button>
                          <Button className="h-[50px] sm:h-[55px] w-full rounded-none bg-[var(--charcoal)] text-white transition hover:text-[var(--copper)] md:w-[320px]">
                            PROPERTY VALUATION
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

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Before and After */}
      <section className="md:py-16 py-6 text-black">
        <div className="container mx-auto flex max-w-7xl flex-col gap-8 rounded-[32px] bg-white/5 p-6 backdrop-blur-lg md:flex-row md:p-10">
          <div className="flex max-w-lg flex-1 flex-col gap-6 items-center text-center" style={{ fontFamily: 'Public Sans, sans-serif'}}>
            <header className="relative flex flex-col items-center">
            <span
              className="text-[60px] text-black uppercase md:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
              aria-hidden="true"
            >
              CONCIERGE
            </span>
            <span
              className="relative -top-3 md:-top-4 md:ml-8 text-[48px] text-[var(--copper)] md:text-7xl"
              style={{ fontFamily: 'Southland, serif' }}
              aria-hidden="true"
            >
              Service
            </span>
            </header>
           
            <p className="text-base leading-7 text-[#383E42]">
              {conciergeDescription}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/concierge" className="bg-[var(--charcoal)] text-sm hover:text-[var(--copper)] text-white rounded-none text-center font-semibold h-[50px] w-[250px]  p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>LEARN MORE</Link>
            </div>
          </div>
          
          <div className="flex-1 h-[430px]">
            <BeforeAfterSlider
              beforeSrc="https://framerusercontent.com/images/vQ8Uyh4tRjaJSM7ZB2ggJ1wCT4s.png?width=740&height=482"
              afterSrc="https://framerusercontent.com/images/vyrQsg8QSVd2iah4yT0C4lldotE.png?width=740&height=600"
              alt="Before and after concierge transformation"
            />
          </div>
          
        </div>
      </section>
          {/* Services */}
      <HomeServicesGrid />
          {/* About Us */}
      <HomeAboutPreview />
          {/* Contact Us */}
      <HomeContactPreview formType="general" />

    </main>
  );
}
