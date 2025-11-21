import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Team = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">{t('team.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300">
            <div className="aspect-[16/9] bg-gradient-accent flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for team photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
              <div className="relative z-10 text-center space-y-4 p-8">
                <Users className="h-32 w-32 mx-auto text-primary/20" />
                <p className="text-muted-foreground text-lg font-medium">
                  Tiimikuva lisätään pian
                </p>
              </div>
            </div>
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-3">
                <h3 className="font-bold text-2xl">{t('team.founder')}t</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Perustajatiimimme on intohimoinen ja sitoutunut tarjoamaan parasta mahdollista työterveyshuoltoa startupeille.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;
