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

  const pillText = language === 'fi'
    ? 'Luotettu kumppani kasvuyrityksille'
    : 'Trusted partner for growth companies';

  const topRow = clients.slice(0, 4);
  const bottomRow = clients.slice(4, 7);

  const renderLogo = (client: { name: string; logo: string }) => (
    <div
      key={client.name}
      className="flex items-center justify-center transition-transform duration-200 ease-out hover:scale-[1.04]"
      style={{ width: 180, height: 100 }}
    >
      <img
        src={client.logo}
        alt={`${client.name} – ${language === 'fi' ? 'työterveyshuolto' : 'occupational health'}`}
        className="object-contain"
        style={{ maxWidth: '100%', maxHeight: 68, width: 'auto', height: 'auto' }}
        loading="lazy"
      />
    </div>
  );

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 animate-fade-in">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary/60 border border-border text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {pillText}
          </span>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
            {topRow.map(renderLogo)}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
            {bottomRow.map(renderLogo)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReferences;
