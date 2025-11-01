import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Wallet, ShieldCheck, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/30" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {t('hero.title')}
            <br />
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-glow group"
            >
              {t('hero.cta.contact')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open('https://forms.office.com/e/fVA08DHHjG', '_blank')}
            >
              <FileText className="mr-2 h-5 w-5" />
              {t('hero.cta.quote')}
            </Button>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-5xl mx-auto">
            <div className="group p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-glow hover:-translate-y-2 hover:bg-primary/5 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-primary">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground text-center">Edullinen hinta</h3>
              <div className="w-16 h-1 mx-auto mb-4 bg-gradient-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Enemmän arvoa, vähemmän kuluja
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-glow hover:-translate-y-2 hover:bg-primary/5 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-primary">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground text-center">Ei yllätyksiä</h3>
              <div className="w-16 h-1 mx-auto mb-4 bg-gradient-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Kiinteä hinta, selkeä budjetti. Kuukausihinta pitää kaiken läpinäkyvänä. Ei piilokuluja, ei epämiellyttäviä yllätyksiä – vain sujuvaa yhteistyötä.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-glow hover:-translate-y-2 hover:bg-primary/5 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-primary">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground text-center">Työnantaja keskiössä</h3>
              <div className="w-16 h-1 mx-auto mb-4 bg-gradient-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Helppoa ja tehokasta. Me hoidamme työterveyden, jotta sinä voit keskittyä tiimiisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
