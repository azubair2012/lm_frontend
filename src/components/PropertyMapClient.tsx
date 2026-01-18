'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinates } from '@/lib/geolocation';

interface PropertyMapClientProps {
  coordinates: Coordinates;
  address?: string;
}

// Fix for default marker icon issue in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

export default function PropertyMapClient({ coordinates, address }: PropertyMapClientProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([coordinates.latitude, coordinates.longitude], 15);
    }
  }, [coordinates]);

  return (
    <MapContainer
      center={[coordinates.latitude, coordinates.longitude]}
      zoom={15}
      style={{ height: '100%', width: '80%', margin: '0 auto', borderRadius: '16px' }}
      ref={mapRef}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.latitude, coordinates.longitude]}>
        {address && (
          <Popup>
            <div className="p-2">
              <p className="font-semibold text-sm">{address}</p>
              <p className="text-xs text-gray-500 mt-1">
                {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
              </p>
            </div>
          </Popup>
        )}
      </Marker>
    </MapContainer>
  );
}

