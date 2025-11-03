import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Info, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ServicePackages = () => {
  const { t } = useLanguage();

  const packages = [
    {
      name: t('services.minimum.name'),
      price: '99€',
      period: t('services.minimum.period'),
      description: t('services.minimum.desc'),
      features: [
        t('services.minimum.feature1'),
        t('services.minimum.feature2'),
        t('services.minimum.feature3'),
      ],
      detailedFeatures: [
        'Työpaikkaselvitys ja riskiarviointi',
        'Vuosittainen toimintasuunnitelma',
        'Työterveyshuollon lakisääteinen seuranta',
        'Etäpalvelut videoyhteyden kautta',
        'Perusterveystarkastukset',
        'Työnantajan neuvonta',
      ],
      popular: false,
    },
    {
      name: t('services.basic.name'),
      price: '149€',
      period: t('services.basic.period'),
      description: t('services.basic.desc'),
      features: [
        t('services.basic.feature1'),
        t('services.basic.feature2'),
        t('services.basic.feature3'),
      ],
      detailedFeatures: [
        'Kaikki Minimum-paketin palvelut',
        'Sairaanhoidon konsultaatio (enintään 3 käyntiä/työntekijä/vuosi)',
        'Ennaltaehkäisevät terveystarkastukset',
        'Työkyvyn arviointi ja tuki',
        'Työhyvinvoinnin kehittäminen',
        'Varhaisen tuen malli',
        'Työfysioterapeutin konsultaatio',
      ],
      popular: true,
    },
    {
      name: t('services.support.name'),
      price: '199€',
      period: t('services.support.period'),
      description: t('services.support.desc'),
      features: [
        t('services.support.feature1'),
        t('services.support.feature2'),
        t('services.support.feature3'),
        t('services.support.feature4'),
      ],
      detailedFeatures: [
        'Kaikki Basic-paketin palvelut',
        'Rajoittamaton sairaanhoito',
        'Mielenterveyspalvelut (psykologi/psykiatri)',
        'Päihdepalvelut ja kuntoutus',
        'Erikoislääkärikonsultaatiot',
        'Fysioterapia ja kuntoutuspalvelut',
        'Yritykselle räätälöidyt lisäpalvelut',
        'Kiireellinen 24/7 neuvonta',
      ],
      popular: false,
    },
  ];

  return (
    <section id="services" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">{t('services.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative transition-all hover:shadow-lg ${
                pkg.popular ? 'border-2 border-primary shadow-md scale-105' : 'border border-border'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Suosituin
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Info className="mr-2 h-4 w-4" />
                      {t('services.cta.details')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{index === 0 ? 'Minimum - Tarkemmat tiedot' : `${pkg.name} - Yksityiskohtaiset tiedot`}</DialogTitle>
                      <DialogDescription>{pkg.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      {index === 0 ? (
                        <div className="bg-secondary/30 p-4 rounded-lg space-y-3">
                          <h4 className="font-semibold text-lg">Yleiskuvaus:</h4>
                          <p className="font-semibold">Lain edellyttämä työkykyä ylläpitävä ja ennaltaehkäisevä toiminta</p>
                          <p className="text-sm text-muted-foreground">Asiakaskohtainen tarkempi lopullinen palveluiden sisältö määritellään toimintasuunnitelmassa.</p>
                          <p>Oma nimetty työterveystiimi.</p>
                          <div className="pt-2">
                            <h5 className="font-semibold mb-2">Lakisääteiset työnantajan velvoitteet täytetään yhteistyössä:</h5>
                            <ul className="space-y-1 text-sm">
                              <li>• Työpaikkaselvitys</li>
                              <li>• Työterveysyhteistyön toimintasuunnitelma</li>
                              <li>• Terveystarkastukset työn terveydelle asettamien vaatimusten laajuudessa</li>
                              <li>• Päihdeohjelma ja varhaisen tuen mallien luominen</li>
                              <li>• Yksilön sekä yhteisön yleistasoinen ohjaus- ja neuvonta</li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Paketin sisältö:</h4>
                          <ul className="space-y-2">
                            {pkg.detailedFeatures.map((feature, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  className={pkg.popular ? 'w-full bg-gradient-primary' : 'w-full'}
                  variant={pkg.popular ? 'default' : 'secondary'}
                  onClick={() => window.open('https://forms.office.com/e/fVA08DHHjG', '_blank')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Hintalaskuri
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePackages;
