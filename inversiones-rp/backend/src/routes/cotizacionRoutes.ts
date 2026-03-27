
import fetch from 'node-fetch';
import { Router } from 'express';
import { crearCotizacion,enviarEmailCotizacion } from '../controllers/cotizacionController';
import {upload }from '../middleware/upload';
import { enviarCotizacionEmail } from '../services/emailService';


const router = Router();

const sessionFiles: { 
  [key: string]: { content: Buffer; filename: string; contentType: string } 
} = {};

router.post('/cotizar', upload.single('plano'), (req, res, next) => {// If there is a file and a sessionId, we save it in our temporary storage.
  if (req.file && req.body.sessionId) {
    sessionFiles[req.body.sessionId] = {
      content: req.file.buffer,     
      filename: req.file.originalname,
      contentType: req.file.mimetype
  };
  console.log(`Archivo binario vinculado a sesión (RAM): ${req.body.sessionId}`);
  }
  crearCotizacion(req, res); 
});

router.post('/enviar-email', enviarEmailCotizacion);

router.post('/chat', async (req, res) => {
    
  const { chatInput, sessionId } = req.body;
  
    try {
        
   // Extract client email from AI text using Regex
      const n8nResponse = await fetch("http://localhost:5678/webhook/21cf491f-fef8-432f-8981-ac92fc8e9c11/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput, sessionId })
      });
  
      if (!n8nResponse.ok) {
        throw new Error(`Error en n8n: ${n8nResponse.statusText}`);
      }
      const data: any = await n8nResponse.json();
      const botResponse = data.output || data.text|| "La IA no devolvió una respuesta clara.";

      // Trigger email automation when specific AI keyword is detected
      const customerEmail = botResponse.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];

     // We only fire if we detect the email and keyword from the quote
        if (customerEmail && botResponse.includes("VALOR ESTIMADO")) {
            console.log(" Cotización final detectada para:", customerEmail);

            const fileData = sessionFiles[sessionId];
            if (!fileData) {
              console.warn(`Advertencia: No se encontró un plano para la sesión ${sessionId}`);
          }
            // We send the 'file' object with the Buffer to the service
            await enviarCotizacionEmail({
                emailCliente: customerEmail,
                resumenIA: botResponse,
                archivo: fileData // We pass the complete object (content, filename, contentType)
              }).catch(err => console.error(" Error enviando email:", err));


         delete sessionFiles[sessionId];
        console.log(` Memoria de archivo limpiada para sesión: ${sessionId}`);

          }
    

          return res.json(data);

        } catch (error) {
          console.error(" Error en el flujo de chat:", error);
          return res.status(500).json({ error: "Hubo un error al procesar tu mensaje." });
        }
      });

export default router;