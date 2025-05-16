import express from 'express';
import { connectDB, sql } from '../src/config.js'; // Asegúrate de que la ruta sea correcta
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcrypt';

const loginLimiter = rateLimit({
  windowMs: 15 * 1000, // 15 segundos
  max: 3, // máximo 3 intentos por IP
  message: { message: "Demasiados intentos, esperá un poco." }
});

const router = express.Router();

router.post('/', (req, res) => {
    res.json({ message: "Login route" });
});

router.post('/signin', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    let pool;
    try {
        pool = await connectDB();

        // Primero traemos el usuario por username
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(`
                SELECT * FROM Administradores
                WHERE username COLLATE Latin1_General_CS_AS = @username
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = result.recordset[0];
        const hashedPassword = user.password; // hash almacenado en la DB

        // Ahora comparamos el password con el hash
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Si llegó acá, contraseña correcta
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        if (pool) await pool.close();
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body; // solo recibimos estos dos

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    let pool;
    try {
        pool = await connectDB();

        const userExists = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Administradores WHERE username = @username');

        if (userExists.recordset.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Administradores (username, password) VALUES (@username, @password)');

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        if (pool) await pool.close();
    }
});


export default router;