import { Bot, ArrowRight, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Cotizacion = () => {
  return (
    <section id="cotizacion" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Encabezado Estilo IRP */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#0A1F44] mb-4">
            Plataforma de Cotización Automática
          </h2>
          <div className="w-24 h-1.5 bg-[#0A59CC] mx-auto rounded-full" />
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">
            Genera presupuestos técnicos de manera simple, rápida y transparente con nuestro asistente inteligente.
          </p>
        </div>

        {/* Tarjeta Principal Híbrida */}
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          {/* Lado Izquierdo: Beneficios Técnicos */}
          <div className="md:w-1/2 bg-[#011D4C] p-12 text-white flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            <h3 className="text-3xl font-bold mb-8 relative z-10 text-white">Beneficios del Sistema</h3>
            
            <ul className="space-y-6 relative z-10">
              <li className="flex items-start gap-4">
                <Zap className="text-yellow-400 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-xl">Inmediatez</p>
                  <p className="text-blue-100 text-sm">Visualiza el valor final del servicio de forma instantánea.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ShieldCheck className="text-blue-300 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-xl">Precisión Técnica</p>
                  <p className="text-blue-100 text-sm">Cálculos automáticos basados en peso, material y tipo de trabajo.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-blue-300 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-xl">Respaldo Oficial</p>
                  <p className="text-blue-100 text-sm">Recibe un desglose detallado directamente en tu correo electrónico.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Lado Derecho: Llamado a la Acción (CTA) */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center items-center text-center bg-white">
            <div className="mb-8 p-6 bg-blue-50 rounded-full text-[#0A59CC] animate-pulse">
              <Bot size={64} strokeWidth={1.5} />
            </div>
            
            <h4 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Listo para cotizar?
            </h4>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Selecciona entre <strong>Cañería, Acero Estructural o Mecanizado</strong> y obtén tu presupuesto ahora mismo.
            </p>

            <Link to="/chatbot" className="w-full">
              <Button 
                size="lg" 
                className="w-full h-16 bg-[#0A59CC] hover:bg-[#0847A3] text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-1 flex gap-3"
              >
                INICIAR COTIZACIÓN <ArrowRight />
              </Button>
            </Link>
            
            <p className="mt-6 text-xs text-slate-400 uppercase tracking-widest font-semibold">
              Proceso 100% Automatizado e Imediato
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cotizacion;