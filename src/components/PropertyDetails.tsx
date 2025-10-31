'use client';

import { useState } from 'react';
import { Property } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Star, 
  Calendar, 
  Home, 
  Ruler,
  
} from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  const {
    address,
    price,
    rentmonth,
    TYPE,
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
    DESCRIPTION,
    description,
    comments,
    thoughts,
    strapline,
    postcode,
    area,
    url,
  } = property;

  const totalBeds = parseInt(beds || '0') + parseInt(singles || '0') + parseInt(doubles || '0');
  const bathsNum = parseInt(baths || '0');
  const recepsNum = parseInt(receps || '0');

  // Get description value (check all possible description fields and ensure it's not empty)
  const descriptionText = 
    (DESCRIPTION && DESCRIPTION.trim()) || 
    (description && description.trim()) || 
    (comments && comments.trim()) || 
    (thoughts && thoughts.trim()) || 
    '';

  // Debug: Log description fields
  if (process.env.NODE_ENV === 'development') {
    console.log('Property Description Debug:', {
      DESCRIPTION,
      description,
      comments,
      thoughts,
      descriptionText,
      hasDESCRIPTION: !!(DESCRIPTION && DESCRIPTION.trim()),
      hasDescription: !!(description && description.trim()),
      hasComments: !!(comments && comments.trim()),
      hasThoughts: !!(thoughts && thoughts.trim()),
      hasDescriptionText: !!descriptionText,
      propertyKeys: Object.keys(property).filter(k => 
        k.toLowerCase().includes('desc') || 
        k.toLowerCase().includes('comment') || 
        k.toLowerCase().includes('thought')
      )
    });
  }

  const features = [
    { icon: Bed, label: 'Bedrooms', value: `${totalBeds} bed${totalBeds !== 1 ? 's' : ''}` },
    { icon: Bath, label: 'Bathrooms', value: `${bathsNum} bath${bathsNum !== 1 ? 's' : ''}` },
    { icon: Car, label: 'Receptions', value: `${recepsNum} reception${recepsNum !== 1 ? 's' : ''}` },
    { icon: Home, label: 'Property Type', value: type || TYPE || 'Not specified' },
    { icon: Ruler, label: 'Age', value: age || 'Not specified' },
    { icon: Star, label: 'Rating', value: rating ? `${rating}/5` : 'Not rated' },
  ];



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between pt-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{address}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{area}, {postcode}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {formatPrice(parseInt(rentmonth || '0'))}
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
          {furnished && <Badge variant="outline">Furnished: {furnished === 1 ? 'Yes' : furnished === 2 ? 'No' : furnished === 3 ? 'Part' : 'Unknown'}</Badge>}
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
      {descriptionText && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`prose max-w-none ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                <p className="whitespace-pre-wrap">{descriptionText}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="w-full sm:w-auto"
              >
                {isDescriptionExpanded ? 'Read Less' : 'Read More'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      

      {/* Availability */}
      {available && (
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-[#B87333]">
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
           
            <button className="flex-1 text-white hover:text-[#B87333] border border-input bg-[#282e32] hover:bg-accent hover:text-accent-foreground px-6 py-3 font-medium transition-colors">
              Contact Us
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
