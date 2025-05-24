import express from 'express';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcrypt';
import { userExists } from '../services/validations.js';
import  { PrismaClient }  from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 1000,
  max: 3,
  message: { message: "Demasiados intentos, esperá un poco." }
});

router.post('/', (req, res) => {
  res.json({ message: "Login route" });
});

router.post('/signin', loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await prisma.administradores.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    return res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  

  try {
    const existingUser = await prisma.administradores.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.administradores.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
