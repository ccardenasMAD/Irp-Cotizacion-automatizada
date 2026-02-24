import heroImg from "@/assets/HeroSection.png";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
  
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Soldadura industrial" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-navy/60 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />
      </div>

   
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Inversiones RP
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Soluciones empresariales de calidad para el sector industrial y minero
          </p>
          <p className="text-white/70 mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Experiencia, calidad y confiabilidad desde 2014
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
  <Button asChild size="lg" className="bg-[#0A59CC] hover:bg-[#0847A3] text-white font-heading font-semibold px-8 transition-all">
    <a href="#contacto">Contáctanos</a>
  </Button>
  
 
  <Button asChild size="lg" className="bg-[#0A59CC] hover:bg-[#0847A3] text-white font-heading font-semibold px-8 transition-all">
    <a href="#cotizacion">Cotizar</a>
  </Button>
</div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;