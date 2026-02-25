import express from 'express';
import cors from 'cors';
import cotizacionRoutes from './routes/cotizacionRoutes';

const app = express();

// Configuración de middlewares
app.use(cors()); // Permite que tu frontend se comunique con el backend
app.use(express.json()); // Necesario para procesar los datos del formulario

// Rutas de la API
app.use('/api', cotizacionRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('Servidor IRP operando correctamente');
});

export default app; // Esta línea es la que soluciona el error en server.ts