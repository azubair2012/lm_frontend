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
    limit: 12,
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (field: keyof SearchParams, value: string | number | boolean | undefined) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
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
      limit: 12,
    };
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
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Search by address, area, or postcode..."
              value={filters.q || ''}
              onChange={(e) => handleInputChange('q', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Area Filter */}
              <div>
                <label className="text-sm font-medium mb-1 block">Area</label>
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

              {/* Property Type Filter */}
              <div>
                <label className="text-sm font-medium mb-1 block">Type</label>
                <select
                  value={filters.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                <select
                  value={filters.beds || ''}
                  onChange={(e) => handleInputChange('beds', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Any</option>
                  {bedOptions.map((beds) => (
                    <option key={beds} value={beds}>
                      {beds} bed{beds !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={filters.featured || false}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded border-input"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Only
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Min Price (per month)</label>
                <Input
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleInputChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Max Price (per month)</label>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search Properties'}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <X className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
