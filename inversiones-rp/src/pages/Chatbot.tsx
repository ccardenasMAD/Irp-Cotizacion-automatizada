"use client"; // Si usas Next.js App Router

import  { useState } from 'react';
import { useChatbot } from '../hooks/use-chatbot'; // Ajusta la ruta a tu hook

export default function ChatbotPage() {
  const { messages, sendMessage } = useChatbot();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    // Contenedor principal: Ocupa el alto de la pantalla menos el posible header
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
    
      <div className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Asistente de Cotización <span className="text-blue-700 underline">IRP</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Responde unas breves preguntas para procesar tu solicitud técnica.
        </p>
      </div>

      {/* Contenedor del Chat (Estructura de Página) */}
      <div className="w-full max-w-3xl flex flex-col h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Barra de estado / Identidad visual */}
        <div className="bg-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
            <span className="text-white font-medium tracking-wide">SISTEMA DE ASISTENCIA IRP EN LÍNEA</span>
          </div>
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        {/* Zona de conversación (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              <div className={`flex max-w-[85%] items-end gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar Visual (Figuras) */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md ${
                  m.sender === 'user' ? 'bg-blue-600' : 'bg-slate-800'
                }`}>
                  {m.sender === 'user' ? (
                    <span className="text-xs text-white font-bold">TÚ</span>
                  ) : (
                    <span className="text-xs text-white font-bold">IRP</span>
                  )}
                </div>

                {/* Burbuja de Texto */}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-blue-700 text-white rounded-br-none border-blue-800'
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                }`}>
                  {m.text}
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="p-5 bg-slate-50 border-t border-slate-200">
          <div className="flex gap-3">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-inner bg-white text-slate-900"
              placeholder="Escriba su respuesta aquí..."
            />
            <button 
              onClick={handleSend}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 flex items-center shadow-lg gap-2"
            >
              ENVIAR
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 text-center uppercase tracking-widest">
            Inversiones RP - Automatización de Cotizaciones 2026
          </p>
        </div>
      </div>
    </div>
  );
}