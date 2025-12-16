import { useState } from 'react';
import { Menu, X, Globe, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const isDevMode = import.meta.env.DEV;

  const navItems = [
    { key: 'nav.home', href: '#home', hidden: false },
    { key: 'nav.services', href: '#services', hidden: false },
    { key: 'nav.pricing', href: '#calculator', hidden: false },
    { key: 'nav.privacy', href: '#privacy', hidden: false },
    { key: 'nav.about', href: '#about', hidden: false },
    { key: 'nav.contact', href: '#contact', hidden: false },
  ];

  // Filter items based on dev mode
  const visibleNavItems = navItems.filter(item => !item.hidden || isDevMode);

  const toggleLanguage = () => {
    setLanguage(language === 'fi' ? 'en' : 'fi');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center cursor-pointer">
            <img 
              src={logo} 
              alt="StartHealth" 
              className="h-12 md:h-14 w-auto object-contain" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {visibleNavItems.map((item) => (
              <div key={item.key} className="relative group">
                {item.hidden && isDevMode && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-amber-100 border border-amber-300 text-amber-800 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 shadow-md">
                      <EyeOff className="h-3 w-3" />
                      Piilotettu
                    </div>
                  </div>
                )}
                <a
                  href={item.href}
                  className={`text-foreground hover:text-primary transition-colors font-medium ${
                    item.hidden && isDevMode 
                      ? 'border border-dashed border-amber-400 px-2 py-1 rounded bg-amber-50/50' 
                      : ''
                  }`}
                >
                  {t(item.key)}
                </a>
              </div>
            ))}
            
            <Button
              variant="default"
              size="sm"
              onClick={() => toast.info(t('booking.comingSoon'))}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-glow ml-4"
            >
              {t('nav.booking')}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{language === 'fi' ? 'en' : 'fi'}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase text-xs">{language === 'fi' ? 'en' : 'fi'}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in-up">
            {visibleNavItems.map((item) => (
              <div key={item.key} className="relative">
                {item.hidden && isDevMode && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <div className="bg-amber-100 border border-amber-300 text-amber-800 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <EyeOff className="h-3 w-3" />
                      Piilotettu
                    </div>
                  </div>
                )}
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-foreground hover:text-primary transition-colors font-medium ${
                    item.hidden && isDevMode 
                      ? 'border border-dashed border-amber-400 px-2 rounded bg-amber-50/50' 
                      : ''
                  }`}
                >
                  {t(item.key)}
                </a>
              </div>
            ))}
            
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                toast.info(t('booking.comingSoon'));
                setIsOpen(false);
              }}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg mt-4"
            >
              {t('nav.booking')}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
