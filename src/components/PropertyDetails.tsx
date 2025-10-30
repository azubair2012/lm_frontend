'use client';

import { Property } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Star, 
  Calendar, 
  Home, 
  Ruler,
  Wifi,
  Shield,
  Car as CarIcon,
  TreePine
} from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const {
    address,
    price,
    rentMonth,
    type,
    beds,
    singles,
    doubles,
    baths,
    receps,
    furnished,
    heating,
    available,
    status,
    rating,
    age,
    description,
    strapline,
    postcode,
    area,
    url,
  } = property;

  const totalBeds = parseInt(beds || '0') + parseInt(singles || '0') + parseInt(doubles || '0');
  const bathsNum = parseInt(baths || '0');
  const recepsNum = parseInt(receps || '0');

  const features = [
    { icon: Bed, label: 'Bedrooms', value: `${totalBeds} bed${totalBeds !== 1 ? 's' : ''}` },
    { icon: Bath, label: 'Bathrooms', value: `${bathsNum} bath${bathsNum !== 1 ? 's' : ''}` },
    { icon: Car, label: 'Receptions', value: `${recepsNum} reception${recepsNum !== 1 ? 's' : ''}` },
    { icon: Home, label: 'Property Type', value: type },
    { icon: Ruler, label: 'Age', value: age || 'Not specified' },
    { icon: Star, label: 'Rating', value: `${rating}/5` },
  ];

  const amenities = [
    { icon: Wifi, label: 'Internet', available: true },
    { icon: Shield, label: 'Security', available: true },
    { icon: CarIcon, label: 'Parking', available: recepsNum > 0 },
    { icon: TreePine, label: 'Garden', available: Math.random() > 0.5 }, // Mock data
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{address}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{area}, {postcode}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {formatPrice(rentMonth)}
              <span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            {price && price !== '0' && (
              <div className="text-sm text-muted-foreground">
                Sale: {formatPrice(parseInt(price))}
              </div>
            )}
          </div>
        </div>

        {strapline && (
          <p className="text-lg text-muted-foreground">{strapline}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{type}</Badge>
          <Badge variant="outline">{status}</Badge>
          {furnished && <Badge variant="outline">Furnished: {furnished}</Badge>}
          {heating && <Badge variant="outline">Heating: {heating}</Badge>}
        </div>
      </div>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-2">
                <feature.icon className="w-6 h-6 mx-auto text-primary" />
                <div className="text-sm font-medium">{feature.value}</div>
                <div className="text-xs text-muted-foreground">{feature.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      {description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <amenity.icon className={`w-5 h-5 ${amenity.available ? 'text-green-600' : 'text-muted-foreground'}`} />
                <span className={amenity.available ? 'text-foreground' : 'text-muted-foreground'}>
                  {amenity.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      {available && (
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Available {available}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Interested in this property?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-center font-medium transition-colors"
            >
              View on Rentman
            </a>
            <button className="flex-1 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-md font-medium transition-colors">
              Contact Agent
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
