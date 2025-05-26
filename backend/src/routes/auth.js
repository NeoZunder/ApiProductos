import express from "express";
import rateLimit from "express-rate-limit";
import bcrypt from "bcrypt";
import {
  userExists,
  isValidEmail,
  isUsernameTaken,
  isStrongPassword,
  hasEmptyFields,
  doPasswordsMatch,
  
} from "../utils/validations.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 1000,
  max: 3,
  message: { message: "Too many attempts, please wait a moment." },
});

router.post("/", (req, res) => {
  res.json({ message: "Login route" });
});

router.post("/signin", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (hasEmptyFields(username, password)) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

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

router.post("/signup", async (req, res) => {
  const { username, password, rePassword, email } = req.body;

  try {
    if (hasEmptyFields(username, password, rePassword, email)) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (await isUsernameTaken(username)) {
      return res.status(409).json({ message: "Username already exists" });
    }

    if (await userExists(email)) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Email format: example@domain.com " });
    }

    if (!doPasswordsMatch(password, rePassword)) {
      return res.status(400).json({ message: `Passwords do not match` });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: `Password must be at least 8 characters long, 
        contain at least one uppercase letter, 
        one lowercase letter, 
        and one number`,
      });
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
