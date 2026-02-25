import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SEOContent from '@/components/SEOContent';
import ServicePackages from '@/components/ServicePackages';
import PriceCalculator from '@/components/PriceCalculator';
import Process from '@/components/Process';
import AboutUs from '@/components/AboutUs';
import DataPrivacy from '@/components/DataPrivacy';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <SEOContent />
      <ServicePackages />
      <PriceCalculator />
      <Process />
      <AboutUs />
      <DataPrivacy />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
