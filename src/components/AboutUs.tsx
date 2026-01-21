import aboutHeroImage from '@/assets/about-hero.jpg';
import foundersImage from '@/assets/founders.png';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="overflow-hidden">
      {/* 1. Split Hero */}
      <div className="min-h-[70vh] bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">
            {/* Left - Text */}
            <div className="space-y-6 lg:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {t('about.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t('about.hero.subtitle')}
              </p>
            </div>
            
            {/* Right - Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={aboutHeroImage} 
                  alt="Healthcare professionals discussing" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mission Section */}
      <div className="bg-secondary/30 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-2xl md:text-3xl font-semibold tracking-widest uppercase text-primary">
              {t('about.mission.label')}
            </span>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
              {t('about.mission.text')}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Story Section */}
      <div className="bg-secondary/20 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center lg:text-left">
              {t('about.story.title')}
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.story.p1')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.story.p2')}
                </p>
              </div>
              
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.story.p3')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.story.p4')}
                </p>
              </div>
            </div>

            {/* Founders subsection */}
            <div className="mt-16 lg:mt-20">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {t('founders.title')}
              </h3>
              <div className="max-w-2xl mx-auto">
                <div className="aspect-[3/2] rounded-2xl overflow-hidden shadow-elegant mb-6">
                  <img 
                    src={foundersImage} 
                    alt={t('founders.caption')} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted-foreground text-center text-lg">
                  {t('founders.caption')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutUs;
