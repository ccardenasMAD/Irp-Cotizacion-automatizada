import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuienesSomos from "@/components/QuienesSomos";
import MisionVision from "@/components/MisionVision";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <QuienesSomos />
        <MisionVision />
      </main>
      <Footer />
    </div>
  );
};

export default Index;