import { Router } from 'express';
import nodemailer from 'nodemailer';
import { userExists } from '../services/validations.js';
import jwt from 'jsonwebtoken';

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

  if (!(await userExists(email))) {
    return res.status(404).json({ message: 'El email no existe' });
  }

  // 🔐 Crear el token JWT con expiración de 15 minutos
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

  // 🔗 Link con token incluido
  const link = `http://localhost:5173/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Mi App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Restablecer contraseña',
    html: `
      <h1>Ha olvidado su contraseña</h1>
      <p>Haga clic en el siguiente enlace para restablecer su contraseña:</p>
      <a href="${link}">Restablecer contraseña</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
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