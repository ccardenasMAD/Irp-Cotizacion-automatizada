import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type TipoTrabajo = "" | "caneria" | "acero" | "mecanizado";

const Cotizacion = () => {
  const { toast } = useToast();
  const [tipo, setTipo] = useState<TipoTrabajo>("");
  const [registro, setRegistro] = useState({ email: "", telefono: "", empresa: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDACIÓN: Correo, Teléfono y Empresa son obligatorios
    if (!registro.email.trim() || !registro.telefono.trim() || !registro.empresa.trim()) {
      toast({ 
        title: "Datos incompletos", 
        description: "Por favor, ingrese su correo, teléfono y empresa para recibir la cotización de manera inmediata.", 
        variant: "destructive" 
      });
      return;
    }

    if (!tipo) {
      toast({ title: "Selecciona un tipo de trabajo", variant: "destructive" });
      return;
    }

    toast({ title: "¡Cotización enviada!", description: "Revisa tu correo pronto." });
  };

  return (
    <section id="cotizacion" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-6">
          Cotización Automática
        </h2>
        <div className="w-20 h-1 gradient-irp mx-auto mb-4 rounded-full" />
        <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
          Genera cotizaciones de manera simple y rápida. Obtén el valor estimado de forma inmediata.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8 space-y-6 border border-steel/30">
          <div>
            <h3 className="font-heading font-bold text-navy mb-4 border-b border-steel/20 pb-2">Datos de contacto</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Correo electrónico *"
                type="email"
                required
                value={registro.email}
                onChange={(e) => setRegistro({ ...registro, email: e.target.value })}
              />
              <Input
                placeholder="Teléfono de contacto *"
                required
                value={registro.telefono}
                onChange={(e) => setRegistro({ ...registro, telefono: e.target.value })}
              />
              <Input
                placeholder="Lugar o empresa donde trabaja *"
                required
                value={registro.empresa}
                onChange={(e) => setRegistro({ ...registro, empresa: e.target.value })}
                className="sm:col-span-2"
              />
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-navy mb-4">Tipo de trabajo</h3>
            <Select value={tipo} onValueChange={(v) => setTipo(v as TipoTrabajo)}>
              <SelectTrigger className="border-steel">
                <SelectValue placeholder="Seleccione tipo de trabajo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="caneria">Cañería</SelectItem>
                <SelectItem value="acero">Acero estructural</SelectItem>
                <SelectItem value="mecanizado">Mecanizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bloques condicionales según el tipo de trabajo */}
          {tipo === "caneria" && (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
              <Input placeholder="Diámetro (pulgadas)" type="number" />
              <Input placeholder="Largo total (m)" type="number" />
              <Select>
                <SelectTrigger><SelectValue placeholder="Tipo de acoplamiento" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="victaulic">Victaulic</SelectItem>
                  <SelectItem value="flange">Flange</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Peso total (kg)" type="number" />
            </div>
          )}

          {tipo === "acero" && (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
              <Select>
                <SelectTrigger><SelectValue placeholder="Tipo de estructura" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cuadrado">Perfil cuadrado</SelectItem>
                  <SelectItem value="angulo">Ángulo</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Peso total (kg)" type="number" />
            </div>
          )}

          {tipo === "mecanizado" && (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
              <Select>
                <SelectTrigger><SelectValue placeholder="Material" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="acero-carbono">Acero carbono</SelectItem>
                  <SelectItem value="bronce">Bronce</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Peso total (kg)" type="number" />
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-[#0A59CC] text-white font-heading font-semibold hover:bg-[#0847A3] transition-all"
          >
            Solicitar cotización
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Cotizacion;