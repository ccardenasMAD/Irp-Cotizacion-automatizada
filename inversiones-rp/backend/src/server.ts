import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// 1. Levantamos el servidor de inmediato
app.listen(PORT, () => {
  console.log(`🚀 Servidor encendido en: http://localhost:${PORT}`);
});

// 2. Intentamos conectar a Mongo en segundo plano
if (!MONGO_URI) {
  console.error(" ERROR: No hay MONGO_URI en el archivo .env");
} else {
  mongoose.connect(MONGO_URI)
    .then(() => console.log(' Conectado a MongoDB'))
    .catch(err => console.error(' Error de conexión a MongoDB:', err));
}