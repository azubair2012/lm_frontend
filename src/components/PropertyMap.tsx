'use client';

import dynamic from 'next/dynamic';
import { Property } from '@/lib/api';
import { parseGeolocation } from '@/lib/geolocation';

// Dynamically import the map component to avoid SSR issues with Leaflet
const PropertyMapClient = dynamic(() => import('./PropertyMapClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface PropertyMapProps {
  property: Property;
  height?: string;
}

export default function PropertyMap({ property, height = '400px' }: PropertyMapProps) {
  // Debug logging - always log to help diagnose
  console.log('🔍 PropertyMap Debug:', {
    propref: property.propref,
    geolocation: property.geolocation,
    geolocationType: typeof property.geolocation,
    geolocationLength: property.geolocation?.length,
    hasGeolocation: !!property.geolocation,
    geolocationValue: JSON.stringify(property.geolocation),
    allPropertyKeys: Object.keys(property),
  });

  const coordinates = parseGeolocation(property.geolocation);

  console.log('📍 Parsed coordinates:', coordinates);

  if (!coordinates) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200"
        style={{ height }}
      >
        <div className="text-center p-6">
          <p className="text-gray-600 mb-2">Location data not available for this property</p>
          {property.displayaddress && (
            <p className="text-sm text-gray-500">Address: {property.displayaddress}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height }} className="rounded-2xl overflow-hidden">
      <PropertyMapClient coordinates={coordinates} address={property.displayaddress} />
    </div>
  );
}

