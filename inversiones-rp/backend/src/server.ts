import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carga las variables de entorno (.env)
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Conexión a la base de datos para guardar los registros
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    // Solo levantamos el servidor si la base de datos está lista
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Esperando cotizaciones en http://localhost:${PORT}/api/cotizar`);
    });
  })
  .catch(err => {
    console.error('Error crítico de conexión a MongoDB:', err);
  });