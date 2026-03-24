"use client";

import { useState } from 'react';
import { useChatbot } from '../hooks/use-chatbot';
import { Send, ShieldCheck, User } from 'lucide-react';

export default function ChatbotPage() {
  const { messages, sendMessage } = useChatbot();
  const [input, setInput] = useState('');

  const BOT_AVATAR = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"; 

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center font-sans">
      
      <div className="w-full max-w-3xl mb-10 text-center">
        <h1 className="text-3xl font-black text-[#011D4C] sm:text-4xl uppercase tracking-tighter">
          Asistente de Cotización <span className="text-[#0A59CC]">IRP</span>
        </h1>
        <p className="mt-3 text-slate-600 text-lg font-medium">
          Soluciones inteligentes en calderería y mecanizado.
        </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col h-[650px] bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden" role="main">
        
        {/* Cabecera con contraste alto */}
        <div className="bg-[#011D4C] px-8 py-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_12px_rgba(74,222,128,1)]" aria-hidden="true"></div>
            <span className="text-white font-bold tracking-[0.1em] text-sm uppercase">SISTEMA IRP ACTIVO</span>
          </div>
          <ShieldCheck className="text-white w-6 h-6" aria-label="Conexión segura" />
        </div>

        {/* Zona de mensajes con texto más grande para legibilidad */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#F8FAFC]">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0 border-2 bg-white ${
                  m.sender === 'user' ? 'border-blue-200' : 'border-slate-100'
                }`}>
                  {m.sender === 'user' ? (
                    <User size={24} className="text-[#0A59CC]" aria-label="Tú" />
                  ) : (
                    <img src={BOT_AVATAR} alt="Asistente Virtual IRP" className="w-10 h-10 object-contain p-1" />
                  )}
                </div>

                <div className={`p-5 rounded-3xl text-base font-semibold leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-[#0A59CC] text-white rounded-tr-none'
                    : 'bg-white text-[#011D4C] border border-slate-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input con accesibilidad corregida */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex gap-4">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#0A59CC] transition-all bg-slate-50 text-[#011D4C] text-lg font-medium"
              placeholder="Escribe tu consulta técnica aquí..."
              aria-label="Mensaje para el asistente"
            />
            <button 
              onClick={handleSend}
              title="Enviar mensaje"
              aria-label="Enviar mensaje"
              className="bg-[#0A59CC] hover:bg-[#0847A3] text-white p-4 rounded-2xl transition-all transform active:scale-95 shadow-xl flex items-center justify-center min-w-[60px]"
            >
              <Send size={28} />
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500 font-bold uppercase tracking-wider text-center italic">
            Inversiones RP — Metalmecánica de Precisión
          </p>
        </div>
      </div>
    </div>
  );
}