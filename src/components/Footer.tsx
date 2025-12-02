import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-75">
            © {currentYear} StartHealth. {t('footer.rights')}
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="/tietosuoja.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity hover:underline"
            >
              {t('footer.privacy')}
            </a>
            <a 
              href="/kayttoehdot.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity hover:underline"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
