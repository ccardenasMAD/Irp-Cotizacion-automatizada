import { Schema, model } from 'mongoose';

const CotizacionSchema = new Schema({

  email: { type: String, required: true },
  telefono: { type: String, required: true },
  empresa: { type: String, required: true },
  
  tipoTrabajo: { 
    type: String, 
    required: true, 
    enum: ['caneria', 'acero', 'mecanizado'] 
  },


  detalles: { type: Object, required: true },

  // Archivo de plano
  planoUrl: { type: String },

  // Resultado
  valorEstimado: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});


export const Cotizacion = model('Cotizacion', CotizacionSchema);