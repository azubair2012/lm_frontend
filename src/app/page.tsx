'use client';

import { useState, useEffect } from 'react';
import { Property, SearchParams } from '@/lib/api';
import { rentmanApi } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Home, TrendingUp, Star } from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 1000,
    q: '',
    area: '',
    type: '',
    beds: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    featured: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [filters, setFilters] = useState({
    areas: [] as string[],
    types: [] as string[],
    priceRange: { min: 0, max: 10000 },
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [searchResponse, featuredData] = await Promise.all([
        rentmanApi.searchProperties({ page: 1, limit: 1000 }),
        rentmanApi.getFeaturedProperties(),
      ]);
      
      console.log('🏠 Initial search response:', searchResponse);
      console.log('🏠 Properties count:', searchResponse.properties?.length);
      console.log('🏠 Featured count:', featuredData?.length);
      
      setProperties(searchResponse.properties);
      setFeaturedProperties(featuredData);
      
      // Update pagination from search response
      setPagination({
        page: searchResponse.pagination.page,
        totalPages: searchResponse.pagination.totalPages,
        hasNext: searchResponse.pagination.hasNext,
        hasPrev: searchResponse.pagination.hasPrev,
      });
      
      // Extract filters from search response
      if (searchResponse.filters) {
        setFilters({
          areas: searchResponse.filters.areas || [],
          types: searchResponse.filters.types || [],
          priceRange: searchResponse.filters.priceRange || { min: 0, max: 10000 },
        });
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (params: SearchParams) => {
    try {
      console.log('🔍 Search called with params:', JSON.stringify(params, null, 2));
      setSearchLoading(true);
      setSearchParams(params);
      
      const response = await rentmanApi.searchProperties(params);
      console.log('📊 Search response:', JSON.stringify(response, null, 2));
      console.log('🏠 Properties:', response?.properties);
      console.log('📄 Pagination:', response?.pagination);
      
      if (response && response.properties && response.pagination) {
        console.log('✅ Valid search response, setting properties:', response.properties.length);
        setProperties(response.properties);
        setPagination({
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
          hasNext: response.pagination.hasNext,
          hasPrev: response.pagination.hasPrev,
        });
      } else {
        console.error('❌ Invalid search response:', response);
        setProperties([]);
        setPagination({
          page: 1,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        });
      }
    } catch (error) {
      console.error('❌ Error searching properties:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const loadMore = async () => {
    if (!pagination.hasNext || searchLoading) return;
    
    try {
      setSearchLoading(true);
      const nextPage = pagination.page + 1;
      const response = await rentmanApi.searchProperties({
        ...searchParams,
        page: nextPage,
      });
      
      setProperties(prev => [...prev, ...response.properties]);
      setPagination(prev => ({
        ...prev,
        page: nextPage,
        hasNext: response.pagination.hasNext,
      }));
    } catch (error) {
      console.error('Error loading more properties:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
    
      {/* Search Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <SearchFilters
            onSearch={handleSearch}
            loading={searchLoading}
            areas={filters.areas}
            types={filters.types}
            priceRange={filters.priceRange}
          />
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Featured Properties</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProperties.slice(0, 4).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Properties Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Properties</h2>
            <div className="text-sm text-muted-foreground">
              {properties.length} propert{properties.length !== 1 ? 'ies' : 'y'} found
            </div>
          </div>

          {properties.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Home className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria to find more properties.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Load More Button */}
              {pagination.hasNext && (
                <div className="text-center mt-8">
                  <Button
                    onClick={loadMore}
                    disabled={searchLoading}
                    size="lg"
                    className="min-w-32"
                  >
                    {searchLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Load More
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}