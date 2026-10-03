import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqFi, faqEn, faqJsonLd } from '@/seo/faq';

const FAQ = () => {
  const { language } = useLanguage();

  const faqs = language === 'fi' ? faqFi : faqEn;

  useEffect(() => {
    const ld = faqJsonLd(faqs);
    document.head.querySelectorAll('script[data-seo="faq"]').forEach((el) => el.remove());
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
