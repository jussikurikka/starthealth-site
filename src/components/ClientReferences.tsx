import { useLanguage } from '@/contexts/LanguageContext';
import boughtLogo from '@/assets/clients/bought.png';
import closioLogo from '@/assets/clients/closio.webp';
import synergiLogo from '@/assets/clients/synergi.png';
import taigaLogo from '@/assets/clients/taiga-ai.png';
import homieLogo from '@/assets/clients/homie.png';
import easLogo from '@/assets/clients/eas.png';
import startupNationLogo from '@/assets/clients/startup-nation.png';

const clients = [
  { name: 'Synergi', logo: synergiLogo },
  { name: 'Bought', logo: boughtLogo },
  { name: 'Closio', logo: closioLogo },
  { name: 'Taiga AI', logo: taigaLogo },
  { name: 'Homie', logo: homieLogo },
  { name: 'EAS project', logo: easLogo },
  { name: 'Tampereen Startup tukiyhdistys', logo: startupNationLogo },
];

const ClientReferences = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-lg font-medium text-muted-foreground mb-8">
          {language === 'fi' ? 'Hekin valitsivat StartHealthin' : 'They also chose StartHealth'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={`${client.name} – ${language === 'fi' ? 'työterveyshuolto' : 'occupational health'}`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-medium text-foreground">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReferences;
