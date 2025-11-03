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
 
}

export default function SearchFilters({ 
  onSearch, 
  loading = false, 
  areas = [], 
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
    limit: 20,
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
      limit: 20,
    };
    console.log('🔄 SearchFilters: handleReset called with resetFilters:', resetFilters);
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const bedOptions = [1, 2, 3, 4, 5, 6];

  return (
    <Card className="mb-0">
      <CardHeader>
        <div className="lg:flex flex-col lg:items-start lg:justify-start items-center justify-between">
          <CardTitle className="text-[16px] lg:text-[24px] flex items-center gap-3 lg:gap-2">
            <Search className="w-5 h-5" />
            Search Properties
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden mt-4"
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
                 <div>               
                  <Input
                  placeholder="Search by address, area, or postcode..."
                  value={filters.q || ''}
                  onChange={(e) => handleInputChange('q', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            /></div>             
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
            <div className="flex gap-6">
            <Button onClick={handleSearch} disabled={loading} className='bg-[#383E42] text-white rounded-none hover:text-[#B87333]'>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
             
             <Button variant="outline" onClick={handleReset} className='hover:bg-[#9d3434] rounded-none border border-[#383E42] text-[#383E42] hover:text-white'>
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
