import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

//define the step types for the chatbot flow
type Step = "BIENVENIDA" | "REGISTRO_CORREO" | "REGISTRO_TELEFONO" | "REGISTRO_EMPRESA" | "TIPO_TRABAJO" | "DETALLES_CANERIA" | "FINALIZADO";

export const useChatbot = () => {
  const [step, setStep] = useState<Step>("BIENVENIDA");
  const [datos, setDatos] = useState({
    email: "",
    telefono: "",
    empresa: "",
    tipoTrabajo: "",
  });

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "¡Hola! Soy el asistente de IRP.", sender: "bot" },
    { id: "2", text: "Para comenzar con tu cotización, ¿cuál es tu correo electrónico?", sender: "bot" }
  ]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: "bot" }]);
  };

  const sendMessage = async (text: string) => {
    // added user message to the chat
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

   
    switch (step) {
      case "BIENVENIDA":
        setDatos({ ...datos, email: text });
        addBotMessage("Gracias. Ahora, dinos un teléfono de contacto.");
        setStep("REGISTRO_TELEFONO");
        break;

      case "REGISTRO_TELEFONO":
        setDatos({ ...datos, telefono: text });
        addBotMessage("¿En qué empresa o lugar trabajas?");
        setStep("REGISTRO_EMPRESA");
        break;

      case "REGISTRO_EMPRESA":
        setDatos({ ...datos, empresa: text });
        addBotMessage("Perfecto. ¿Qué tipo de trabajo deseas cotizar? (Cañería, Acero estructural o Mecanizado)");
        setStep("TIPO_TRABAJO");
        break;

      case "TIPO_TRABAJO":{ 
        const seleccion = text.toLowerCase();
        setDatos({ ...datos, tipoTrabajo: seleccion });
        
        if (seleccion.includes("cañería")) {
          addBotMessage("Has elegido Cañería. Por favor, indica el diámetro y largo total.");
          setStep("DETALLES_CANERIA");
        } else {
          addBotMessage("Entendido. Procesando tu solicitud de " + text);
          // Here call the api to get the quote based on the type of work and user data
          setStep("FINALIZADO");
        }
        break;
    }

      default:
        addBotMessage("Un asesor de IRP revisará tu caso pronto.");
    }
  };


  return { messages, sendMessage };
};