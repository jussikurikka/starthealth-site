import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

const SEOContent = () => {
  const { language } = useLanguage();

  return (
    <>
      {/* H2: Matala-altisteiset toimialat */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground">
            {language === 'fi'
              ? 'Työterveyshuolto matala-altisteisiin asiantuntija- ja toimistotöihin'
              : 'Occupational health for low-exposure expert and office work'}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {language === 'fi'
                ? 'StartHealthin palvelu on suunniteltu erityisesti IT-yrityksille, startup-yrityksille, asiantuntijaorganisaatioille ja toimistotyötä tekeville yrityksille. Palvelumme kattaa lakisääteisen työterveyshuollon lisäksi työkyvyn tuen, jossa huomioidaan toimistotyön erityispiirteet – kuten ergonomia, näyttöpäätetyön kuormitus ja henkinen jaksaminen.'
                : "StartHealth's service is designed specifically for IT companies, startups, expert organizations, and office-based businesses. In addition to statutory occupational health, our service includes work ability support that addresses the specifics of office work – such as ergonomics, screen work strain, and mental wellbeing."}
            </p>
            <p>
              {language === 'fi'
                ? 'Matala-altisteisilla toimialoilla työterveyden painopiste on ennaltaehkäisevässä toiminnassa ja varhaisessa tuessa. Autamme tunnistamaan kuormitustekijät ajoissa ja tarjoamme konkreettisia keinoja työhyvinvoinnin ylläpitämiseen.'
                : 'In low-exposure industries, the focus of occupational health is on preventive action and early support. We help identify strain factors early and offer concrete tools for maintaining workplace wellbeing.'}
            </p>
          </div>
        </div>
      </section>

      {/* H2: Paikkakuntaosio */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground">
            {language === 'fi'
              ? 'Työterveyshuolto Helsingissä'
              : 'Occupational health in Helsinki'}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {language === 'fi'
                ? 'Palvelemme pk-yrityksiä Helsingissä ja Tampereella. Tarjoamme lakisääteistä työterveyshuoltoa 1–200 työntekijän yrityksille näillä paikkakunnilla. Etäpalvelumme mahdollistavat nopean hoitoon pääsyn sijainnista riippumatta.'
                : 'We serve SMEs in Helsinki and Tampere. We offer statutory occupational health services for companies with 1–200 employees in these cities. Our remote services enable fast access to care regardless of location.'}
            </p>
            <p>
              {language === 'fi'
                ? 'Helsingissä ja Tampereella toimivien yritysten on helppo aloittaa kanssamme – kartoitamme yrityksesi tarpeet ja rakennamme palvelun, joka sopii juuri teidän tilanteeseen. Myös muualla Suomessa toimivat yritykset voivat hyödyntää etäpalveluitamme.'
                : 'Companies in Helsinki and Tampere can easily get started with us – we assess your company\'s needs and build a service that fits your situation. Companies elsewhere in Finland can also benefit from our remote services.'}
            </p>
          </div>
        </div>
      </section>

      {/* H2: Kenelle palvelu sopii */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground">
            {language === 'fi' ? 'Kenelle palvelu sopii?' : 'Who is this service for?'}
          </h2>
          <ul className="space-y-3">
            {(language === 'fi'
              ? [
                  '1–200 työntekijän pk-yritykset',
                  'Kasvuvaiheen startupit',
                  'IT- ja asiantuntijaorganisaatiot',
                  'Toimistotyötä tekevät yritykset',
                  'Yritykset Helsingissä ja Tampereella',
                ]
              : [
                  'SMEs with 1–200 employees',
                  'Growth-stage startups',
                  'IT and expert organizations',
                  'Office-based companies',
                  'Companies in Helsinki and Tampere',
                ]
            ).map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* H2: Kustannusrakenne */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground">
            {language === 'fi'
              ? 'Selkeä ja ennakoitava kustannusrakenne'
              : 'Clear and predictable cost structure'}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {language === 'fi'
                ? 'Työterveyshuollon hinta koostuu kiinteästä vuosimaksusta per työntekijä sekä mahdollisista käyntikohtaisista maksuista palvelupaketin mukaan. Kiinteä hinnoittelu tekee kuluista ennakoitavia – tiedät etukäteen, mitä työterveys maksaa.'
                : 'Occupational health pricing consists of a fixed annual fee per employee and possible visit-based charges depending on the service package. Fixed pricing makes costs predictable – you know in advance what occupational health costs.'}
            </p>
            <p>
              {language === 'fi'
                ? 'Kela korvaa tyypillisesti noin 50–60 % ennaltaehkäisevän työterveyshuollon kustannuksista. Autamme yritystäsi hakemaan Kela-korvaukset tilikauden päätteeksi. Tämä tekee työterveyshuollosta erityisen kustannustehokasta pienille ja keskisuurille yrityksille.'
                : 'Kela typically reimburses about 50–60% of preventive occupational health costs. We help your company apply for Kela reimbursements at the end of the fiscal year. This makes occupational health particularly cost-effective for small and medium-sized enterprises.'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SEOContent;
