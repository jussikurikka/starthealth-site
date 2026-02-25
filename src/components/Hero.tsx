import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Wallet, ShieldCheck, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

const Hero = () => {
  const {
    t,
    language
  } = useLanguage();
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="home" className="relative min-h-screen flex items-center pt-32 md:pt-40 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-secondary/10" />
      </div>

      {/* Animated Background Elements - Logo Only */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large centered logo watermark with subtle animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.025]">
          <img 
            src={logo} 
            alt="" 
            className="w-full h-full object-contain blur-[2px] animate-[pulse_8s_ease-in-out_infinite]"
          />
        </div>
        
        {/* Floating logo elements - very subtle */}
        <div className="absolute top-20 right-20 w-56 h-56 opacity-[0.03] animate-float blur-[1px]">
          <img src={logo} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-24 left-24 w-72 h-72 opacity-[0.03] animate-float blur-[1px]" style={{ animationDelay: '3s' }}>
          <img src={logo} alt="" className="w-full h-full object-contain" />
        </div>
        
        {/* Subtle gradient orbs for depth */}
        <div className="absolute top-32 right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-32 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Micro logo accents */}
        <div className="absolute top-1/3 left-1/5 w-28 h-28 opacity-[0.015] animate-float blur-[1px]" style={{ animationDelay: '2s' }}>
          <img src={logo} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 opacity-[0.015] animate-float blur-[1px]" style={{ animationDelay: '5s' }}>
          <img src={logo} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {language === 'fi' 
              ? 'Työterveyshuolto pk-yrityksille ja 1–200 työntekijän yrityksille'
              : 'Occupational health for SMEs with 1–200 employees'}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === 'fi'
              ? 'Tarjoamme lakisääteistä työterveyshuoltoa matala-altisteisille toimialoille. Selkeä ja ennakoitava palvelumalli, jossa hoitoon pääsee nopeasti – ilman turhaa byrokratiaa.'
              : 'We provide statutory occupational health services for low-exposure industries. A clear, predictable service model with fast access to care – without unnecessary bureaucracy.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={scrollToContact} className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-glow group">
              {t('hero.cta.contact')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => window.open('https://forms.office.com/e/fVA08DHHjG', '_blank')}>
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
              <h3 className="font-bold text-xl mb-2 text-foreground text-center">
                {language === 'en' ? 'Affordable pricing' : 'Edullinen hinta'}
              </h3>
              <div className="w-16 h-1 mx-auto mb-4 bg-gradient-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {language === 'en' ? 'More value, fewer costs.' : 'Enemmän arvoa, vähemmän kuluja'}
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-glow hover:-translate-y-2 hover:bg-primary/5 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-primary">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground text-center">
                {language === 'en' ? 'Fixed monthly price' : 'Kiinteä hinta'}
              </h3>
              <div className="w-16 h-1 mx-auto mb-4 bg-gradient-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {language === 'en' 
                  ? 'Predictable costs and a clear budget. A monthly fee keeps everything transparent. No hidden fees, no unpleasant surprises.' 
                  : 'Ennustettava hinta, selkeä budjetti. Kuukausihinta pitää kaiken läpinäkyvänä. Ei piilokuluja, ei epämiellyttäviä yllätyksiä.'}
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-glow hover:-translate-y-2 hover:bg-primary/5 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-gradient-primary">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground text-center">
                {language === 'en' ? 'Employer-focused' : 'Työnantaja keskiössä'}
              </h3>
              <div className="w-16 h-1 mx-auto mb-4 bg-gradient-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {language === 'en' 
                  ? 'Simple and efficient. We take care of occupational health so you can focus on your team.' 
                  : 'Helppoa ja tehokasta. Me hoidamme työterveyden, jotta sinä voit keskittyä tiimiisi.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;