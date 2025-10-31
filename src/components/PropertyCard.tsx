'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Property, getBaseUrl, rentmanApi } from '@/lib/api';
import { formatPrice, truncateText } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Bed, Bath, Car, Calendar, Loader2 } from 'lucide-react';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyGallery from '@/components/PropertyGallery';

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
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullProperty, setFullProperty] = useState<Property | null>(null);
  const [loadingProperty, setLoadingProperty] = useState(false);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    if (!fullProperty) {
      setLoadingProperty(true);
      try {
        const propertyData = await rentmanApi.getProperty(propref);
        setFullProperty(propertyData);
      } catch (error) {
        console.error('Error loading property:', error);
      } finally {
        setLoadingProperty(false);
      }
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images?.main?.medium || images?.main?.thumb || `${getBaseUrl()}/api/images/${property.photo1}` || '/placeholder-property.jpg'}
          alt={displayaddress}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
           
          </div>
          <Button 
            onClick={handleOpenModal}
            className="rounded-none bg-[#383E42] text-white hover:text-[#B87333] hover:bg-black/90"
          >
            View Details
          </Button>
        </div>
      </CardFooter>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {fullProperty?.displayaddress || property.displayaddress || 'Property Details'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Property details and gallery for {fullProperty?.displayaddress || property.displayaddress}
          </DialogDescription>
          {loadingProperty ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                <p className="text-muted-foreground">Loading property details...</p>
              </div>
            </div>
          ) : fullProperty ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gallery */}
              <div className="space-y-4">
                <PropertyGallery property={fullProperty} />
              </div>

              {/* Details */}
              <div className="space-y-6">
                <PropertyDetails property={fullProperty} />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Failed to load property details</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
