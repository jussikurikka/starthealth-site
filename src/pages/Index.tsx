import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SEOContent from '@/components/SEOContent';
import ServicePackages from '@/components/ServicePackages';
import PriceCalculator from '@/components/PriceCalculator';
import Process from '@/components/Process';
import AboutUs from '@/components/AboutUs';
import DataPrivacy from '@/components/DataPrivacy';
import ContactForm from '@/components/ContactForm';
import ClientReferences from '@/components/ClientReferences';
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
      <ClientReferences />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
