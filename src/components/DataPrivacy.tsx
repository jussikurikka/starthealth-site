import { Shield, Lock, FileCheck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DataPrivacy = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Shield,
      title: 'GDPR & tietosuoja',
      points: [
        'Käsittelemme henkilötietoja ja potilastietoja EU:n tietosuoja-asetuksen (GDPR) mukaisesti',
        'Potilastiedot tallennetaan turvalliseen, sertifioituun potilastietojärjestelmään',
        'Käyttöoikeudet rajataan tarkasti työtehtävien perusteella',
        'Käsittelemme vain hoidon kannalta välttämättömiä tietoja'
      ]
    },
    {
      icon: Lock,
      title: 'Tietoturvallinen potilastietojärjestelmä',
      points: [
        'Potilastietojärjestelmä täyttää terveydenhuollon vaatimukset ja Kanta-palveluiden sertifiointikriteerit',
        'Kaikki tiedonsiirto on salattua',
        'Palvelimet sijaitsevat EU/ETA-alueella',
        'Tietoturvaa testataan ja auditoidaan säännöllisesti'
      ]
    },
    {
      icon: FileCheck,
      title: 'Valvira & Soteri',
      points: [
        'Rekisteröity sosiaali- ja terveydenhuollon palveluntuottajarekisteriin (Soteri)',
        'Toimintaa ohjaavat Valviran ohjeet sekä terveydenhuolto- ja työterveyshuoltolaki',
        'Palvelu toteutetaan luvanvaraisena terveydenhuollon toimintana'
      ]
    },
    {
      icon: Award,
      title: 'Kliininen laatu',
      points: [
        'Palvelumme toteuttavat Valviran laillistamat terveydenhuollon ammattilaiset',
        'Kliininen työ perustuu Käypä hoito -suosituksiin ja tutkittuun tietoon',
        'Panostamme potilasturvallisuuteen ja toimintamallien jatkuvaan kehittämiseen'
      ]
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Tietosuoja ja luvanvaraisuus
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            StartHealthin toiminnan ytimessä on potilasturvallisuus, tietosuoja ja korkeatasoinen terveydenhuollon laatu. 
            Rakennamme palvelumme terveydenhuollon lainsäädännön, GDPR:n ja tietoturvastandardien mukaisesti, jotta 
            asiakkaasi voivat luottaa siihen, että heidän terveystietonsa ovat parhaassa mahdollisessa turvassa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/50"
            >
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

        <div className="max-w-4xl mx-auto mb-12 p-8 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Tietoturva käytännössä
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Kaikki terveystiedot käsitellään EU/ETA-alueella, salattuina ja valvottuina. Varmuuskopiointi, 
            lokiseuranta ja säännölliset auditoinnit varmistavat, että tietoturvan taso pysyy korkeana myös 
            palvelun kehittyessä.
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center p-8 bg-gradient-primary rounded-lg shadow-elegant">
          <p className="text-lg mb-6 text-primary-foreground">
            Haluatko kuulla lisää tietosuojakäytännöistämme ja tietoturvasta?
          </p>
          <Button 
            onClick={scrollToContact}
            size="lg"
            variant="secondary"
            className="shadow-lg hover:shadow-xl transition-all"
          >
            Ota yhteyttä
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DataPrivacy;