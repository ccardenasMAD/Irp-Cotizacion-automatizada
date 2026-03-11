import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log(" Intentando configurar correo con:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error(" Error en la configuración de email:", error.message);
  } else {
    console.log("El servidor de correos está listo para enviar mensajes");
  }
});
// ------------------------------------

export const enviarCotizacionEmail = async (emailCliente: string, datos: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailCliente,
    subject: `Tu Cotización Automática - IRP`,
    html: `
      <h1>Resumen de tu Cotización</h1>
      <p>Gracias por confiar en IRP. Aquí tienes los detalles de tu presupuesto:</p>
      <ul>
        <li><strong>Tipo de Trabajo:</strong> ${datos.tipoTrabajo}</li>
        <li><strong>Valor Estimado:</strong> $${datos.valorEstimado}</li>
      </ul>
      <p>Nos pondremos en contacto contigo pronto para validar los detalles técnicos.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};