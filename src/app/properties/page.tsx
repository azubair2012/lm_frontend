'use client';

import { useEffect, useState } from 'react';
import { Property, SearchParams } from '@/lib/api';
import { rentmanApi } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, Loader2 } from 'lucide-react';
import ImageSlideShow from '@/components/ImageSlideShow'; 

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 12,
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
  const [pageCache, setPageCache] = useState<Map<string, Property[]>>(new Map());

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const searchResponse = await rentmanApi.searchProperties({ page: 1, limit: 12 });

      setProperties(searchResponse.properties);

      const cacheKey = JSON.stringify({ ...searchParams, page: 1 });
      setPageCache(new Map([[cacheKey, searchResponse.properties]]));

      setPagination({
        page: searchResponse.pagination.page,
        totalPages: searchResponse.pagination.totalPages,
        hasNext: searchResponse.pagination.hasNext,
        hasPrev: searchResponse.pagination.hasPrev,
      });

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
      setSearchLoading(true);
      setPageCache(new Map());

      const searchParamsWithLimit = { ...params, page: 1, limit: 12 };
      setSearchParams(searchParamsWithLimit);

      const response = await rentmanApi.searchProperties(searchParamsWithLimit);

      if (response && response.properties && response.pagination) {
        setProperties(response.properties);
        const cacheKey = JSON.stringify(searchParamsWithLimit);
        setPageCache(new Map([[cacheKey, response.properties]]));
        setPagination({
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
          hasNext: response.pagination.hasNext,
          hasPrev: response.pagination.hasPrev,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
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

  const goToPage = async (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > pagination.totalPages || searchLoading) return;

    const cacheKey = JSON.stringify({ ...searchParams, page: pageNumber });

    if (pageCache.has(cacheKey)) {
      setProperties(pageCache.get(cacheKey)!);
      setPagination({
        page: pageNumber,
        totalPages: pagination.totalPages,
        hasNext: pageNumber < pagination.totalPages,
        hasPrev: pageNumber > 1,
      });
      setSearchParams((prev) => ({ ...prev, page: pageNumber }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSearchLoading(true);
      const response = await rentmanApi.searchProperties({
        ...searchParams,
        page: pageNumber,
        limit: 12,
      });

      setPageCache((prev) => new Map(prev).set(cacheKey, response.properties));
      setProperties(response.properties);
      setPagination({
        page: response.pagination.page,
        totalPages: response.pagination.totalPages,
        hasNext: response.pagination.hasNext,
        hasPrev: response.pagination.hasPrev,
      });
      setSearchParams((prev) => ({ ...prev, page: pageNumber }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ImageSlideShow />
      <div className="flex justify-center  pt-20">
          <div className="relative flex flex-col items-center md:items-end">
            <span
              className="text-[64px] text-black uppercase sm:text-[80px]"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', fontWeight: 700}}
            >
              our properties
            </span>
            <span
              className="absolute top-10 text-5xl text-[#B87333] sm:top-16 sm:text-7xl"
              style={{ fontFamily: 'Southland, serif', fontWeight: 400 }}
            >
              Live Where You Love
            </span>
          </div>
         
        </div>
      <section className="py-4 mt-8">
        <div className="container mx-auto px-4">
          <SearchFilters onSearch={handleSearch} loading={searchLoading} areas={filters.areas} />
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {properties.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Home className="mb-4 mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No properties found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria to find more properties.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {properties.map((property, index) => (
                  <PropertyCard key={`${property.propref}-${index}`} property={property} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
                  <Button
                    onClick={() => goToPage(pagination.page - 1)}
                    disabled={!pagination.hasPrev || searchLoading}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {pagination.page > 3 && (
                      <>
                        <Button
                          onClick={() => goToPage(1)}
                          disabled={searchLoading}
                          variant={pagination.page === 1 ? 'default' : 'outline'}
                          size="sm"
                          className="min-w-10"
                        >
                          1
                        </Button>
                        {pagination.page > 4 && <span className="px-2 text-muted-foreground">...</span>}
                      </>
                    )}

                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter((page) => page >= pagination.page - 2 && page <= pagination.page + 2)
                      .map((page) => (
                        <Button
                          key={page}
                          onClick={() => goToPage(page)}
                          disabled={searchLoading}
                          variant={pagination.page === page ? 'default' : 'outline'}
                          size="sm"
                          className="min-w-10"
                        >
                          {page}
                        </Button>
                      ))}

                    {pagination.page < pagination.totalPages - 2 && (
                      <>
                        {pagination.page < pagination.totalPages - 3 && <span className="px-2 text-muted-foreground">...</span>}
                        <Button
                          onClick={() => goToPage(pagination.totalPages)}
                          disabled={searchLoading}
                          variant={pagination.page === pagination.totalPages ? 'default' : 'outline'}
                          size="sm"
                          className="min-w-10"
                        >
                          {pagination.totalPages}
                        </Button>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={() => goToPage(pagination.page + 1)}
                    disabled={!pagination.hasNext || searchLoading}
                    variant="outline"
                    size="sm"
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>

                  <span className="mt-2 text-sm text-muted-foreground sm:ml-4 sm:mt-0">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
