import { useLanguage } from '@/contexts/LanguageContext';
import processFlow from '@/assets/process-flow.png';
import { CheckCircle2, FileText, Handshake, Users, ClipboardCheck, TrendingUp } from 'lucide-react';

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: CheckCircle2,
      title: 'Palvelupaketin valinta',
      description: 'Valitse yrityksellesi sopiva paketti tai varaa maksuton konsultaatio',
    },
    {
      icon: FileText,
      title: 'Tarjouspyyntö',
      description: 'Täytä yksinkertainen lomake ja saat tarjouksen nopeasti',
    },
    {
      icon: Handshake,
      title: 'Sopimus',
      description: 'Allekirjoita sopimus sähköisesti kätevästi',
    },
    {
      icon: Users,
      title: 'Aloituspalaveri',
      description: 'Käymme läpi palvelun yhdessä ja vastaamme kysymyksiin',
    },
    {
      icon: ClipboardCheck,
      title: 'Työpaikkaselvitys',
      description: 'Kartoitamme yrityksesi tarpeet ja riskit',
    },
    {
      icon: TrendingUp,
      title: 'Seuranta & Kehitys',
      description: 'Päivitämme toimintasuunnitelmaa ja kehitämme palvelua',
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

        {/* Visual Process Flow */}
        <div className="mb-16 max-w-5xl mx-auto">
          <img 
            src={processFlow} 
            alt="Process flow" 
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Detailed Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-md group"
              >
                <div className="absolute -top-4 left-6 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-md">
                  {index + 1}
                </div>
                
                <div className="pt-6 space-y-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="font-bold text-xl">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
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
