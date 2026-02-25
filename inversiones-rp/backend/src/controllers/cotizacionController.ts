import { Request, Response } from 'express';
import { Cotizacion } from '../models/Cotizacion';
import { calcularPresupuesto } from '../services/calculoService';

export const crearCotizacion = async (req: Request, res: Response) => {
  try {
  
    const { email, telefono, empresa, tipoTrabajo, detalles } = req.body;
    
    // Parseamos los detalles si vienen como string (común al usar FormData con archivos)
    const detallesParsed = typeof detalles === 'string' ? JSON.parse(detalles) : detalles;

    // Si hay un archivo (plano/croquis), guardamos su ruta
    const planoUrl = req.file ? req.file.path : undefined;

    //  Calculamos el valor estimado de forma inmediata
    const valorEstimado = calcularPresupuesto(tipoTrabajo, detallesParsed);

    // Creamos el registro en la base de datos
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

    //  Enviamos respuesta inmediata al usuario con el valor final
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