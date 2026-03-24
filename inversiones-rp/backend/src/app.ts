import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cotizacionRoutes from './routes/cotizacionRoutes';

dotenv.config();
const app = express();


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

app.use('/api', cotizacionRoutes);


app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

export default app;