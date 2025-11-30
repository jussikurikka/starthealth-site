import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ServicePackages from '@/components/ServicePackages';
import PriceCalculator from '@/components/PriceCalculator';
import Process from '@/components/Process';
import Team from '@/components/Team';
import DataPrivacy from '@/components/DataPrivacy';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ServicePackages />
      <PriceCalculator />
      <Process />
      <Team />
      <DataPrivacy />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
