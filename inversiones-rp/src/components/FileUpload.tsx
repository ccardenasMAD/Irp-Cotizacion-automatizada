"use client";

import { useState } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; 


interface UploadResponse {
    fileName?: string;
  }


interface FileUploadProps {
  sessionId: string;
  onSuccess: (data: UploadResponse) => void;
}

export default function FileUpload({ sessionId, onSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("plano", file);
    formData.append("sessionId", sessionId);

    try {
      const response = await fetch("http://localhost:5001/api/cotizar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir archivo");

      const data = await response.json();
      toast({ title: "¡Éxito!", description: "Plano vinculado correctamente." });
      onSuccess(data); // Avisa a la página principal
    } catch  {
      toast({ 
        title: "Error", 
        description: "No se pudo subir el archivo.", 
        variant: "destructive" 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-200 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-[#011D4C] font-bold text-lg mb-4 uppercase tracking-wider">
          Anexar Plano Técnico
        </h3>
        
        {!file ? (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 hover:border-[#0A59CC] hover:bg-slate-50 cursor-pointer transition-all">
            <Upload size={40} className="text-slate-300 mb-2" />
            <span className="text-slate-500 font-medium text-sm">PDF, JPG o PNG</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              accept=".pdf,.jpg,.png"
            />
          </label>
        ) : (
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-blue-100">
            <FileText className="text-[#0A59CC]" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-[#011D4C]">{file.name}</p>
              <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button aria-label="btn" onClick={() => setFile(null)}><X size={18} className="text-slate-400" /></button>
          </div>
        )}
      </div>

      {file && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full mt-4 bg-[#0A59CC] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0847A3] transition-all disabled:opacity-50 shadow-lg"
        >
          {isUploading ? "Subiendo..." : "Vincular a Cotización"}
          <CheckCircle size={20} />
        </button>
      )}
    </div>
  );
}