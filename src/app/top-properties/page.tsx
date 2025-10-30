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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-8 h-8 text-primary fill-primary" />
              <h1 className="text-4xl font-bold">Top 7 Properties</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Our handpicked selection of the best properties available right now. 
              Browse through our featured collection with full details and galleries.
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Properties</h2>
            <div className="text-sm text-muted-foreground">
              {properties.length} propert{properties.length !== 1 ? 'ies' : 'y'}
            </div>
          </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <TopPropertyCard 
                  key={property.propref} 
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

