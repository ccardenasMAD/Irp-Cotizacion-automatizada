import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cotizacionRoutes from './routes/cotizacionRoutes';

dotenv.config();
const app = express();

// 1. CORS - Debe ir antes que cualquier otra cosa
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 2. Middlewares de datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Log de depuración
app.use((req, res, next) => {
  console.log(`⚡ ${req.method} ${req.url}`);
  next();
});

// 4. Rutas
app.use('/api', cotizacionRoutes);

// Manejo de errores 404/500 para evitar que el navegador se quede esperando
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

export default app;