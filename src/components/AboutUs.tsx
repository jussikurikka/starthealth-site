import aboutHeroImage from '@/assets/about-hero.jpg';

const AboutUs = () => {

  return (
    <section id="about" className="overflow-hidden">
      {/* 1. Split Hero */}
      <div className="min-h-[70vh] bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">
            {/* Left - Text */}
            <div className="space-y-6 lg:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Työterveyttä, joka on rakennettu ymmärrettäväksi.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                StartHealth on lääkärivetoisesti rakennettu työterveyspalvelu, joka yhdistää 
                lääketieteellisen laadun, digitaalisen saavutettavuuden ja yritysten arjen ymmärtämisen.
              </p>
            </div>
            
            {/* Right - Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={aboutHeroImage} 
                  alt="Terveydenhuollon ammattilaiset keskustelemassa" 
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
              Missio
            </span>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
              Missiomme on rakentaa työterveyshuoltoa, joka tukee sekä ihmisiä että liiketoimintaa. 
              Toimimme selkeästi, läpinäkyvästi ja pitkäjänteisesti.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Story Section */}
      <div className="bg-secondary/20 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center lg:text-left">
              Miksi StartHealth syntyi
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  StartHealth sai alkunsa havainnoista, joita teimme seurattuamme läheltä startup-yrittäjien 
                  ja pienyritysten arkea. Monille työterveyshuollon järjestäminen näyttäytyi vaikeana ja 
                  epäselvänä kokonaisuutena – jopa tilanteissa, joissa yrittäjä tai työnantaja oli itse 
                  terveydenhuollon ammattilainen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Myös perustajilla itsellään on kokemusta aiemmista yrityksistä, joissa työterveyshuollon 
                  palveluiden sisältö, viestintä ja laskutus jäivät etäisiksi ja vaikeasti hahmotettaviksi. 
                  Sekä työnantajat että työntekijät toivovat yhä useammin työterveyden olevan läpinäkyvä, 
                  ennakoitava ja selkeästi viestitty kokonaisuus.
                </p>
              </div>
              
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Samanaikaisesti julkinen keskustelu ja media ovat nostaneet esiin laskutukseen ja 
                  hinnoitteluun liittyviä epäselvyyksiä, jotka ovat osaltaan heikentäneet luottamusta 
                  työterveyshuollon palveluihin.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Näiden havaintojen pohjalta syntyi StartHealth: halu rakentaa työterveyshuoltoa, joka 
                  vastaa paremmin työnantajien ja työntekijöiden todellisia tarpeita – selkeästi, reilusti 
                  ja lääketieteellisesti vastuullisesti.
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
