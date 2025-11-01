import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

const Team = () => {
  const { t } = useLanguage();

  const founders = [
    {
      name: 'Perustaja 1',
      title: t('team.founder'),
      description: 'Tiedot päivitetään pian',
    },
    {
      name: 'Perustaja 2',
      title: t('team.founder'),
      description: 'Tiedot päivitetään pian',
    },
    {
      name: 'Perustaja 3',
      title: t('team.founder'),
      description: 'Tiedot päivitetään pian',
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">{t('team.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-accent flex items-center justify-center">
                <User className="h-24 w-24 text-primary/30" />
              </div>
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold text-xl mb-1">{founder.name}</h3>
                <p className="text-primary text-sm font-semibold mb-2">{founder.title}</p>
                <p className="text-muted-foreground text-sm">{founder.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
