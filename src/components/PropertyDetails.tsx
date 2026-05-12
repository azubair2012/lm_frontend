'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { formatTaxBand, formatEPCOrdinal } from '@/lib/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Bed,
  Bath,
  Sofa,
  Star,
  Calendar,
  Home,
  Ruler,
  FileText,
  Zap,
} from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
  showSalePrice?: boolean;
}

export default function PropertyDetails({ property, showSalePrice = false }: PropertyDetailsProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  const {
    address,
    price,
    saleprice,
    rentmonth,
    displayaddress,
    street,
    address3,
    address4,
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
    taxband,
    epcrating,
    DESCRIPTION,
    description,
    comments,
    thoughts,
    strapline,
    postcode,
    area,
    url,
  } = property;

  const totalBeds = parseInt(beds || '0');
  const bathsNum = parseInt(baths || '0');
  const recepsNum = parseInt(receps || '0');
  const parsedSalePrice = parseFloat(String(saleprice ?? price ?? '').trim());
  const hasValidSalePrice = Number.isFinite(parsedSalePrice) && parsedSalePrice >= 1000;
  const parsedRentPrice = parseFloat(String(rentmonth ?? '').trim());
  const hasValidRentPrice = Number.isFinite(parsedRentPrice) && parsedRentPrice > 0;
  const showSaleAsPrimary = showSalePrice && hasValidSalePrice;
  const primaryPrice = showSaleAsPrimary
    ? parsedSalePrice
    : hasValidRentPrice
      ? parsedRentPrice
      : hasValidSalePrice
        ? parsedSalePrice
        : 0;
  const showMonthlySuffix = !showSaleAsPrimary && hasValidRentPrice;
  const formattedAvailableDate = (() => {
    const raw = String(available ?? '').trim();
    if (!raw) return '';
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return raw;
    return parsed.toLocaleDateString('en-GB');
  })();
  const lineOne = [street, address3].filter(Boolean).join(', ').trim();
  const lineTwo = [address4, postcode].filter(Boolean).join(', ').trim();
  const fallbackAddress = displayaddress || [area, postcode].filter(Boolean).join(', ').trim();
  const epcValue = formatEPCOrdinal(epcrating);

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
    { icon: Sofa, label: 'Receptions', value: `${recepsNum} reception${recepsNum !== 1 ? 's' : ''}` },
    { icon: Home, label: 'Property Type', value: type || TYPE || 'Not specified' },
    { icon: Zap, label: 'EPC Rating', value: epcValue },
    { icon: FileText, label: 'Council Tax', value: taxband ? formatTaxBand(taxband) : 'Not specified' },
    ...(age ? [{ icon: Ruler, label: 'Age', value: age }] : []),
  ];



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between pt-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{address}</h1>
            <div className="flex items-start gap-2 font-bold text-muted-foreground">
              {false && <MapPin className="mt-0.5 w-4 h-4" />}
              <span>
                {lineOne && <span className="block text-3xl">{lineOne}</span>}
                {lineTwo && <span className="block text-3xl">{lineTwo}</span>}
                {!lineOne && !lineTwo && <span className="block">{fallbackAddress}</span>}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {formatPrice(primaryPrice)}
              {showMonthlySuffix && (
                <span className="text-lg font-bold text-muted-foreground">pcm</span>
              )}
            </div>
            
          </div>
        </div>

        {strapline && (
          <p className="text-lg text-muted-foreground">{strapline}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {type && <Badge variant="secondary">{type}</Badge>}
          {status && <Badge variant="outline">{status}</Badge>}
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
                <feature.icon className="w-6 h-6 mx-auto text-primary shrink-0" />
                <div className="text-sm font-medium leading-snug min-h-[2.5rem] flex items-center justify-center px-0.5">
                  {feature.value}
                </div>
                <div className="text-xs text-muted-foreground leading-snug">{feature.label}</div>
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
      {available && !showSalePrice && (
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-[#B87333]">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Available {formattedAvailableDate}</span>
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
           
            <Link href="/contact" className="flex-1 text-center text-white hover:text-[#B87333] border border-input bg-[#282e32] hover:bg-accent hover:text-accent-foreground px-6 py-3 font-medium transition-colors">
              Contact Us
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
