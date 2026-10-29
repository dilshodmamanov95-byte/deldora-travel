import { Hero } from '@/components/ui/Hero';
import { InteractiveDestinations } from '@/components/ui/InteractiveDestinations';
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel';
import { SearchFormWrapper } from '@/components/ui/SearchFormWrapper';
import { TourCard } from '@/components/ui/TourCard';
import { ContactWidget } from '@/components/ui/ContactWidget';
import { getInternationalTours, getDomesticTours } from '@/lib/cms-data';
import { TranslatedText } from '@/components/i18n/TranslatedText';

export default async function Home() {
  const internationalTours = await getInternationalTours();
  const domesticTours = await getDomesticTours();
  const popularInternational = internationalTours.filter((tour) => tour.isPopular);
  const popularDomestic = domesticTours.filter((tour) => tour.isPopular);

  const topRatedTours = [...popularInternational, ...popularDomestic]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className='min-h-screen relative'>
      <Hero />
      <section className='-mt-16 md:-mt-24 mb-16 px-4 relative z-30'>
        <div className='container mx-auto'>
          <SearchFormWrapper />
        </div>
      </section>
      <InteractiveDestinations />
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-12'><TranslatedText k='bestTours' /></h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {topRatedTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={{ ...tour, country: 'country' in tour ? tour.country : tour.region }}
                currency='USD'
              />
            ))}
          </div>
        </div>
      </section>
      <TestimonialsCarousel />
      <ContactWidget />


    </div>
  );
}
