import { Request, Response } from 'express';
import { Cotizacion } from '../models/Cotizacion';
import { calcularPresupuesto } from '../services/calculoService';
import { enviarCotizacionEmail } from '../services/emailService'; 

export const crearCotizacion = async (req: Request, res: Response) => {
  try {
    const { email, telefono, empresa, tipoTrabajo, detalles } = req.body;
    const detallesParsed = typeof detalles === 'string' ? JSON.parse(detalles) : detalles;
    const planoUrl = req.file ? req.file.path : undefined;

    const valorEstimado = calcularPresupuesto(tipoTrabajo, detallesParsed);

    const nuevaCotizacion = new Cotizacion({
      email,
      telefono,
      empresa,
      tipoTrabajo,
      detalles: detallesParsed,
      planoUrl,
      valorEstimado
    });

    await nuevaCotizacion.save();

   
  
    try {
      // Send courtesy email to client and BCC to company for technical validation. We include the estimated value and type of work in the email body.
      await enviarCotizacionEmail({
        emailCliente: email,
        resumenIA: `Cotización para ${tipoTrabajo}. Valor estimado: $${valorEstimado}`, 
        tipoTrabajo: tipoTrabajo,
        rutaArchivo: planoUrl // Attachment included for technical review
      });

      console.log(` Correo enviado a: ${email}`);
    } catch (mailError) {
      console.error("El registro se guardó pero el mail falló:", mailError);
    }

    return res.status(201).json({
      success: true,
      mensaje: "Cotización generada exitosamente",
      data: {
        valorEstimado,
        id: nuevaCotizacion._id
      }
    });

  } catch (error) {
    console.error("Error en cotización:", error);
    return res.status(500).json({
      success: false,
      mensaje: "Error al procesar la cotización automática"
    });
  }
}
  export const enviarEmailCotizacion = async (req: Request, res: Response) => {
    try {
      const { emailCliente, resumenIA } = req.body;
      
      if (!emailCliente || !resumenIA) {
        return res.status(400).json({ success: false, mensaje: "Faltan datos" });
      }
     // Direct trigger for manual or AI-driven email sending
      await enviarCotizacionEmail({ emailCliente, resumenIA });
      
      return res.status(200).json({ success: true, mensaje: "Email enviado" });
    } catch (error) {
      console.error("Error enviando email:", error);
      return res.status(500).json({ success: false, mensaje: "Error al enviar email" });
    }
  };
  
