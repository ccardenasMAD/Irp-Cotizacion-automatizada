import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      toast({ title: "Por favor completa los campos requeridos", variant: "destructive" });
      return;
    }
    toast({ title: "¡Mensaje enviado!", description: "Nos pondremos en contacto pronto." });
    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-6">
          Contacto
        </h2>
        <div className="w-20 h-1 gradient-irp mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              ¿Tienes alguna consulta o necesitas un presupuesto? Contáctanos y te responderemos a la brevedad.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 gradient-irp rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-navy text-sm">Correo</p>
                  <p className="text-gray-500 text-sm">contacto@inversionesrp.cl</p>
                </div>
              </div>
           
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Nombre *"
              className="border-steel focus:border-primary"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
       
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-[#0A59CC] text-white font-heading font-semibold hover:bg-navy transition-colors"
            >
              Enviar mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;