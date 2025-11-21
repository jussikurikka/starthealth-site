import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';
import { Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <img src={logo} alt="StartHealth" className="h-10 w-auto brightness-0 invert" />
            <p className="text-sm opacity-90">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('nav.contact')}</h3>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@starthealth.fi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-75">
          <p>© {currentYear} StartHealth. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
