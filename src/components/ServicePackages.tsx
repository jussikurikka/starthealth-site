import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogBlock {
  description: string;
  listTitle: string;
  listItems: string[];
  pricingTitle?: string;
  pricingItems?: string[];
}

const ServicePackages = () => {
  const { t, language } = useLanguage();

  const packages: Array<{
    name: string;
    description: string;
    features: string[];
    popular?: boolean;
    badge?: string;
    priceNote?: string;
    quoteUrl?: string;
    dialog: { fi: DialogBlock; en: DialogBlock };
  }> = [
    {
      name: t('services.minimum.name'),
      description: t('services.minimum.desc'),
      features: [
        t('services.minimum.feature1'),
        t('services.minimum.feature2'),
        t('services.minimum.feature3'),
      ],
      dialog: {
        fi: {
          description: 'Lakisääteinen työterveyshuolto startupeille',
          listTitle: 'Lakisääteinen peruspaketti pitää sisällään seuraavat osiot',
          listItems: [
            'Työpaikkakäynti (etänä), työpaikkaselvitys ja riskiarviointi',
            'Työterveyshuollon toimintasuunnitelma (työterveyshuoltolain mukainen dokumentaatio)',
            'Lakisääteinen seuranta',
            'Apua kysymällä (maksutta etäneuvontaa chatin välityksellä esim. työkykyyn, työergonomiaan ja työhyvinvointi-asioihin liittyen)',
          ],
        },
        en: {
          description: 'Statutory occupational health care for startups',
          listTitle: 'The statutory basic package includes the following components:',
          listItems: [
            'Remote workplace visit, workplace assessment, and risk evaluation',
            'Occupational health care action plan (documentation required under the Occupational Health Care Act)',
            'Statutory follow-up and monitoring',
            'Ask-for-help service (free remote consultation via chat on topics such as work ability, ergonomics, and wellbeing)',
          ],
        },
      },
    },
    {
      name: t('services.basic.name'),
      description: t('services.basic.desc'),
      features: [
        t('services.basic.feature1'),
        t('services.basic.feature2'),
        t('services.basic.feature3'),
      ],
      popular: true,
      dialog: {
        fi: {
          description: 'Etäpalvelut startup-yrityksen työntekijöille',
          listTitle: 'Sisältää kaikki Minimum paketin ominaisuudet ja lisäksi seuraavat osiot',
          listItems: [
            'Etävastaanotto työterveyslääkärillä video-, chat- tai puheyhteydellä. Ensisijaisesti puhelin- tai chatyhteydellä nopeamman ajan varausaikojen turvaamiseksi, mutta tarvittaessa lääkäri kutsuu keskustelun videoyhteyden kautta arvioitavaksi. Etävastaanotolle pääsy soveltuvilta osin ja lääkärin arvion mukaan.',
            'Fysioterapeutin antama opastus ja ohjaus etänä video-, chat- tai puheyhteydellä. Ohjaus tänne StartHealthin työterveyslääkärin arvion perusteella.',
            'Lyhyiden sairauslomien kirjoittaminen, mikäli etäyhteyksin toteutettu arvio terveydenhuollon ammattilaisen arvion mukaan on tähän riittävä.',
            'Reseptien uusinta soveltuvilta osin lääkärin arvion mukaan (etänä ei esimerkiksi antibiootteja, eikä PKV-lääkkeitä)',
          ],
        },
        en: {
          description: 'Remote occupational health services for startup employees',
          listTitle: 'Includes all features of the Minimum package, plus the following:',
          listItems: [
            "Remote consultations with an occupational health physician via video, chat, or phone. Primarily conducted by phone or chat to ensure faster appointment availability, but the physician may switch to video if needed for assessment. Access to remote consultations is provided when clinically appropriate and based on the physician's judgment.",
            'Remote physiotherapy guidance and counselling via video, chat, or phone. Access is granted based on the assessment of a StartHealth occupational health physician.',
            'Issuing short-term sick leave certificates when a remote assessment is considered sufficient by the healthcare professional.',
            "Renewal of prescriptions when clinically appropriate and based on the physician's assessment. (Note: antibiotics and controlled substances cannot be prescribed remotely.)",
          ],
        },
      },
    },
    {
      name: t('services.basicOmply.name'),
      description: t('services.basicOmply.desc'),
      features: [
        t('services.basicOmply.feature1'),
        t('services.basicOmply.feature2'),
        t('services.basicOmply.feature3'),
      ],
      badge: t('services.basicOmply.badge'),
      priceNote: t('services.basicOmply.priceNote'),
      quoteUrl: 'https://forms.office.com/pages/responsepage.aspx?id=5hS_ti5-BEioUKW74_DcrBvA5_vGcapNhrO5ol0XFKJUOVFRMDhWUEZOUEo1MzJJS1Y5RVdTTUYySi4u&route=shorturl',
      dialog: {
        fi: {
          description: 'Basic-paketin etäpalvelut täydennettynä Omply Health Oy:n etätutkimuslaitteilla. Lääkäri ei ainoastaan keskustele etänä, vaan voi myös tutkia työntekijän.',
          listTitle: 'Sisältää kaikki Basic-paketin ominaisuudet ja lisäksi seuraavat osiot',
          listItems: [
            'Jokaiselle työntekijälle omat S-paketin laitteet: kuumemittari, happisaturaatiomittari ja verenpainemittari.',
            'Yritys hankkii lisäksi tarvitsemansa määrän muita etädiagnostiikkavälineitä, esimerkiksi digitaalisen stetoskoopin ja otoskoopin. Laitteet voi sijoittaa työpaikalle tai työntekijöiden koteihin.',
            'Yritys omistaa laitteet, eikä niitä tarvitse palauttaa sopimuksen päättyessä.',
            'StartHealthin työterveyslääkäri käyttää laitteita etävastaanotolla: sydän- ja keuhkoäänten kuuntelu, korvien ja ihon tutkiminen sekä lämmön, sykkeen, happisaturaation ja verenpaineen mittaus.',
            'Mittaustieto välittyy suorana videoyhteydellä lääkärille. Lääkäri kirjaa havainnot potilastietojärjestelmään.',
            'Terveydenhuollon palvelut, lääkärin arviot ja hoito sisältyvät kuukausimaksuun Basic-paketin tapaan.',
            '\n',
          ],
          pricingTitle: 'Hinnoittelu',
          pricingItems: [
            'Aloitusmaksu 499 €.',
            'Laitemaksut määräytyvät valitun laitepaketin laajuuden mukaan, per työntekijä.',
            'Kuukausimaksu noin 47 €/hlö/kk. Se sisältää sekä StartHealthin että Omplyn osuuden.',
            'Tämä paketti ei ole hintalaskurissa. Pyydä tarjous, niin laskemme laitepaketin ja Kela-korvausosuuden yrityksellesi.',
          ],
        },
        en: {
          description: "The Basic package's remote services combined with remote examination devices from Omply Health Oy. The doctor can not only talk to the employee remotely, but also examine them.",
          listTitle: 'Includes all features of the Basic package, plus the following:',
          listItems: [
            'Every employee receives their own S-package devices: thermometer, pulse oximeter and blood pressure monitor.',
            'The company also purchases as many additional remote diagnostic devices as needed, for example a digital stethoscope and otoscope. These can be kept at the workplace or in employees\' homes.',
            'The company owns the devices and does not need to return them when the contract ends.',
            'A StartHealth occupational health physician uses the devices during remote consultations: listening to heart and lung sounds, examining ears and skin, and measuring temperature, pulse, oxygen saturation and blood pressure.',
            'Measurement data is streamed live to the doctor during the consultation. The doctor records the findings in the patient information system.',
            'Healthcare services, physician assessments and treatment are included in the monthly fee, as in the Basic package.',
            'Laboratory tests, imaging, vaccinations and workplace assessments still require an on-site visit.',
          ],
          pricingTitle: 'Pricing',
          pricingItems: [
            'Onboarding fee €499.',
            'Device fees depend on the scope of the selected device package, per employee.',
            'Monthly fee approximately €47 per person, including both the StartHealth and Omply components.',
            'This package is not included in the price calculator. Request a quote and we will calculate the device package and Kela reimbursement for your company.',
          ],
        },
      },
    },
    {
      name: t('services.support.name'),
      description: t('services.support.desc'),
      features: [
        t('services.support.feature1'),
        t('services.support.feature2'),
        t('services.support.feature3'),
        t('services.support.feature4'),
      ],
      dialog: {
        fi: {
          description: 'Työterveyspainotteinen paikan päällä toteutettava sairaanhoito + Basic-paketti',
          listTitle: 'Sisältää kaikki Minimum ja Basic pakettien ominaisuudet ja lisäksi seuraavat osiot',
          listItems: [
            'Paikan päällä toteutettava lääkärin työterveyspainotteinen sairasvastaanotto soveltuvilta osin. Ohjaus paikan päälle arvioon tapahtuu etä-arvion pohjalta.',
            'Työterveyslääkärin määräämät ja lopulliseen sopimukseen rajatut diagnostiset laboratorio- ja kuvantamistutkimukset.',
            'Työterveyspsykologin ja -fysioterapeutin vastaanotto paikan päällä vastaanottopisteessä. Ohjaus paikan päälle arvioon tapahtuu StartHealthin lääkärin tai hoitajan etä-arvion pohjalta.',
          ],
        },
        en: {
          description: 'On-site occupational-health-focused medical care + Basic package',
          listTitle: 'Includes all features of the Minimum and Basic packages, plus the following:',
          listItems: [
            'On-site occupational-health-focused physician consultations where appropriate. Referral to on-site assessment is based on a prior remote evaluation.',
            'Diagnostic laboratory and imaging studies ordered by the occupational health physician, as defined in the final contract.',
            'Occupational health psychologist and physiotherapist appointments on-site at the clinic. Referral is based on a remote assessment by a StartHealth physician or nurse.',
          ],
        },
      },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => {
            const dialogContent = language === 'en' ? pkg.dialog.en : pkg.dialog.fi;
            return (
              <Card 
                key={index} 
                className={`relative transition-all ${
                  pkg.popular 
                    ? 'border-2 border-primary shadow-md hover:shadow-lg' 
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
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      {pkg.badge}
                    </span>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  {pkg.priceNote && (
                    <p className="text-xs text-muted-foreground pt-2">{pkg.priceNote}</p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-2 pb-4">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                      <span className="text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter className="pt-4 flex-col space-y-2">
                  {pkg.quoteUrl && (
                    <Button asChild className="w-full">
                      <a href={pkg.quoteUrl} target="_blank" rel="noopener noreferrer">
                        {t('services.cta.quote')}
                      </a>
                    </Button>
                  )}
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
                        <div className="space-y-6">
                          <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                            <h4 className="font-semibold text-xl mb-4 text-primary">{language === 'en' ? 'Description' : 'Kuvaus'}</h4>
                            <p className="text-base leading-relaxed">{dialogContent.description}</p>
                          </div>
                          <div className="bg-secondary/30 p-6 rounded-xl">
                            <p className="text-base leading-relaxed mb-4">{dialogContent.listTitle}</p>
                            <ul className="space-y-3">
                              {dialogContent.listItems.map((item, i) => (
                                <li key={i} className="flex items-start space-x-3">
                                  <span className="text-primary font-bold mt-1">•</span>
                                  <span className="text-base leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {dialogContent.pricingTitle && dialogContent.pricingItems && (
                            <div className="bg-secondary/30 p-6 rounded-xl">
                              <h4 className="font-semibold text-xl mb-4">{dialogContent.pricingTitle}</h4>
                              <ul className="space-y-3">
                                {dialogContent.pricingItems.map((item, i) => (
                                  <li key={i} className="flex items-start space-x-3">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span className="text-base leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
