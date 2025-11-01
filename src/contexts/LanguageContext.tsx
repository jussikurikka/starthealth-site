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
    'nav.pricing': 'Hinnasto',
    'nav.services': 'Palvelut',
    'nav.about': 'Tietoa Meistä',
    'nav.contact': 'Ota yhteyttä',
    
    // Hero
    'hero.title': 'Työterveyshuolto',
    'hero.titleHighlight': 'Startupeille',
    'hero.subtitle': 'Minimoi kulut ja maksimoi kassavirta - Ei yllätyskustannuksia, aina kiinteä kuukausikulu',
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
    'services.minimum.feature1': 'Työpaikkaselvitys',
    'services.minimum.feature2': 'Toimintasuunnitelma',
    'services.minimum.feature3': 'Lakisääteinen seuranta',
    'services.minimum.feature4': 'Etäpalvelut',
    'services.basic.name': 'Basic',
    'services.basic.price': 'Alk.',
    'services.basic.period': '/kk',
    'services.basic.desc': 'Kattava paketti kasvavalle yritykselle',
    'services.basic.feature1': 'Kaikki Minimum-paketin palvelut',
    'services.basic.feature2': 'Sairaanhoidon konsultaatio',
    'services.basic.feature3': 'Ennaltaehkäisevät palvelut',
    'services.basic.feature4': 'Työkyvyn tuki',
    'services.support.name': 'Support',
    'services.support.price': 'Alk.',
    'services.support.period': '/kk',
    'services.support.desc': 'Kokonaisvaltainen tuki kaikille tarpeille',
    'services.support.feature1': 'Kaikki Basic-paketin palvelut',
    'services.support.feature2': 'Täysi sairaanhoito',
    'services.support.feature3': 'Mielenterveys- ja päihdepalvelut',
    'services.support.feature4': 'Erikoislääkärikonsultaatiot',
    'services.cta.details': 'Lue lisää',
    'services.cta.quote': 'Pyydä tarjous',
    
    // Process
    'process.title': 'Aloitus helposti',
    'process.subtitle': 'Yksinkertainen prosessi työterveyshuollon käyttöönottoon',
    
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
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.pricing': 'Pricing',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'BEST occupational health',
    'hero.titleHighlight': 'for Startups',
    'hero.subtitle': 'Minimize costs and maximize cash flow - No surprise costs, always a fixed monthly fee',
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
    'services.minimum.feature1': 'Workplace survey',
    'services.minimum.feature2': 'Action plan',
    'services.minimum.feature3': 'Statutory monitoring',
    'services.minimum.feature4': 'Remote services',
    'services.basic.name': 'Basic',
    'services.basic.price': 'From',
    'services.basic.period': '/mo',
    'services.basic.desc': 'Comprehensive package for growing companies',
    'services.basic.feature1': 'All Minimum package services',
    'services.basic.feature2': 'Medical consultation',
    'services.basic.feature3': 'Preventive services',
    'services.basic.feature4': 'Work ability support',
    'services.support.name': 'Support',
    'services.support.price': 'From',
    'services.support.period': '/mo',
    'services.support.desc': 'Comprehensive support for all needs',
    'services.support.feature1': 'All Basic package services',
    'services.support.feature2': 'Full medical care',
    'services.support.feature3': 'Mental health & substance services',
    'services.support.feature4': 'Specialist consultations',
    'services.cta.details': 'Learn more',
    'services.cta.quote': 'Request quote',
    
    // Process
    'process.title': 'Easy Start',
    'process.subtitle': 'Simple process for implementing occupational health',
    
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
