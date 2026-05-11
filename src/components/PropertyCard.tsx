'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property, getBaseUrl } from '@/lib/api';
import { formatPrice, truncateText } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Car, Calendar } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  showSalePrice?: boolean;
}

export default function PropertyCard({ property, showSalePrice = false }: PropertyCardProps) {
  const {
    propref,
    displayaddress,
    street,
    address3,
    address4,
    postcode,
    rentmonth,
    beds,
    singles,
    doubles,
    baths,
    receps,
    furnished,
    available,
    strapline,
    images,
    saleprice,
  } = property;

  const lineOne = [street, address3].filter(Boolean).join(', ').trim();
  const lineTwo = [address4, postcode].filter(Boolean).join(', ').trim();
  const addressLabel = [lineOne, lineTwo].filter(Boolean).join(', ') || displayaddress;
  const totalBeds = parseInt(beds, 10);
  const parsedSalePrice = parseFloat(String(saleprice ?? '').replace(/[£,\s]/g, ''));
  const hasValidSalePrice = showSalePrice && Number.isFinite(parsedSalePrice) && parsedSalePrice >= 1000;
  const rentRaw = String(rentmonth ?? property.displayprice ?? property.price ?? '')
    .replace(/[£,\s]/g, '')
    .trim();
  const parsedRent = parseFloat(rentRaw);
  const hasValidRentPrice = Number.isFinite(parsedRent) && parsedRent > 0;
  const formattedAvailableDate = (() => {
    const raw = String(available ?? '').trim();
    if (!raw) return '';
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return '';
    const y = parsed.getFullYear();
    // Rentman / bad data often uses distant-past sentinels
    if (y < 1900 || y > 2100) return '';
    return parsed.toLocaleDateString('en-GB');
  })();
  const furnishedCode = Number(furnished);
  const furnishedLabel =
    furnishedCode === 1
      ? 'Yes'
      : furnishedCode === 2
        ? 'No'
        : furnishedCode === 3
          ? 'Part'
          : null;
  const normalizedArea = String(property.area ?? '')
    .replace(/[\u00A0\u2007\u202F\u200B-\u200D\uFEFF]/g, ' ')
    .trim();
  const displayArea = normalizedArea
    .split(/\s+/)
    .filter((token) => token.replace(/[^\d]/g, '') !== '0')
    .join(' ')
    .trim();
  const hasVisibleArea = displayArea !== '';

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images?.main?.medium || images?.main?.thumb || `${getBaseUrl()}/api/images/${property.photo1}` || '/placeholder-property.jpg'}
          alt={addressLabel}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight">
            {lineOne && <span className="block line-clamp-1">{lineOne}</span>}
            {lineTwo && <span className="block line-clamp-1">{lineTwo}</span>}
            {!lineOne && !lineTwo && <span className="block line-clamp-2">{displayaddress}</span>}
          </h3>
          
          {strapline && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {truncateText(strapline, 100)}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{totalBeds} bed{totalBeds !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{parseInt(baths)} bath{parseInt(baths) !== 1 ? 's' : ''}</span>
            </div>
            {parseInt(receps) > 0 && (
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4" />
                <span>{parseInt(receps)} reception{parseInt(receps) !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {hasVisibleArea && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{displayArea}</span>
            </div>
          )}

          {!showSalePrice && formattedAvailableDate && (
            <div className="flex items-center gap-1 text-sm text-[#B87333]">
              <Calendar className="w-4 h-4" />
              <span>Available {formattedAvailableDate}</span>
            </div>
          )}

          {!showSalePrice && furnishedLabel != null && (
            <div className="text-sm">
              <span className="text-muted-foreground">Furnished: </span>
              <span className="font-medium">{furnishedLabel}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {hasValidSalePrice
                ? formatPrice(parsedSalePrice)
                : hasValidRentPrice
                  ? formatPrice(parsedRent)
                  : 'Price on application'}
              {!hasValidSalePrice && hasValidRentPrice && (
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              )}
            </div>
           
          </div>
          <Link href={showSalePrice ? `/properties/${propref}?sale=1` : `/properties/${propref}`}>
            <Button 
              className="rounded-none bg-[#383E42] text-white hover:text-[#B87333] hover:bg-black/90"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
