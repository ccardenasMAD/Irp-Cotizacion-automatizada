import { useState } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

type Step = "BIENVENIDA" | "REGISTRO_TELEFONO" | "REGISTRO_EMPRESA" | "TIPO_TRABAJO" | "DETALLES_CANERIA" | "FINALIZADO";

interface CotizacionPayload {
    email: string;
    telefono: string;
    empresa: string;
    tipoTrabajo: string;
    detalles?: string;
  }

export const useChatbot = () => {
  const [step, setStep] = useState<Step>("BIENVENIDA");
  const [datos, setDatos] = useState({
    email: "",
    telefono: "",
    empresa: "",
    tipoTrabajo: "",
    detalles: ""
  });

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "¡Hola! Soy el asistente de IRP.", sender: "bot" },
    { id: "2", text: "Para comenzar con tu cotización, ¿cuál es tu correo electrónico?", sender: "bot" }
  ]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: "bot" }]);
  };

  // Función de envío movida fuera para limpieza
  //function for sending data to n8n
  const enviarAN8N = async (payload: CotizacionPayload) => {
    try {
      await fetch("http://localhost:5678/webhook-test/cotizacion-irp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log("Datos recibidos por n8n");
    } catch (e) {
      console.error(" Error de conexión con n8n:", e);
    }
  };

  // MAPA DE PASOS
  // STEP MAP
  const handleStep: Record<Step, (text: string) => void> = {
    BIENVENIDA: (text) => {
      // Usamos el callback de setDatos para asegurar que el objeto esté actualizado
      //use callback in setDatos to ensure we have the latest state when updating
      setDatos(prev => {
        const nuevos = { ...prev, email: text };
        addBotMessage("Gracias. Ahora, dinos un teléfono de contacto.");
        setStep("REGISTRO_TELEFONO");
        return nuevos;
      });
    },
    REGISTRO_TELEFONO: (text) => {
      setDatos(prev => {
        const nuevos = { ...prev, telefono: text };
        addBotMessage("¿En qué empresa o lugar trabajas?");
        setStep("REGISTRO_EMPRESA");
        return nuevos;
      });
    },
    REGISTRO_EMPRESA: (text) => {
      setDatos(prev => {
        const nuevos = { ...prev, empresa: text };
        addBotMessage("Perfecto. ¿Qué tipo de trabajo deseas? (Cañería, Acero estructural o Mecanizado)");
        setStep("TIPO_TRABAJO");
        return nuevos;
      });
    },
    TIPO_TRABAJO: (text) => {
      const seleccion = text.toLowerCase();
      setDatos(prev => {
        const nuevos = { ...prev, tipoTrabajo: seleccion };
        if (seleccion.includes("cañería")) {
          addBotMessage("Has elegido Cañería. Indica el diámetro y largo total.");
          setStep("DETALLES_CANERIA");
        } else {
          addBotMessage(`Entendido. Procesando tu solicitud de ${text}.`);
          enviarAN8N(nuevos); // send current data to n8n// Enviamos los datos actuales a n8n 
          setStep("FINALIZADO");
        }
        return nuevos;
      });
    },
    DETALLES_CANERIA: (text) => {
      setDatos(prev => {
        const finales = { ...prev, detalles: text };
        addBotMessage("Gracias por los detalles. Procesando tu cotización.");
        enviarAN8N(finales);
        setStep("FINALIZADO");
        return finales;
      });
    },
    FINALIZADO: () => {
      addBotMessage("Un asesor de IRP revisará tu caso pronto.");
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Agregar mensaje del usuario a la vista
    // 1. Add user message to view
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: "user" }]);

    // 2. Procesar el mensaje según el paso actual 
    // 2. Process message based on current step
    const accion = handleStep[step];
    if (accion) {
      accion(text);
    }
  };

  return { messages, sendMessage };
};