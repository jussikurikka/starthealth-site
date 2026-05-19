import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const { language } = useLanguage();

  const faqs = language === 'fi'
    ? [
        {
          q: 'Mitä lakisääteinen työterveyshuolto tarkoittaa?',
          a: 'Lakisääteinen työterveyshuolto on työnantajan velvollisuus. Se kattaa ennaltaehkäisevän toiminnan, kuten työpaikkaselvityksen, riskiarvioinnin ja toimintasuunnitelman. Se ei sisällä sairaanhoitoa, mutta työnantaja voi laajentaa palvelua halutessaan.',
        },
        {
          q: 'Kenelle StartHealthin palvelu sopii?',
          a: 'Palvelumme on suunniteltu 1–200 työntekijän pk-yrityksille, erityisesti matala-altisteisille toimialoille kuten IT, asiantuntijatyö ja toimistotyö. Palvelemme yrityksiä Helsingissä sekä etäpalveluiden kautta koko Suomessa.',
        },
        {
          q: 'Miten työterveyshuollon hinta muodostuu?',
          a: 'Hinta koostuu kiinteästä kuukausimaksusta per työntekijä. Kiinteä hinnoittelu tekee kuluista ennakoitavia. Kela korvaa tyypillisesti noin 50–60 % ennaltaehkäisevän työterveyshuollon kustannuksista.',
        },
        {
          q: 'Miten nopeasti hoitoon pääsee?',
          a: 'Etävastaanotolle pääsee nopeasti, usein parin arkipäivän sisällä. Kiireellisissä tapauksissa pyrimme järjestämään ajan saman päivän aikana. Etäpalvelumme mahdollistavat joustavan ja nopean hoitoon pääsyn.',
        },
        {
          q: 'Mitä Kela-korvaukset tarkoittavat?',
          a: 'Kela korvaa osan työnantajan järjestämän työterveyshuollon kustannuksista. Ennaltaehkäisevästä työterveyshuollosta korvataan yleensä noin 50–60 %. Autamme yritystäsi hakemaan korvaukset tilikauden päätteeksi.',
        },
        {
          q: 'Mitä eroa on Minimum-, Basic- ja Support-paketilla?',
          a: 'Minimum kattaa lakisääteisen ennaltaehkäisevän työterveyshuollon. Basic lisää etävastaanoton sairaanhoidon asioissa. Support tuo mukaan paikan päällä toteutettavat sairaanhoidon lähivastaanotot ja diagnostiset tutkimukset.',
        },
        {
          q: 'Miten työterveys aloitetaan StartHealthin kanssa?',
          a: 'Aloitus on helppoa: ota yhteyttä tai pyydä tarjous, allekirjoita sopimus sähköisesti, ja pidämme aloituspalaverin. Sen jälkeen teemme työpaikkaselvityksen ja käynnistämme palvelun. Koko prosessi vaatii parhaimmillaan hieman viestin vaihtoa ja yhden etätapaamisen.',
        },
        {
          q: 'Toimiiko palvelu etänä?',
          a: 'Kyllä. Palvelu voidaan järjestää kokonaan etänä, kuten Basic-paketissa – työpaikkaselvitys, lääkärin vastaanotto, psykologin etäyhteys ja fysioterapeutin ohjaus. Tämä mahdollistaa nopean hoitoon pääsyn sijainnista riippumatta.',
        },
      ]
    : [
        {
          q: 'What does statutory occupational health care mean?',
          a: 'Statutory occupational health care is an employer obligation in Finland. It covers preventive measures such as workplace assessment, risk evaluation, and an action plan. It does not include medical treatment, but employers can extend the service as needed.',
        },
        {
          q: "Who is StartHealth's service designed for?",
          a: 'Our service is designed for SMEs with 1–200 employees, especially in low-exposure industries such as IT, expert work, and office work. We serve companies in Helsinki, and nationwide through remote services.',
        },
        {
          q: 'How is occupational health pricing structured?',
          a: 'Pricing consists of a fixed monthly fee per employee. Fixed pricing makes costs predictable. Kela typically reimburses about 50–60% of preventive occupational health costs.',
        },
        {
          q: 'How quickly can I access care?',
          a: 'Remote appointments are available quickly, often within a couple of business days. In urgent cases, we aim to arrange an appointment the same business day. Our remote services enable flexible and fast access to care.',
        },
        {
          q: 'What are Kela reimbursements?',
          a: 'Kela reimburses part of employer-arranged occupational health care costs. Preventive occupational health is typically reimbursed at about 50–60%. We help your company apply for reimbursements at the end of the fiscal year.',
        },
        {
          q: 'What is the difference between the Minimum, Basic, and Support packages?',
          a: "Minimum covers statutory preventive occupational health. Basic adds remote appointments for medical matters. Support includes on-site medical appointments and diagnostic tests. Choose based on your company's needs.",
        },
        {
          q: 'How do I get started with StartHealth?',
          a: 'Getting started is easy: contact us or request a quote, sign the contract electronically, and we\'ll hold a kickoff meeting. After that, we conduct a workplace assessment and launch the service. At best, the entire process requires just a bit of messaging and one remote meeting.',
        },
        {
          q: 'Does the service work remotely?',
          a: "Yes. The service can be arranged entirely remotely, as in the Basic package – workplace assessment, doctor appointments, psychologist remote consultation, and physiotherapy guidance. This enables fast access to care regardless of location.",
        },
      ];

  useEffect(() => {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(ld);
    script.dataset.seo = 'faq';
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [language]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-foreground">
          {language === 'fi'
            ? 'Usein kysytyt kysymykset työterveyshuollosta'
            : 'Frequently asked questions about occupational health'}
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
