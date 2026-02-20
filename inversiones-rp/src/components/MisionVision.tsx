import { Target, Eye, Heart } from "lucide-react";
const items = [
  {
    icon: Target,
    title: "Misión",
    text: "Entregar soluciones integrales y confiables al sector empresarial, mediante servicios y productos de calidad, adaptados a las necesidades de nuestros clientes, contribuyendo al desarrollo de sus operaciones y al crecimiento sostenible de la región.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Consolidarnos como una empresa referente en el valle del Choapa y la región, reconocida por su compromiso con la excelencia, la innovación y la capacidad de adaptación a los distintos rubros en los que participa.",
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
    <section id="mision-vision" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
          Misión, Visión y Valores
        </h2>
        <div className="w-20 h-1 gradient-blue mx-auto mb-12 rounded-full" />
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {items.map((item) => (
            <div key={item.title} className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 gradient-blue rounded-lg flex items-center justify-center mb-4">
                <item.icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        {/* Valores */}
        <div className="bg-card rounded-lg p-8 shadow-md max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 gradient-navy rounded-lg flex items-center justify-center">
              <Heart className="text-primary-foreground" size={28} />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground">Valores</h3>
          </div>
          <ul className="space-y-3">
            {valores.map((v) => (
              <li key={v} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <span className="text-muted-foreground">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default MisionVision;