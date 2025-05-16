import express from 'express';
import { connectDB, sql } from '../src/config.js'; // Asegúrate de que la ruta sea correcta
import rateLimit from 'express-rate-limit';

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

    console.log("Username:", username);
    console.log("Password:", password);

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    let pool;
    try {
        pool = await connectDB();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query(`
                SELECT * FROM Administradores
                WHERE username COLLATE Latin1_General_CS_AS = @username 
                AND password COLLATE Latin1_General_CS_AS = @password
            `);

        console.log("Result:", result.recordset[0]);

        if (result.recordset.length > 0) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        if (pool) await pool.close(); // importante
    }
});


export default router;