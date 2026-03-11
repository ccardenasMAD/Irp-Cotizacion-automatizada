import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileCheck, Loader2 } from "lucide-react";

interface DetallesCotizacion {
  pesoTotal?: number;
  [key: string]: string | number | undefined; 
}

type TipoTrabajo = "" | "caneria" | "acero" | "mecanizado";

const Cotizacion = () => {
  const { toast } = useToast();
  const [tipo, setTipo] = useState<TipoTrabajo>("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<number | null>(null);

  // Estados para capturar los datos dinámicos
  const [registro, setRegistro] = useState({ email: "", telefono: "", empresa: "" });
  const [detalles, setDetalles] = useState<DetallesCotizacion>({});

  // Corregido: 'prev' ahora tiene su tipo explícito para evitar el error de 'any' implícito
  const handleDetalleChange = (campo: string, valor: string | number) => {
    setDetalles((prev: DetallesCotizacion) => ({ 
      ...prev, 
      [campo]: valor 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //  Validación de datos obligatorios para el cálculo inmediato
    if (!tipo || !detalles.pesoTotal) {
      toast({ 
        title: "Faltan datos", 
        description: "El peso total es obligatorio para el cálculo.", 
        variant: "destructive" 
      });
      return;
    }
   
  
    setLoading(true);

    // Usamos FormData para enviar el archivo y los datos al backend
    const formData = new FormData();
    formData.append("email", registro.email);
    formData.append("telefono", registro.telefono);
    formData.append("empresa", registro.empresa);
    formData.append("tipoTrabajo", tipo);
    formData.append("detalles", JSON.stringify(detalles));

    if (archivo) formData.append("plano", archivo);

    try {
      const response = await fetch("http://localhost:5001/api/cotizar", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();

      if (resData.success) {
        setResultado(resData.data.valorEstimado);
        toast({ 
          title: "¡Cotización Generada!", 
          description: `El valor estimado es $${resData.data.valorEstimado}. Se ha enviado un respaldo a su correo.`,
        });
      }else// Si el backend responde pero con un error (ej: error de validación)
      throw new Error(resData.mensaje || "Error en el servidor");

    } catch (error) {
      console.error("Error en el envío:", error);
      toast({ title: "Error de conexión", description: "No se pudo contactar con el servidor.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cotizacion" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-6">
          Cotización Automática
        </h2>
        <div className="w-20 h-1 gradient-irp mx-auto mb-4 rounded-full" />
        
        {resultado && (
          <div className="max-w-2xl mx-auto mb-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center animate-bounce">
            <p className="text-green-800 font-bold text-xl">Valor Estimado: ${resultado}</p>
            <p className="text-green-600 text-sm">Cálculo basado en las especificaciones ingresadas</p>
          </div>
        )}

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
                placeholder="Empresa *"
                required
                value={registro.empresa}
                onChange={(e) => setRegistro({ ...registro, empresa: e.target.value })}
                className="sm:col-span-2"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-steel/20">
            <h3 className="font-heading font-bold text-navy mb-3">Carga de plano o croquis</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-steel/30 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {archivo ? <FileCheck className="w-8 h-8 mb-2 text-green-600" /> : <Upload className="w-8 h-8 mb-2 text-gray-400" />}
                <p className="text-sm text-gray-500">{archivo ? archivo.name : "Subir plano (opcional)"}</p>
              </div>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setArchivo(e.target.files?.[0] || null)} />
            </label>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-navy mb-4">Tipo de trabajo</h3>
            <Select value={tipo} onValueChange={(v) => { setTipo(v as TipoTrabajo); setDetalles({}); }}>
              <SelectTrigger><SelectValue placeholder="Seleccione tipo de trabajo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="caneria">Cañería</SelectItem>
                <SelectItem value="acero">Acero estructural</SelectItem>
                <SelectItem value="mecanizado">Mecanizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Formulario Dinámico según Tipo */}
          {tipo === "caneria" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Diámetro (pulg)" type="number" onChange={(e) => handleDetalleChange("diametro", e.target.value)} />
              <Input placeholder="Largo total" type="number" onChange={(e) => handleDetalleChange("largo", e.target.value)} />
              <Input placeholder="Peso total (kg) *" type="number" required className="sm:col-span-2 bg-blue-50" onChange={(e) => handleDetalleChange("pesoTotal", e.target.value)} />
            </div>
          )}

          {tipo === "acero" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Peso total estructura (kg) *" type="number" required className="sm:col-span-2 bg-blue-50" onChange={(e) => handleDetalleChange("pesoTotal", e.target.value)} />
            </div>
          )}

          {tipo === "mecanizado" && (
            <div className="grid sm:grid-cols-2 gap-4">
               <Select onValueChange={(v) => handleDetalleChange("tipoMecanizado", v)}>
                <SelectTrigger><SelectValue placeholder="Tipo de máquina" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="torno">Torno</SelectItem>
                  <SelectItem value="centro">Centro de Mecanizado</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Peso total (kg) *" type="number" required className="sm:col-span-2 bg-blue-50" onChange={(e) => handleDetalleChange("pesoTotal", e.target.value)} />
            </div>
          )}

        <Button 
  type="submit" 
  disabled={loading} 
  size="lg" 
  className="w-full bg-[#0A59CC] hover:bg-[#0847A3] text-white font-semibold transition-colors"
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Procesando...
    </>
  ) : (
    "Solicitar cotización"
  )}
        </Button>  
        </form>
      </div>
    </section>
  );
};

export default Cotizacion;