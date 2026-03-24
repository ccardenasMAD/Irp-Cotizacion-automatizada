import { useState } from "react";
import { useChatbot } from "@/hooks/use-chatbot";

const Chatbot = () => {
    const { messages, sendMessage } = useChatbot();
    const [input, setInput] = useState("");
  
    const handleSend = () => {
      if (!input.trim()) return;
      sendMessage(input);
      setInput("");
    };
  
    return (
      <div className="flex flex-col h-[500px] border rounded-lg bg-white shadow-sm">
       
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-[70%] ${
                msg.sender === "bot"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-600 text-white ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
  
        <div className="flex border-t p-2 bg-gray-50">
          <input
            aria-label="Escribe tu mensaje"
            placeholder="Escribe aquí..."
            className="flex-1 border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            aria-label="Enviar mensaje"
            className="ml-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    );
  };
  
  export default Chatbot;