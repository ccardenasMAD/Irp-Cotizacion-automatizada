import { Target, Eye, Heart } from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Misión",
    text: "Entregar soluciones integrales y confiables al sector empresarial, mediante servicios y productos de calidad, adaptados a las necesidades de nuestros clientes, contribuyendo al desarrollo de sus operaciones.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Consolidarnos como una empresa referente en el valle del Choapa y la región, reconocida por su compromiso con la excelencia, la innovación y la capacidad de adaptación a los distintos rubros.",
  },
];

const valores = [
  "Compromiso con la calidad y la excelencia",
  "Responsabilidad y confiabilidad",
  "Innovación y mejora continua",
  "Enfoque en el cliente y sus necesidades",
];

const MisionVision = () => {
  return (
    <section id="quienes-somos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-6">
          Misión, Visión y Valores
        </h2>
        <div className="w-20 h-1 gradient-irp mx-auto mb-12 rounded-full" />
        
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Misión y Visión */}
          {items.map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-8 shadow-xl border border-steel/20 hover:shadow-2xl transition-all flex flex-col">
              <div className="w-14 h-14 gradient-irp rounded-lg flex items-center justify-center mb-6">
                <item.icon className="text-white" size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}

        
          <div className="bg-white rounded-xl p-8 shadow-xl border border-steel/20 hover:shadow-2xl transition-all flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 gradient-irp rounded-lg flex items-center justify-center shrink-0">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-navy">Valores</h3>
            </div>
            <ul className="space-y-4">
              {valores.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#0A59CC] mt-2 shrink-0" />
                  <span className="text-gray-600 text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MisionVision;