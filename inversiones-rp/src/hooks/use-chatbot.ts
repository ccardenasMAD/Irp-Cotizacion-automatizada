import { useState } from "react";


interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hola, soy el asistente de IRP. ¿En qué puedo ayudarte hoy?", sender: "bot" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // 1. Agregar el mensaje del usuario inmediatamente
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Timeout control to prevent hanging requests
    const controller = new AbortController();
     const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
     // send the message to n8n webhook and wait for the response
        const response = await fetch("http://127.0.0.1:5001/api/chat",{ 
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          chatInput: text, // n8n will receive this as $json["chatInput"] in the workflow
          sessionId: "irp-session-2026" 
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();
      
      // n8n will AI response in either data.output or data.text depending on how you set it up, so we check both
      const botResponse = data.output || data.text || "Recibí tu mensaje, pero hubo un problema al procesar la respuesta.";

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: botResponse, 
        sender: "bot" 
      }]);

    } catch (e) {
      console.error("Error en el chatbot:", e);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: "Lo siento, tengo problemas de conexión con mi base de datos. Por favor, intenta de nuevo en unos minutos.", 
        sender: "bot" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};