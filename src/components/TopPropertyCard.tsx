'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property, getBaseUrl } from '@/lib/api';
import { Card } from '@/components/ui/card';

interface TopPropertyCardProps {
  property: Property;
}

export default function TopPropertyCard({ property }: TopPropertyCardProps) {
  const {
    propref,
    displayaddress,
    images,
  } = property;

  return (
    <Link href={`/properties/${propref}`} className="block">
      <Card className="group relative overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 bg-gradient-to-br from-background via-background to-primary/5 cursor-pointer">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={images?.main?.large || images?.main?.medium || `${getBaseUrl()}/api/images/${property.photo1}` || '/placeholder-property.jpg'}
            alt={displayaddress}
            fill
            unoptimized
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          {/* Property Title */}
          <div className="space-y-2 absolute z-20">
            <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {displayaddress}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}

