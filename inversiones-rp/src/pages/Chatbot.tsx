"use client";

import { useState } from 'react';
import { useChatbot } from '../hooks/use-chatbot';
import { Send, ShieldCheck, User, Info } from 'lucide-react'; // Añadido Info aquí
import FileUpload from "@/components/FileUpload";
import Navbar from "@/components/Navbar";

interface UploadResponse {
  fileName?: string;
}

export default function ChatbotPage() {
  const [sessionId] = useState(() => `irp-session-${Date.now()}`);
  const { messages, sendMessage } = useChatbot();
  const [input, setInput] = useState('');

  const BOT_AVATAR = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"; 

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleUploadSuccess = (data: UploadResponse) => {
    sendMessage(`He subido el archivo técnico: ${data.fileName || 'Plano de cotización'}. Por favor, utilízalo para calcular mi presupuesto.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12 px-4 mt-20 max-w-7xl mx-auto w-full flex flex-col">
        
        <div className="w-full mb-10 text-center">
          <h1 className="text-3xl font-black text-[#011D4C] sm:text-4xl uppercase tracking-tighter">
            Plataforma de Cotización <span className="text-[#0A59CC]">Automatizada</span>
          </h1>
          <p className="mt-3 text-slate-600 text-lg font-medium">
            Sube tu plano y chatea con nuestro asistente técnico.
          </p>
        </div>
        
        {/* CONTENEDOR GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: CHATBOT */}
          <div className="lg:col-span-7 w-full flex flex-col h-[680px] bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden" role="main">
            
            <div className="bg-[#011D4C] px-8 py-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_12px_rgba(74,222,128,1)]" aria-hidden="true"></div>
                <span className="text-white font-bold tracking-[0.1em] text-sm uppercase">SISTEMA IRP ACTIVO</span>
              </div>
              <ShieldCheck className="text-white w-6 h-6" aria-label="Conexión segura" />
            </div>

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
                      m.sender === 'user' ? 'bg-[#0A59CC] text-white rounded-tr-none' : 'bg-white text-[#011D4C] border border-slate-200 rounded-tl-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <div className="flex gap-4">
                <input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#0A59CC] transition-all bg-slate-50 text-[#011D4C] text-lg font-medium"
                  placeholder="Escribe tu consulta técnica aquí..."
                />
                <button aria-label='btn'
                  onClick={handleSend}
                  className="bg-[#0A59CC] hover:bg-[#0847A3] text-white p-4 rounded-2xl transition-all transform active:scale-95 shadow-xl flex items-center justify-center min-w-[60px]"
                >
                  <Send size={28} />
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FILE UPLOAD E INFO */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:h-[680px] justify-between">
            <div className="flex-1">
              <FileUpload sessionId={sessionId} onSuccess={handleUploadSuccess} />
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4 text-[#011D4C]">
                <Info className="text-[#0A59CC]" />
                <h3 className="font-black uppercase tracking-tighter">Guía de Cotización</h3>
              </div>
              <div className="space-y-4 text-slate-600 text-sm font-medium">
                <p className="flex gap-2"><span className="text-[#0A59CC]">1.</span> Sube tu croquis o plano en PDF/Imagen.</p>
                <p className="flex gap-2"><span className="text-[#0A59CC]">2.</span> Detalla el material (Acero, Inoxidable, etc.) en el chat.</p>
                <p className="flex gap-2"><span className="text-[#0A59CC]">3.</span> Recibe un desglose técnico estimado al instante.</p>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[#0A59CC] text-xs font-bold uppercase">Nota de Seguridad</p>
                <p className="text-slate-500 text-[10px] mt-1 leading-tight">
                  Toda la documentación técnica es procesada bajo protocolos de confidencialidad industrial.
                </p>
              </div>
            </div>
          </div>

        </div> {/* AQUÍ CIERRA EL GRID */}

        <p className="mt-10 text-xs text-slate-500 font-bold uppercase tracking-wider text-center italic">
          Inversiones RP — Metalmecánica de Precisión
        </p>
      </main>
    </div>
  );
}