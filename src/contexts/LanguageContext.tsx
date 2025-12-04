import React, { createContext, useContext, useState } from 'react';

type Language = 'fi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fi: {
    // Navigation
    'nav.home': 'Etusivu',
    'nav.pricing': 'Hintalaskuri',
    'nav.services': 'Palvelut',
    'nav.privacy': 'Tietosuoja',
    'nav.about': 'Tietoa Meistä',
    'nav.contact': 'Ota yhteyttä',
    'nav.booking': 'Ajanvaraus',
    
    // Hero
    'hero.title': 'Moderni Työterveyshuolto',
    'hero.titleHighlight': 'StartHealth',
    'hero.subtitle': 'Kiinteä ja edullinen kuukausihinta!',
    'hero.cta.contact': 'Ota yhteyttä',
    'hero.cta.quote': 'Pyydä tarjous',
    
    // Benefits
    'benefits.price.title': 'PARAS HINTA',
    'benefits.price.desc': 'Minimoi kulut ja maksimoi kassavirta',
    'benefits.transparent.title': 'Ei yllätyskustannuksia',
    'benefits.transparent.desc': 'Aina KIINTEÄ kuukausikulu eikä yllätyksiä',
    'benefits.focused.title': 'Työnantaja keskiössä',
    'benefits.focused.desc': 'Ei tyhjänpäiväistä launchia tai ylläpitoa',
    
    // Services
    'services.title': 'Palvelupaketit',
    'services.subtitle': 'Valitse yrityksellesi sopiva työterveyshuollon paketti',
    'services.minimum.name': 'Minimum',
    'services.minimum.price': 'Alk.',
    'services.minimum.period': '/kk',
    'services.minimum.desc': 'Lakisääteinen työterveyshuolto pienille yrityksille',
    'services.minimum.feature1': 'Lakisääteinen dokumentaatio',
    'services.minimum.feature2': 'Lakisääteinen seuranta',
    'services.minimum.feature3': 'Kysy apua maksutta',
    'services.basic.name': 'Basic',
    'services.basic.price': 'Alk.',
    'services.basic.period': '/kk',
    'services.basic.desc': 'Etäpalveluita alkuvaiheen yrityksen työntekijöille',
    'services.basic.feature1': 'Kaikki Minimum-paketin palvelut',
    'services.basic.feature2': 'Etäyhteys lääkäriin',
    'services.basic.feature3': 'Etänä tehtävä sairaanhoito',
    'services.support.name': 'Support',
    'services.support.price': 'Alk.',
    'services.support.period': '/kk',
    'services.support.desc': 'Kokonaisvaltaisempi työterveyden tuki',
    'services.support.feature1': 'Kaikki Basic-paketin palvelut',
    'services.support.feature2': 'Lääkärin lähivastaanotot',
    'services.support.feature3': 'Laboratoriokokeet ja kuvantamistutkimukset',
    'services.support.feature4': 'Fysioterapeutin vastaanotot',
    'services.cta.details': 'Lue lisää',
    'services.cta.quote': 'Pyydä tarjous',
    
    // Process
    'process.title': 'Aloitus helposti',
    'process.subtitle': 'Yksinkertainen prosessi työterveyshuollon käyttöönottoon',
    'process.step0.title': 'Ota yhteyttä',
    'process.step0.desc': 'Varaa lyhyt keskusteluaika, mikäli tarvitset apua palvelupaketin valinnassa tai muutoin haluat palvelusta lisätietoja.',
    'process.step0.cta': 'Ota yhteyttä',
    'process.step1.title': 'Valitse palvelupaketti ja pyydä tarjous',
    'process.step1.desc': 'Olemme sinuun yhteydessä muutaman arkipäivän sisällä.',
    'process.step1.cta': 'Pyydä tarjous',
    'process.step2.title': 'Sopimuksen allekirjoitus',
    'process.step2.desc': 'Allekirjoita sopimus sähköisesti kätevästi.',
    'process.step3.title': 'Aloituspalaveri',
    'process.step3.desc': 'Käymme yhdessä palvelun läpi ja vastaamme kysymyksiin.',
    'process.step4.title': 'Käynti työpaikalla ja dokumentaation valmistelu',
    'process.step4.desc': 'Kartoitamme yrityksesi tarpeet ja riskit. Valmistelemme tarvittavan dokumentaation.',
    'process.step5.title': 'Seuranta ja Kela-korvaukset',
    'process.step5.desc': 'Päivitämme toimintasuunnitelmaa ja tilikauden päätteeksi autamme hakemaan Kela-korvaukset.',
    
    // Team
    'team.title': 'Tiimimme',
    'team.subtitle': 'Kolme nuorta lääkäriä, jotka haluavat tehdä työterveydestä järkevän kokonaisuuden startup-yrityksille',
    'team.founder': 'Perustaja',
    
    // Contact
    'contact.title': 'Ota yhteyttä',
    'contact.subtitle': 'Otamme sinuun yhteyttä pikaisesti',
    'contact.name': 'Nimi',
    'contact.email': 'Sähköposti',
    'contact.company': 'Yritys',
    'contact.message': 'Viesti',
    'contact.send': 'Lähetä viesti',
    'contact.success': 'Kiitos viestistäsi! Otamme sinuun yhteyttä pian.',
    'contact.error': 'Viestin lähetys epäonnistui. Yritä uudelleen.',
    
    // Footer
    'footer.tagline': 'Moderni työterveyshuolto startup-yrityksille',
    'footer.rights': 'Kaikki oikeudet pidätetään',
    'footer.privacy': 'Tietosuojaseloste',
    'footer.terms': 'Käyttöehdot',
    
    // Calculator
    'calculator.openButton': 'Avaa hintalaskuri',
    'calculator.close': 'Sulje laskuri',
    'calculator.title': 'Hintalaskuri',
    'calculator.subtitle': 'Laske suuntaa-antava hinta työterveyshuollostasi',
    'calculator.employeesLabel': 'Työntekijöiden lukumäärä (ilman foundereita)',
    'calculator.employeesPlaceholder': 'Esim. 15',
    'calculator.foundersLabel': 'Foundereiden lukumäärä',
    'calculator.foundersPlaceholder': 'Esim. 2',
    'calculator.locationLabel': 'Sijainti',
    'calculator.locationPlaceholder': 'Valitse sijainti',
    'calculator.locationUusimaa': 'Uusimaa',
    'calculator.locationPirkanmaa': 'Pirkanmaa',
    'calculator.locationOther': 'Muu Suomi',
    'calculator.locationOtherInfo': 'Hinta ei riipu sijainnista, mutta suosittelemme olemaan meihin yhteydessä sopivimman palvelupaketin valinnassa muilla alueilla.',
    'calculator.packageLabel': 'Palvelupaketti',
    'calculator.riskLabel': 'Onko yrityksessänne ravintola-, rakennus-, konepaja- tai yötyötä?',
    'calculator.riskYes': 'Kyllä',
    'calculator.riskNo': 'Ei',
    'calculator.riskInfo': 'Hintalaskuri on tarkoitettu matala-altisteisille aloille. Riskialoilla (ravintola, rakennus, konepaja, yötyö) tarvitsemme tarkemman kartoituksen hintaa varten.',
    'calculator.calculateButton': 'Laske hinta',
    'calculator.riskWarningTitle': 'Hintalaskuri ei anna arviota riskialoille',
    'calculator.riskWarningText': 'Hintalaskuri on tarkoitettu matala-altisteisille aloille. Ravintola-, rakennus-, konepaja- ja yötyössä altistuminen on suurempaa, joten annamme tarjouksen näille aloille aina yksilöllisesti. Olethan yhteydessä, niin voimme arvioida palvelun hinnan tarkemmin.',
    'calculator.outOfRangeTitle': 'Tälle työntekijämäärälle emme pysty antamaan hintaa laskurilla',
    'calculator.outOfRangeText': 'Hintalaskuri on tarkoitettu enintään 50 työntekijän yrityksille. Olethan yhteydessä, niin laskemme hinnan erikseen.',
    'calculator.priceBeforeKelaTitle': 'Arvioitu kuukausihinta ennen Kela-korvausta',
    'calculator.priceVatInfo': 'Hinnat alv 0 % (työterveyspalvelut).',
    'calculator.priceAfterKelaTitle': 'Arvioitu nettokustannus (55 % Kela-korvauksella)',
    'calculator.kelaSubsidyInfo': 'Kela korvaa tyypillisesti noin 50–60 % työterveyshuollon kustannuksista. Laskelma käyttää esimerkkinä 55 % korvausta.',
    'calculator.disclaimer': 'Hintalaskuri antaa suuntaa-antavan hinnan matala-altisteisille aloille. Lopullinen hinta tarkentuu tarvekartoituksen ja sopimuksen yhteydessä.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.pricing': 'Pricing',
    'nav.services': 'Services',
    'nav.privacy': 'Privacy',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.booking': 'Book Appointment',
    
    // Hero
    'hero.title': 'Modern Occupational Health',
    'hero.titleHighlight': 'StartHealth',
    'hero.subtitle': 'Fixed and affordable monthly price!',
    'hero.cta.contact': 'Contact Us',
    'hero.cta.quote': 'Request Quote',
    
    // Benefits
    'benefits.price.title': 'BEST PRICE',
    'benefits.price.desc': 'Minimize costs and maximize cash flow',
    'benefits.transparent.title': 'No Surprise Costs',
    'benefits.transparent.desc': 'Always a FIXED monthly cost with no surprises',
    'benefits.focused.title': 'Employer-Centric',
    'benefits.focused.desc': 'No meaningless launches or maintenance',
    
    // Services
    'services.title': 'Service Packages',
    'services.subtitle': 'Choose the right occupational health package for your company',
    'services.minimum.name': 'Minimum',
    'services.minimum.price': 'From',
    'services.minimum.period': '/mo',
    'services.minimum.desc': 'Statutory occupational health for small businesses',
    'services.minimum.feature1': 'Statutory documentation',
    'services.minimum.feature2': 'Statutory monitoring',
    'services.minimum.feature3': 'Free consultation',
    'services.basic.name': 'Basic',
    'services.basic.price': 'From',
    'services.basic.period': '/mo',
    'services.basic.desc': 'Remote services for early-stage company employees',
    'services.basic.feature1': 'All Minimum package services',
    'services.basic.feature2': 'Remote doctor access',
    'services.basic.feature3': 'Remote medical care',
    'services.support.name': 'Support',
    'services.support.price': 'From',
    'services.support.period': '/mo',
    'services.support.desc': 'More comprehensive occupational health support',
    'services.support.feature1': 'All Basic package services',
    'services.support.feature2': 'In-person doctor visits',
    'services.support.feature3': 'Laboratory tests and imaging',
    'services.support.feature4': 'Physiotherapist appointments',
    'services.cta.details': 'Learn more',
    'services.cta.quote': 'Request quote',
    
    // Process
    'process.title': 'Easy Start',
    'process.subtitle': 'Simple process for implementing occupational health',
    'process.step0.title': 'Contact Us',
    'process.step0.desc': 'Book a short consultation if you need help choosing a service package or want more information about our services.',
    'process.step0.cta': 'Contact Us',
    'process.step1.title': 'Choose Package and Request Quote',
    'process.step1.desc': 'We will contact you within a few business days.',
    'process.step1.cta': 'Request Quote',
    'process.step2.title': 'Contract Signing',
    'process.step2.desc': 'Sign the contract electronically at your convenience.',
    'process.step3.title': 'Kickoff Meeting',
    'process.step3.desc': 'We review the service together and answer your questions.',
    'process.step4.title': 'Workplace Visit and Documentation',
    'process.step4.desc': 'We assess your company\'s needs and risks, and prepare the necessary documentation.',
    'process.step5.title': 'Follow-up and Kela Reimbursements',
    'process.step5.desc': 'We update the action plan and apply for Kela reimbursements at the end of the fiscal year.',
    
    // Team
    'team.title': 'Our Team',
    'team.subtitle': 'Three young doctors who want to make occupational health a sensible solution for startups',
    'team.founder': 'Founder',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We will get back to you promptly',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.company': 'Company',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.success': 'Thank you for your message! We will contact you soon.',
    'contact.error': 'Failed to send message. Please try again.',
    
    // Footer
    'footer.tagline': 'Modern occupational health for startups',
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // Calculator
    'calculator.openButton': 'Open Price Calculator',
    'calculator.close': 'Close calculator',
    'calculator.title': 'Price Calculator',
    'calculator.subtitle': 'Calculate an estimated price for your occupational health services',
    'calculator.employeesLabel': 'Number of employees (excluding founders)',
    'calculator.employeesPlaceholder': 'E.g. 15',
    'calculator.foundersLabel': 'Number of founders',
    'calculator.foundersPlaceholder': 'E.g. 2',
    'calculator.locationLabel': 'Location',
    'calculator.locationPlaceholder': 'Select location',
    'calculator.locationUusimaa': 'Uusimaa',
    'calculator.locationPirkanmaa': 'Pirkanmaa',
    'calculator.locationOther': 'Rest of Finland',
    'calculator.locationOtherInfo': 'Price does not depend on location, but we recommend contacting us to select the most suitable service package in other regions.',
    'calculator.packageLabel': 'Service Package',
    'calculator.riskLabel': 'Does your company have restaurant, construction, machine shop, or night shift work?',
    'calculator.riskYes': 'Yes',
    'calculator.riskNo': 'No',
    'calculator.riskInfo': 'The price calculator is intended for low-exposure industries. For risk industries (restaurant, construction, machine shop, night work), we need a more detailed assessment for pricing.',
    'calculator.calculateButton': 'Calculate Price',
    'calculator.riskWarningTitle': 'Calculator does not provide estimates for risk industries',
    'calculator.riskWarningText': 'The price calculator is intended for low-exposure industries. In restaurant, construction, machine shop, and night work, exposure is higher, so we always provide individual quotes for these industries. Please contact us, and we can assess the service price more accurately.',
    'calculator.outOfRangeTitle': 'We cannot provide a price for this number of employees',
    'calculator.outOfRangeText': 'The price calculator is intended for companies with up to 50 employees. Please contact us, and we will calculate the price separately.',
    'calculator.priceBeforeKelaTitle': 'Estimated monthly price before Kela reimbursement',
    'calculator.priceVatInfo': 'Prices VAT 0% (occupational health services).',
    'calculator.priceAfterKelaTitle': 'Estimated net cost (with 55% Kela reimbursement)',
    'calculator.kelaSubsidyInfo': 'Kela typically reimburses about 50-60% of occupational health costs. This calculation uses 55% reimbursement as an example.',
    'calculator.disclaimer': 'The price calculator provides an estimated price for low-exposure industries. Final price will be confirmed during needs assessment and contract.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fi');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fi] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
