'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/api';
import { rentmanApi } from '@/lib/api';
import TopPropertyCard from '@/components/TopPropertyCard';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Home, Star } from 'lucide-react';

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
      // Fetch only the first 7 properties
      const searchResponse = await rentmanApi.searchProperties({ 
        page: 1, 
        limit: 7 
      });
      
      console.log('🌟 Top properties response:', searchResponse);
      console.log('🏠 Properties count:', searchResponse.properties?.length);
      
      setProperties(searchResponse.properties);
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-0 gap-6 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[300px]">
                  {slots.map((prop, idx) => (
                    <div key={idx} className="relative">
                      {prop ? (
                        <TopPropertyCard property={prop} />
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

