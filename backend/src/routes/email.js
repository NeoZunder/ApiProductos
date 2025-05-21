import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
});

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

router.get('/', (req, res) => {
  res.json({ message: 'user and pass '+ user+ ' ' + pass });
});

router.post('/resetPassword', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'El email es requerido' });
  }

  const mailOptions = {
    from: `"Mi App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email de prueba',
    html: '<h1>Ha Olvidado Su Contraseña</h1><br><a href="http://localhost:5173/reset-password"> Presione Aqui Para Cambiar Su Contraseña</a>',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
    res.json({ message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ message: 'Error al enviar el email' });
  }
});

export default router;