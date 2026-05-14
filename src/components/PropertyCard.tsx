'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property, getBaseUrl } from '@/lib/api';
import { formatPrice, truncateText } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { shouldShowStatusBadge } from '@/lib/status-badge';
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
    rentorbuy,
    STATUS,
  } = property;

  const lineOne = [street, address3].filter(Boolean).join(', ').trim();
  const lineTwo = [address4, postcode].filter(Boolean).join(', ').trim();
  const addressLabel = [lineOne, lineTwo].filter(Boolean).join(', ') || displayaddress;
  const totalBeds = parseInt(beds, 10);
  const parsedSalePrice = parseFloat(String(saleprice ?? '').replace(/[£,\s]/g, ''));
  const hasValidSalePrice = showSalePrice && Number.isFinite(parsedSalePrice) && parsedSalePrice >= 1000;
  // Rentman: rentorbuy 2 = for sale — never treat displayprice as monthly rent for sale stock
  const isSaleStock = String(rentorbuy ?? '').trim() === '2';
  const rentFallbackAllowed = !showSalePrice && !isSaleStock;
  const rentRaw = String(
    rentmonth ?? (rentFallbackAllowed ? property.displayprice ?? property.price ?? '' : '')
  )
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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images?.main?.medium || images?.main?.thumb || `${getBaseUrl()}/api/images/${property.photo1}` || '/placeholder-property.jpg'}
          alt={`Property at ${addressLabel} - ${totalBeds} bed`}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {shouldShowStatusBadge(STATUS) && (
          <Badge
            variant="outline"
            className="pointer-events-none absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] truncate border-0 bg-[color-mix(in_srgb,var(--charcoal)_85%,transparent)] px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm sm:text-sm"
          >
            {String(STATUS).trim()}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="font-semibold text-lg leading-tight">
            {lineOne && <span className="block line-clamp-2 break-words">{lineOne}</span>}
            {lineTwo && <span className="block line-clamp-2 break-words text-muted-foreground">{lineTwo}</span>}
            {!lineOne && !lineTwo && <span className="block line-clamp-2">{displayaddress}</span>}
          </div>
          
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
            <div className="flex items-center gap-1 text-sm text-[var(--copper)]">
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
            <div className="text-xl sm:text-2xl font-bold text-primary">
              {hasValidSalePrice
                ? formatPrice(parsedSalePrice)
                : hasValidRentPrice
                  ? formatPrice(parsedRent)
                  : 'Price on application'}
              {!hasValidSalePrice && hasValidRentPrice && (
                <span className="text-sm font-normal text-muted-foreground">pcm</span>
              )}
            </div>
           
          </div>
          <Link href={showSalePrice ? `/properties/${propref}?sale=1` : `/properties/${propref}`}>
            <Button 
              className="rounded-none bg-[var(--charcoal)] text-white hover:text-[var(--copper)] hover:bg-black/90"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
