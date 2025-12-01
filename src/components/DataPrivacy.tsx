import { Shield, Lock, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DataPrivacy = () => {
  const { language } = useLanguage();

  const features = language === 'en' 
    ? [
        {
          icon: Shield,
          title: 'GDPR & Data Protection',
          points: [
            'We process personal data and patient data in accordance with the EU General Data Protection Regulation (GDPR).',
            'All data is handled within the EU/EEA area, securely and under strict supervision. Backups, audits, and regular security testing ensure a high level of data protection.'
          ]
        },
        {
          icon: Lock,
          title: 'Secure Patient Information System',
          points: [
            'Our patient information system is secured and compliant with all relevant legal requirements.',
            'It meets the certification criteria of Valvira and is fully compatible with Kanta services.'
          ]
        },
        {
          icon: FileCheck,
          title: 'Regulatory Approvals',
          points: [
            "StartHealth is registered in Valvira's Social and Health Care Service Provider Register (Soteri).",
            "Operations follow Valvira's guidelines as well as all relevant healthcare and occupational health legislation.",
            'Staff members hold all legally required healthcare qualifications and mandatory occupational health training.'
          ]
        }
      ]
    : [
        {
          icon: Shield,
          title: 'GDPR & tietosuoja',
          points: [
            'Käsittelemme henkilötietoja ja potilastietoja EU:n tietosuoja-asetuksen (GDPR) mukaisesti',
            'Kaikki tiedot käsitellään EU/ETA-alueella, salattuina ja valvottuina. Varmuuskopiot, auditoinnit ja säännölliset testaukset takaavat korkean tietoturvan tason.'
          ]
        },
        {
          icon: Lock,
          title: 'Tietoturvallinen potilastietojärjestelmä',
          points: [
            'Potilastietojärjestelmä on tietoturvallinen. Se täyttää lainsäädännön kriteerit, sisältäen muun muassa Kanta-palveluiden ja Valviran sertifiointikriteerit'
          ]
        },
        {
          icon: FileCheck,
          title: 'Viranomaisluvat',
          points: [
            'Yritys on rekisteröity Valviran sosiaali- ja terveydenhuollon palveluntuottajarekisteriin (Soteri)',
            'Toimintaa ohjaavat Valviran ohjeet sekä terveydenhuolto- ja työterveyshuoltolaki',
            'Työntekijöillä on lain edellyttämät terveydenhuollon pohjakoulutukset sekä työterveyshuollon lisäkoulutukset'
          ]
        }
      ];

  return (
    <section id="privacy" className="py-20 bg-secondary/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            {language === 'en' ? 'Privacy & Regulatory Compliance' : 'Tietosuoja ja luvanvaraisuus'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {language === 'en' 
              ? "At the core of StartHealth's operations are patient safety, data protection, and high-quality healthcare services. We build our services fully in line with healthcare legislation, GDPR, and modern information security standards, ensuring that your employees' health data is kept as safe as possible."
              : 'StartHealthin toiminnan ytimessä on potilasturvallisuus, tietosuoja ja korkeatasoinen terveydenhuollon laatu. Rakennamme palvelumme terveydenhuollon lainsäädännön, GDPR:n ja tietoturvastandardien mukaisesti, jotta asiakkaasi voivat luottaa siihen, että heidän terveystietonsa ovat parhaassa mahdollisessa turvassa.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataPrivacy;
