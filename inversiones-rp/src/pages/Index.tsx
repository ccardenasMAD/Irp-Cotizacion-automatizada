import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuienesSomos from "@/components/QuienesSomos";
import MisionVision from "@/components/MisionVision";
import Footer from "@/components/Footer";
import Servicios from "@/components/Servicios"; 
import Cotizacion from "@/components/Cotizacion"; 
import Contacto from "@/components/Contacto";




const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <QuienesSomos />
        <MisionVision />
        <Servicios /> 
        <Cotizacion /> 
        <Contacto />
      </main>
      <Footer />
    </div>
  );
};

export default Index;