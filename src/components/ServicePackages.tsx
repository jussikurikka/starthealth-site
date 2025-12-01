import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Info, Calculator, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
  const { t, language } = useLanguage();

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
          {packages.map((pkg, index) => {
            const isComingSoon = index === 2; // Support package
            
            return (
              <Card 
                key={index} 
                className={`relative transition-all ${
                  isComingSoon 
                    ? 'opacity-60 border border-border' 
                    : pkg.popular 
                      ? 'border-2 border-primary shadow-md scale-105 hover:shadow-lg' 
                      : 'border border-border hover:shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Suosituin
                    </span>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  
                  {isComingSoon && (
                    <div className="flex flex-col items-center space-y-3 pt-4">
                      <Lock 
                        className="h-12 w-12 text-muted-foreground" 
                        aria-label="Paketti ei ole vielä käytettävissä"
                      />
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/10 text-primary px-4 py-1.5 text-sm"
                        aria-label="Support-paketti tulee saataville keväällä 2026"
                      >
                        Tulossa keväällä 2026
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-2 pb-4">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        isComingSoon ? 'text-muted-foreground/50' : 'text-primary'
                      }`} />
                      <span className={`text-sm ${
                        isComingSoon ? 'text-muted-foreground/70' : ''
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter className="pt-4">
                  {isComingSoon ? (
                    <Button 
                      variant="outline" 
                      className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                      disabled
                      aria-label="Paketti ei ole vielä saatavilla"
                    >
                      Ei vielä saatavilla
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className={pkg.popular ? 'w-full border-primary/30' : 'w-full'}
                        >
                          <Info className="mr-2 h-4 w-4" />
                          {t('services.cta.details')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{pkg.name}</DialogTitle>
                          <DialogDescription className="text-base">
                            {pkg.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="mt-6">
                        {index === 0 ? (
                            <div className="space-y-6">
                              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                                <h4 className="font-semibold text-xl mb-4 text-primary">{language === 'en' ? 'Description' : 'Kuvaus'}</h4>
                                <p className="text-base leading-relaxed">
                                  {language === 'en' 
                                    ? 'Statutory occupational health care for startups' 
                                    : 'Lakisääteinen työterveyshuolto startupeille'}
                                </p>
                              </div>
                              <div className="bg-secondary/30 p-6 rounded-xl">
                                <p className="text-base leading-relaxed mb-4">
                                  {language === 'en' 
                                    ? 'The statutory basic package includes the following components:' 
                                    : 'Lakisääteinen peruspaketti pitää sisällään seuraavat osiot'}
                                </p>
                                <ul className="space-y-3">
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">
                                      {language === 'en' 
                                        ? 'Remote workplace visit, workplace assessment, and risk evaluation' 
                                        : 'Työpaikkakäynti (etänä), työpaikkaselvitys ja riskiarviointi'}
                                    </span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">
                                      {language === 'en' 
                                        ? 'Occupational health care action plan (documentation required under the Occupational Health Care Act)' 
                                        : 'Työterveyshuollon toimintasuunnitelma (työterveyshuoltolain mukainen dokumentaatio)'}
                                    </span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">
                                      {language === 'en' 
                                        ? 'Statutory follow-up and monitoring' 
                                        : 'Lakisääteinen seuranta'}
                                    </span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">
                                      {language === 'en' 
                                        ? 'Ask-for-help service (free remote consultation via chat on topics such as work ability, ergonomics, and wellbeing)' 
                                        : 'Apua kysymällä (maksutta etäneuvontaa chatin välityksellä esim. työkykyyn, työergonomiaan ja työhyvinvointi-asioihin liittyen)'}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ) : index === 1 ? (
                            <div className="space-y-6">
                              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                                <h4 className="font-semibold text-xl mb-4 text-primary">Kuvaus</h4>
                                <p className="text-base leading-relaxed">Etäpalvelut startup-yrityksen työntekijöille</p>
                              </div>
                              <div className="bg-secondary/30 p-6 rounded-xl">
                                <p className="text-base leading-relaxed mb-4">Sisältää kaikki Minimum paketin ominaisuudet ja lisäksi seuraavat osiot</p>
                                <ul className="space-y-3">
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">Etävastaanotto työterveyslääkärillä video-, chat- tai puheyhteydellä. Ensisijaisesti puhelin- tai chatyhteydellä nopeamman ajan varausaikojen turvaamiseksi, mutta tarvittaessa lääkäri kutsuu keskustelun videoyhteyden kautta arvioitavaksi. Etävastaanotolle pääsy soveltuvilta osin ja lääkärin arvion mukaan.</span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">Fysioterapeutin antama opastus ja ohjaus etänä video-, chat- tai puheyhteydellä. Ohjaus tänne StartHealthin työterveyslääkärin arvion perusteella.</span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">Lyhyiden sairauslomien kirjoittaminen, mikäli etäyhteyksin toteutettu arvio terveydenhuollon ammattilaisen arvion mukaan on tähän riittävä.</span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">Reseptien uusinta soveltuvilta osin lääkärin arvion mukaan (etänä ei esimerkiksi antibiootteja, eikä PKV-lääkkeitä)</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                                <h4 className="font-semibold text-xl mb-4 text-primary">Kuvaus</h4>
                                <p className="text-base leading-relaxed">Työterveyspainotteinen paikan päällä toteutettava sairaanhoito + Basic-paketti</p>
                              </div>
                              <div className="bg-secondary/30 p-6 rounded-xl">
                                <p className="text-base leading-relaxed mb-4">Sisältää kaikki Minimum ja Basic pakettien ominaisuudet ja lisäksi seuraavat osiot</p>
                                <ul className="space-y-3">
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">Paikan päällä toteutettava lääkärin työterveyspainotteinen sairasvastaanotto soveltuvilta osin. Ohjaus paikan päälle arvioon tapahtuu etä-arvion pohjalta.</span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">Työterveyslääkärin määräämät ja lopulliseen sopimukseen rajatut diagnostiset laboratorio- ja kuvantamistutkimukset.</span>
                                  </li>
                                  <li className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">Työfysioterapeutin vastaanotto paikan päällä vastaanottopisteessä. Ohjaus paikan päälle arvioon tapahtuu StartHealthin lääkärin tai fysioterapeutin etä-arvion pohjalta.</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicePackages;
