import { Building2, Home, Package, Wrench } from "lucide-react";
const serviciosBg = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80";

const servicios = [
  {
    icon: Building2,
    title: "Alojamiento empresarial",
    desc: "Servicios complementarios de alojamiento para empresas del sector minero e industrial.",
  },
  {
    icon: Home,
    title: "Arriendo de dependencias",
    desc: "Espacios e infraestructura para operaciones empresariales en la región.",
  },
  {
    icon: Package,
    title: "Suministros y repuestos",
    desc: "Accesorios, partes y repuestos para empresas de la pequeña minería.",
  },
  {
    icon: Wrench,
    title: "Soluciones operativas",
    desc: "Soluciones orientadas a optimizar las operaciones de los clientes.",
  },
];

const Servicios = () => {
  return (
    <section id="servicios" className="relative py-20 overflow-hidden">
      {/* Fondo con Overlay */}
      <div className="absolute inset-0">
        <img src={serviciosBg} alt="Servicios mineros" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/90" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-6">
          Servicios y Proyectos
        </h2>
        <div className="w-20 h-1 gradient-irp mx-auto mb-12 rounded-full" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((s) => (
            <div
              key={s.title}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-14 h-14 gradient-irp rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <s.icon className="text-white" size={26} />
              </div>
              <h3 className="font-heading font-bold text-white mb-2">{s.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;