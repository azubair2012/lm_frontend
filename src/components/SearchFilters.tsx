'use client';

import { useState } from 'react';
import { SearchParams } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
  areas?: string[];
  types?: string[];
  priceRange?: { min: number; max: number };
}

export default function SearchFilters({ 
  onSearch, 
  loading = false, 
  areas = [], 
  types = [], 
  priceRange = { min: 0, max: 10000 } 
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchParams>({
    q: '',
    area: '',
    type: '',
    beds: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    featured: false,
    page: 1,
    limit: 1000,
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (field: keyof SearchParams, value: string | number | boolean | undefined) => {
    console.log(`🔍 SearchFilters: Input changed - ${field}:`, value);
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    console.log('🔍 SearchFilters: handleSearch called with filters:', JSON.stringify(filters, null, 2));
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: SearchParams = {
      q: '',
      area: '',
      type: '',
      beds: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      featured: false,
      page: 1,
      limit: 1000,
    };
    console.log('🔄 SearchFilters: handleReset called with resetFilters:', resetFilters);
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const bedOptions = [1, 2, 3, 4, 5, 6];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Properties
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          

          {/* Filters */}
          <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {/* Search Input */}
                 <div >               
                  <Input
                  placeholder="Search by address, area, or postcode..."
                  value={filters.q || ''}
                  onChange={(e) => handleInputChange('q', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            /></div>
              
              
              {/* Area Filter */}
              <div>
            
                <select
                  value={filters.area || ''}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All Areas</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
                            

              {/* Bedrooms Filter */}
              <div>
                
                <select
                  value={filters.beds || ''}
                  onChange={(e) => handleInputChange('beds', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Number of Bedrooms</option>
                  {bedOptions.map((beds) => (
                    <option key={beds} value={beds}>
                      {beds} bed{beds !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
             
             <Button variant="outline" onClick={handleReset}>
               <X className="w-4 h-4 mr-2" />
               Reset
             </Button>
           </div>
             
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
