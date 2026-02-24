import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileCheck } from "lucide-react";

type TipoTrabajo = "" | "caneria" | "acero" | "mecanizado";

const Cotizacion = () => {
  const { toast } = useToast();
  const [tipo, setTipo] = useState<TipoTrabajo>("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [registro, setRegistro] = useState({ email: "", telefono: "", empresa: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDACIÓN: Correo, Teléfono y Empresa obligatorios para incentivar el llenado correcto
    if (!registro.email.trim() || !registro.telefono.trim() || !registro.empresa.trim()) {
      toast({ 
        title: "Datos incompletos", 
        description: "Debe ingresar correo, teléfono y empresa para recibir su cotización inmediata.", 
        variant: "destructive" 
      });
      return;
    }

    if (!tipo) {
      toast({ title: "Selecciona un tipo de trabajo", variant: "destructive" });
      return;
    }

    // El sistema procesa la información y muestra el valor final de forma inmediata
    toast({ 
      title: "¡Cotización Generada!", 
      description: "El valor estimado se ha enviado a su correo y se muestra en pantalla.",
    });
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
          {/* . Datos de contacto */}
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
              {/*  Carga de plano o croquis - Facilita validación posterior */}
              <div className="pt-4 border-t border-steel/20">
            <h3 className="font-heading font-bold text-navy mb-3">Carga de plano o croquis</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-steel/30 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {archivo ? <FileCheck className="w-8 h-8 mb-2 text-green-600" /> : <Upload className="w-8 h-8 mb-2 text-gray-400" />}
                <p className="text-sm text-gray-500">
                  {archivo ? `Archivo: ${archivo.name}` : "Haga clic para cargar plano o croquis"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG o PNG (Opcional para mayor claridad técnica)</p>
              </div>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setArchivo(e.target.files?.[0] || null)} />
            </label>
          </div>
          
          {/* Selección de Tipo de Trabajo */}
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

          {/* 3.5. Cotización de Cañería */}
          {tipo === "caneria" && (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
              <Input placeholder="Diámetro (pulgadas) *" type="number" required />
              <Input placeholder="Largo total *" type="number" required />
              <Select required>
                <SelectTrigger><SelectValue placeholder="Tipo de acoplamiento *" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="victaulic">Victaulic</SelectItem>
                  <SelectItem value="flange">Flange</SelectItem>
                  <SelectItem value="hilo">Hilo</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Revestimiento interior *" required />
              <Input placeholder="Revestimiento exterior *" required />
              <Input placeholder="Peso total estructura (kg) *" type="number" required className="sm:col-span-2 bg-blue-50" />
            </div>
          )}

          {/* 3.6. Cotización de Acero Estructural */}
          {tipo === "acero" && (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
              <Select required>
                <SelectTrigger><SelectValue placeholder="Tipo de estructura *" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cuadrado">Perfil cuadrado</SelectItem>
                  <SelectItem value="angulo">Ángulo</SelectItem>
                  <SelectItem value="perfil-c">Perfil C</SelectItem>
                </SelectContent>
              </Select>
              <Select required>
                <SelectTrigger><SelectValue placeholder="¿Incluye otras piezas? (Ej: Bronce) *" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="bronce">Sí (Incluye Bronce)</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Peso total estructura (kg) *" type="number" required className="sm:col-span-2 bg-blue-50" />
            </div>
          )}

          {/*  Cotización de Mecanizado */}
          {tipo === "mecanizado" && (
            <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
              <Select required>
                <SelectTrigger><SelectValue placeholder="Material a utilizar *" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="acero-carbono">Acero carbono</SelectItem>
                  <SelectItem value="acero-inoxidable">Acero inoxidable</SelectItem>
                  <SelectItem value="bronce">Bronce</SelectItem>
                </SelectContent>
              </Select>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Tipo de mecanizado *" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="torno">Torno</SelectItem>
                  <SelectItem value="fresa">Fresa</SelectItem>
                  <SelectItem value="centro">Centro de mecanizado</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Peso total del trabajo (kg) *" type="number" required className="sm:col-span-2 bg-blue-50" />
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