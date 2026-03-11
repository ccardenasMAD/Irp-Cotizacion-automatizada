import { Request, Response } from 'express';
import { Cotizacion } from '../models/Cotizacion';
import { calcularPresupuesto } from '../services/calculoService';
// 1. IMPORTA LA FUNCIÓN QUE CREASTE
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

    // 2. LLAMA A LA FUNCIÓN DE EMAIL AQUÍ
    // Usamos try/catch interno para que si el mail falla, 
    // el usuario igual reciba su número de cotización.
    try {
      await enviarCotizacionEmail(email, {
        tipoTrabajo,
        valorEstimado
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
};