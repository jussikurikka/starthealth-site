import { useLanguage } from '@/contexts/LanguageContext';
import boughtLogo from '@/assets/clients/bought.png';
import closioLogo from '@/assets/clients/closio.webp';
import synergiLogo from '@/assets/clients/synergi.png';
import taigaLogo from '@/assets/clients/taiga-ai.png';

const clients = [
  { name: 'Bought', logo: boughtLogo },
  { name: 'Closio', logo: closioLogo },
  { name: 'Synergi', logo: synergiLogo },
  { name: 'Taiga AI', logo: taigaLogo },
];

const ClientReferences = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            {language === 'fi'
              ? 'Yrityksiä, jotka käyttävät StartHealthin työterveyshuoltoa'
              : 'Companies using StartHealth occupational health'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'fi'
              ? 'StartHealthin työterveyshuolto palvelee pk-yrityksiä eri toimialoilla, erityisesti matala-altisteisessa asiantuntija- ja toimistotyössä.'
              : 'StartHealth occupational health serves SMEs across industries, especially in low-exposure expert and office work.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto items-center">
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

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-xl mx-auto">
          {language === 'fi'
            ? 'Palvelemme 1–200 työntekijän pk-yrityksiä Helsingissä ja etänä koko Suomessa.'
            : 'We serve SMEs with 1–200 employees in Helsinki and remotely across Finland.'}
        </p>
      </div>
    </section>
  );
};

export default ClientReferences;
