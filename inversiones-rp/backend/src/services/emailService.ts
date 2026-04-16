import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log("Configurando motor de correos para:", process.env.EMAIL_USER);

// Initialize SMTP transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});
// Verify connection configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error(" Error en la configuración de email:", error.message);
  } else {
    console.log("El servidor de correos está listo para enviar mensajes");
  }
});
interface DatosCotizacion {
  emailCliente: string;
  resumenIA: string; 
  tipoTrabajo?: string; 
  archivo?: {
    content: Buffer;
    filename: string;
    contentType: string;
  };
}

export const enviarCotizacionEmail = async (datos: DatosCotizacion) => {
  const mailOptions = {
    from: `"Inversiones RP" <${process.env.EMAIL_USER}>`,
    to: datos.emailCliente,
    bcc: ["comercial@inversionesrp.cl", process.env.EMAIL_USER],// Send hidden copy to company for technical follow-up
    subject: `Resumen de tu Cotización - IRP`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #0056b3;">Resumen de tu Cotización</h2>
        <p>Hola,</p>
        <p>Gracias por contactar a <strong>Inversiones RP</strong>. A continuación, te enviamos el detalle de lo conversado con nuestro asistente inteligente:</p>
        
        <div style="background-color: #f9f9f9; border-left: 4px solid #0056b3; padding: 15px; margin: 20px 0; white-space: pre-line;">
          ${datos.resumenIA}
        </div>

        <p>Nuestro equipo técnico revisará esta información y se pondrá en contacto contigo a la brevedad para formalizar el presupuesto.</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">
          Este es un correo automático enviado desde el asistente virtual de Inversiones RP.
        </p>
      </div>
   `,
    attachments: datos.archivo ? [
      {
        filename: datos.archivo.filename,
        content: datos.archivo.content, // RAM Buffer Attached
        contentType: datos.archivo.contentType
      }
    ] : []
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(` Email enviado exitosamente a: ${datos.emailCliente}`);
    return info;
  } catch (error) {
    console.error(" Error crítico en enviarCotizacionEmail:", error);
    throw error;
  }
};

  

  

 