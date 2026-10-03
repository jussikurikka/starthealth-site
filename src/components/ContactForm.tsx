import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Send, Mail, Building, User as UserIcon } from 'lucide-react';

const ContactForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Yhteydenotto starthealth.fi – ${formData.company || formData.name}`;
    const body = `Nimi: ${formData.name}\nSähköposti: ${formData.email}\nYritys: ${formData.company}\n\nViesti:\n${formData.message}`;
    const mailto = `mailto:jussikurikka@starthealth.fi?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Best-effort backup of the message; the mailto below must never depend on it.
    try {
      const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000));
      await Promise.race([supabase.functions.invoke('submit-contact', { body: formData }), timeout]);
    } catch (err) {
      console.warn('submit-contact failed (continuing with mailto):', err);
    }

    window.location.href = mailto;
    toast(t('contact.emailDraft'));
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">{t('contact.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium flex items-center space-x-2">
                  <UserIcon className="h-4 w-4 text-primary" />
                  <span>{t('contact.name')}</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-card"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{t('contact.email')}</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-card"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium flex items-center space-x-2">
                <Building className="h-4 w-4 text-primary" />
                <span>{t('contact.company')}</span>
              </label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                {t('contact.message')}
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-card resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg"
              size="lg"
            >
              <Send className="mr-2 h-5 w-5" />
              {t('contact.send')}
            </Button>
            <p className="text-sm text-muted-foreground">
              {t('contact.directEmail')}{' '}
              <a href="mailto:jussikurikka@starthealth.fi" className="text-primary underline">jussikurikka@starthealth.fi</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
