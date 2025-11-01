'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/api';
import { rentmanApi } from '@/lib/api';
import TopPropertyCard from '@/components/TopPropertyCard';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CACHE_KEY = 'top-properties-cache';
const CACHE_TIMESTAMP_KEY = 'top-properties-cache-timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function TopPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Load first 7 properties
  useEffect(() => {
    loadTopProperties();
  }, []);

  const loadTopProperties = async () => {
    try {
      setLoading(true);
      
      // Check sessionStorage cache
      if (typeof window !== 'undefined') {
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTimestamp = sessionStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        if (cachedData && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp);
          if (age < CACHE_DURATION) {
            console.log('✅ Loading top properties from cache');
            const parsed = JSON.parse(cachedData);
            setProperties(parsed);
            setLoading(false);
            return;
          } else {
            console.log('⏰ Cache expired, fetching fresh data');
          }
        }
      }

      console.log('📄 Fetching top 7 properties from API');
      
      // Fetch only the first 7 properties
      const searchResponse = await rentmanApi.searchProperties({ 
        page: 1, 
        limit: 7 
      });
      
      console.log('🌟 Top properties response:', searchResponse);
      console.log('🏠 Properties count:', searchResponse.properties?.length);
      
      setProperties(searchResponse.properties);
      
      // Cache to sessionStorage
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading top properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          

          {properties.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Home className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No properties available</h3>
                <p className="text-muted-foreground">
                  Please check back later for our top property listings.
                </p>
              </CardContent>
            </Card>
          ) : (
            (() => {
              // Build 9 slots, leave 0 (top-left) and 8 (bottom-right) empty
              const slots: Array<Property | null> = Array(9).fill(null);
              const items = properties.slice(0, 7);
              const positions = [1, 2, 3, 4, 5, 6, 7];
              positions.forEach((pos, idx) => {
                slots[pos] = items[idx] || null;
              });

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-0 gap-6 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[240px] max-w-6xl mx-auto">
                  {slots.map((prop, idx) => (
                    <div key={idx} className="relative">
                      {prop ? (
                        <TopPropertyCard property={prop} />
                      ) : idx === 0 ? (
                        // Position 0 (top-left): Featured section
                        <div className="h-full w-full md:flex flex-col items-center gap-3 p-2 justify-center">
                          <div className='flex flex-col items-end'>
                          <p className="text-5xl font-bold text-[#383E42] uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>FEATURED</p>
                          <p className="text-6xl font-light text-[#B87333]" style={{ fontFamily: 'Southland, serif' }}>Listings</p>
                          </div>
                          <Button 
                            className="bg-[#383E42] text-sm hover:text-[#B87333] text-white rounded-none h-[55px] w-fit mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            VIEW ALL PROPERTIES
                          </Button>
                        </div>
                      ) : idx === 8 ? (
                        // Position 8 (bottom-right): Action buttons
                        <div className="h-full w-full md:flex flex-col items-center gap-3 p-2 justify-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          <Button 
                            className="bg-[#383E42] text-md hover:text-[#B87333] text-white rounded-none h-[55px] w-[320px]"
                          >
                            SELL YOUR HOMES
                          </Button>
                          <Button 
                            className="bg-[#383E42] text-md hover:text-[#B87333] text-white rounded-none h-[55px] w-[320px]"
                          >
                            TO LET
                          </Button>
                          <Button 
                            className="bg-[#383E42] text-md hover:text-[#B87333] text-white rounded-none h-[55px] w-[320px]"
                          >
                            GET VALUATION
                          </Button>
                        </div>
                      ) : (
                        <div className="h-full w-full hidden md:block" />
                      )}
                    </div>
                  ))}
                </div>
              );
            })()
          )}
        </div>
      </section>
    </div>
  );
}

