import { Router } from 'express';
import { crearCotizacion } from '../controllers/cotizacionController';
import {upload }from '../middleware/upload';

const router = Router();

// Ruta para recibir la cotización con opción de subir un archivo
router.post('/cotizar', upload.single('plano'), crearCotizacion);

export default router;