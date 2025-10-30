'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property, getBaseUrl } from '@/lib/api';
import { formatPrice, truncateText } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Home, Star, Sparkles, ArrowRight } from 'lucide-react';

interface TopPropertyCardProps {
  property: Property;
  rank?: number;
}

export default function TopPropertyCard({ property, rank }: TopPropertyCardProps) {
  const {
    propref,
    displayaddress,
    rentmonth,
    TYPE,
    beds,
    singles,
    doubles,
    baths,
    area,
    rating,
    strapline,
    images,
  } = property;

  const totalBeds = parseInt(beds) + parseInt(singles) + parseInt(doubles);

  return (
    <Card className="group relative overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Rank Badge */}
      {rank && rank <= 3 && (
        <div className="absolute top-4 left-4 z-20">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm shadow-lg ${
            rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900' :
            rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900' :
            'bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900'
          }`}>
            <Sparkles className="w-4 h-4" />
            <span>#{rank}</span>
          </div>
        </div>
      )}

      {/* Featured Badge */}
      <div className="absolute top-4 right-4 z-20">
        <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-primary-foreground/20">
          Featured
        </Badge>
      </div>

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
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* Property Type & Rating on Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground font-semibold">
            {TYPE}
          </Badge>
          {rating && parseInt(rating) > 0 && (
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm">{parseInt(rating)}/5</span>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {displayaddress}
          </h3>
          
          {strapline && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {truncateText(strapline, 120)}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">{area}</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/50">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bed className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Bedrooms</span>
            <span className="font-bold text-sm">{totalBeds}</span>
          </div>
          
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bath className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Bathrooms</span>
            <span className="font-bold text-sm">{parseInt(baths)}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Type</span>
            <span className="font-bold text-sm line-clamp-1">{TYPE.split(' ')[0]}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between pt-2">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground font-medium">From</div>
            <div className="text-3xl font-bold text-primary">
              {formatPrice(parseFloat(rentmonth))}
            </div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
          
          <Button 
            asChild 
            size="lg"
            className="group/btn shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/properties/${propref}`} className="flex items-center gap-2">
              View Property
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </Card>
  );
}

