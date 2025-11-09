'use client';

import { useState, useEffect } from 'react';
import { Property, SearchParams } from '@/lib/api';
import { rentmanApi } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Home, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
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

  // Load initial data
  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const searchResponse = await rentmanApi.searchProperties({ page: 1, limit: 12 });
      
      console.log('🏠 Initial search response:', searchResponse);
      console.log('🏠 Properties count:', searchResponse.properties?.length);
      console.log('📄 Initial pagination:', {
        page: searchResponse.pagination.page,
        totalPages: searchResponse.pagination.totalPages,
        hasNext: searchResponse.pagination.hasNext,
        total: searchResponse.pagination.total
      });
      
      setProperties(searchResponse.properties);
      
      // Cache the initial page
      const cacheKey = JSON.stringify({ ...searchParams, page: 1 });
      setPageCache(new Map([[cacheKey, searchResponse.properties]]));
      
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
      
      // Clear page cache on new search
      setPageCache(new Map());
      
      // Always start at page 1 for new search, ensure limit is always 12
      const searchParamsWithLimit = { ...params, page: 1, limit: 12 };
      setSearchParams(searchParamsWithLimit);
      
      const response = await rentmanApi.searchProperties(searchParamsWithLimit);
      console.log('📊 Search response:', JSON.stringify(response, null, 2));
      console.log('🏠 Properties:', response?.properties);
      console.log('📄 Pagination:', response?.pagination);
      
      if (response && response.properties && response.pagination) {
        console.log('✅ Valid search response, setting properties:', response.properties.length);
        setProperties(response.properties);
        
        // Cache the first page of search results
        const cacheKey = JSON.stringify(searchParamsWithLimit);
        setPageCache(new Map([[cacheKey, response.properties]]));
        
        setPagination({
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
          hasNext: response.pagination.hasNext,
          hasPrev: response.pagination.hasPrev,
        });
        
        // Scroll to top on new search
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const goToPage = async (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > pagination.totalPages || searchLoading) return;
    
    // Create cache key based on search params + page number
    const cacheKey = JSON.stringify({ ...searchParams, page: pageNumber });
    
    // Check if page is already cached
    if (pageCache.has(cacheKey)) {
      console.log(`✅ Loading page ${pageNumber} from cache`);
      setProperties(pageCache.get(cacheKey)!);
      setPagination({
        page: pageNumber,
        totalPages: pagination.totalPages,
        hasNext: pageNumber < pagination.totalPages,
        hasPrev: pageNumber > 1,
      });
      setSearchParams(prev => ({ ...prev, page: pageNumber }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    try {
      setSearchLoading(true);
      console.log(`📄 Fetching page ${pageNumber} from API`);
      
      const response = await rentmanApi.searchProperties({
        ...searchParams,
        page: pageNumber,
        limit: 12,
      });
      
      console.log('📄 Page response:', {
        page: pageNumber,
        properties: response.properties.length,
        pagination: response.pagination
      });
      
      // Cache the page data
      setPageCache(prev => new Map(prev).set(cacheKey, response.properties));
      
      // Replace properties instead of appending
      setProperties(response.properties);
      setPagination({
        page: response.pagination.page,
        totalPages: response.pagination.totalPages,
        hasNext: response.pagination.hasNext,
        hasPrev: response.pagination.hasPrev,
      });
      setSearchParams(prev => ({ ...prev, page: pageNumber }));
      
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error loading page:', error);
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
      <section className="py-4">
        <div className="container mx-auto px-4">
          <SearchFilters
            onSearch={handleSearch}
            loading={searchLoading}
            areas={filters.areas}
          />
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
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
                  <PropertyCard key={property.propref} property={property} />
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-8">
                  {/* Previous Button */}
                  <Button
                    onClick={() => goToPage(pagination.page - 1)}
                    disabled={!pagination.hasPrev || searchLoading}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {/* First page */}
                    {pagination.page > 3 && (
                      <>
                        <Button
                          onClick={() => goToPage(1)}
                          disabled={searchLoading}
                          variant={pagination.page === 1 ? "default" : "outline"}
                          size="sm"
                          className="min-w-10"
                        >
                          1
                        </Button>
                        {pagination.page > 4 && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                      </>
                    )}
                    
                    {/* Page range around current page */}
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show pages within 2 of current page
                        return page >= pagination.page - 2 && page <= pagination.page + 2;
                      })
                      .map(page => (
                        <Button
                          key={page}
                          onClick={() => goToPage(page)}
                          disabled={searchLoading}
                          variant={pagination.page === page ? "default" : "outline"}
                          size="sm"
                          className="min-w-10"
                        >
                          {page}
                        </Button>
                      ))}
                    
                    {/* Last page */}
                    {pagination.page < pagination.totalPages - 2 && (
                      <>
                        {pagination.page < pagination.totalPages - 3 && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          onClick={() => goToPage(pagination.totalPages)}
                          disabled={searchLoading}
                          variant={pagination.page === pagination.totalPages ? "default" : "outline"}
                          size="sm"
                          className="min-w-10"
                        >
                          {pagination.totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {/* Next Button */}
                  <Button
                    onClick={() => goToPage(pagination.page + 1)}
                    disabled={!pagination.hasNext || searchLoading}
                    variant="outline"
                    size="sm"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  
                  {/* Page info */}
                  <span className="text-sm text-muted-foreground ml-0 sm:ml-4 mt-2 sm:mt-0">
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