'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/api';
import { formatPrice, truncateText } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Car, Star, Calendar } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    propref,
    displayaddress,
    displayprice,
    rentmonth,
    TYPE,
    beds,
    singles,
    doubles,
    baths,
    receps,
    furnished,
    available,
    rating,
    strapline,
    images,
  } = property;

  const totalBeds = parseInt(beds) + parseInt(singles) + parseInt(doubles);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images?.main?.medium || images?.main?.thumb || `https://lm-backend-omega.vercel.app/api/images/${property.photo1}` || '/placeholder-property.jpg'}
          alt={displayaddress}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            {TYPE}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            <Star className="w-3 h-3 fill-current" />
            <span>{parseInt(rating)}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {displayaddress}
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

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{property.area}</span>
          </div>

          {available && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Calendar className="w-4 h-4" />
              <span>Available {available}</span>
            </div>
          )}

          {furnished && (
            <div className="text-sm">
              <span className="text-muted-foreground">Furnished: </span>
              <span className="font-medium">{furnished === 1 ? 'Yes' : furnished === 2 ? 'No' : furnished === 3 ? 'Part' : 'Unknown'}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(parseFloat(rentmonth))}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            {displayprice && displayprice !== '0' && (
              <div className="text-sm text-muted-foreground">
                Sale: {displayprice}
              </div>
            )}
          </div>
          <Button asChild>
            <Link href={`/properties/${propref}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
