
import fetch from 'node-fetch';
import { Router } from 'express';
import { crearCotizacion,enviarEmailCotizacion } from '../controllers/cotizacionController';
import {upload }from '../middleware/upload';
import { enviarCotizacionEmail } from '../services/emailService';


const router = Router();


router.post('/cotizar', upload.single('plano'), crearCotizacion);
router.post('/enviar-email', enviarEmailCotizacion);
router.post('/chat', async (req, res) => {
    const { chatInput, sessionId } = req.body;
  
    try {
        const { chatInput, sessionId } = req.body;
      // El backend le pide la respuesta a n8n
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

      const emailEncontrado = chatInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];
    
      if (emailEncontrado && botResponse.length > 20) {
      console.log("Enviando correo automático...");
      await enviarCotizacionEmail({
        emailCliente: emailEncontrado,
        resumenIA: botResponse
      }).catch(err => console.error("Error enviando email:", err));
    }

    // 3. Respuesta al Frontend
    return res.json(data);

  } catch (error) {
    console.error("Error en el flujo de chat:", error);
    return res.status(500).json({ error: "Hubo un error al procesar tu mensaje." });
  }
});


export default router;