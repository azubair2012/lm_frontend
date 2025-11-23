import ImageSlideShow from '@/components/ImageSlideShow'; 
import HomeContactPreview from '@/components/HomeContactPreview';

export default function ValuationPage() {
  return (
    <main className="min-h-screen bg-background">
      <ImageSlideShow />
      <section className="mx-auto">
        

        
        <div className="mt-8 md:mt-4">
        <HomeContactPreview header={{firstLine:"VALUATION", secondLine:"Do it with us"}} />
        </div>
      </section>
    </main>
  );
}
