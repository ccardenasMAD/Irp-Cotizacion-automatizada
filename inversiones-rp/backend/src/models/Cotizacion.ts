import { Schema, model } from 'mongoose';

const CotizacionSchema = new Schema({

  email: { type: String, required: true },
  telefono: { type: String, required: true },
  empresa: { type: String, required: true },
  
  // Restricted to specific service categories to ensure accurate cost estimation
  tipoTrabajo: { 
    type: String, 
    required: true, 
    enum: ['caneria', 'acero', 'mecanizado'] 
  },


  detalles: { type: Object, required: true },

  planoUrl: { type: String },

  // AI-generated cost estimation based on the provided details and industry standards
  valorEstimado: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});


export const Cotizacion = model('Cotizacion', CotizacionSchema);