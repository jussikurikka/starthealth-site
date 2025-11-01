import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, FileCheck, FileSignature, Users, Building2, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import processDiagram from '@/assets/process-diagram.jpg';

const Process = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    {
      icon: Phone,
      step: 0,
      titleKey: 'process.step0.title',
      descKey: 'process.step0.desc',
      ctaKey: 'process.step0.cta',
      hasButton: true,
      onClick: scrollToContact,
    },
    {
      icon: FileCheck,
      step: 1,
      titleKey: 'process.step1.title',
      descKey: 'process.step1.desc',
      ctaKey: 'process.step1.cta',
      hasButton: true,
      onClick: scrollToContact,
    },
    {
      icon: FileSignature,
      step: 2,
      titleKey: 'process.step2.title',
      descKey: 'process.step2.desc',
    },
    {
      icon: Users,
      step: 3,
      titleKey: 'process.step3.title',
      descKey: 'process.step3.desc',
    },
    {
      icon: Building2,
      step: 4,
      titleKey: 'process.step4.title',
      descKey: 'process.step4.desc',
    },
    {
      icon: LineChart,
      step: 5,
      titleKey: 'process.step5.title',
      descKey: 'process.step5.desc',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">{t('process.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Visual Process Diagram */}
        <div className="mb-16 max-w-5xl mx-auto">
          <img 
            src={processDiagram} 
            alt="Process diagram visualization" 
            className="w-full rounded-2xl shadow-xl border-2 border-primary/20"
          />
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.step}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl hover:scale-105 group"
              >
                <div className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                  {step.step}
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">{t(step.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                  
                  {step.hasButton && (
                    <Button 
                      onClick={step.onClick}
                      className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
                    >
                      {t(step.ctaKey)}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
