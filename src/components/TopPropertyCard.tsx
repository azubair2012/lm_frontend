'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property, getBaseUrl } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { shouldShowStatusBadge } from '@/lib/status-badge';

interface TopPropertyCardProps {
  property: Property;
}

export default function TopPropertyCard({ property }: TopPropertyCardProps) {
  const {
    propref,
    displayaddress,
    street,
    address3,
    postcode,
    images,
    STATUS,
  } = property;

  const addressLabel =
    street && postcode
      ? [street, address3, postcode].filter(Boolean).join(', ')
      : displayaddress;

  return (
    <Link href={`/properties/${propref}`} className="block h-full">
      <Card className="h-full rounded-none group relative overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:border-primary/50 bg-gradient-to-br from-background via-background to-primary/5 cursor-pointer">
        {/* Image Section */}
        <div className="relative md:aspect-[16/10] aspect-[16/12] overflow-hidden rounded-none">
          <Image
            src={images?.main?.large || images?.main?.medium || `${getBaseUrl()}/api/images/${property.photo1}` || '/placeholder-property.jpg'}
            alt={`Property at ${addressLabel} - featured listing`}
            fill
            unoptimized
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          {shouldShowStatusBadge(STATUS) && (
            <Badge
              variant="outline"
              className="pointer-events-none absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] truncate border-0 bg-[color-mix(in_srgb,var(--charcoal)_85%,transparent)] px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm sm:text-sm"
            >
              {String(STATUS).trim()}
            </Badge>
          )}
          {/* Property Title */}
          <div className="space-y-2 absolute z-20 bg-[color-mix(in_srgb,var(--charcoal)_70%,transparent)] backdrop-blur-sm p-2 w-full bottom-14 lg:bottom-8 left-0">
            <p className="font-medium text-white text-md leading-tight line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {addressLabel}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

