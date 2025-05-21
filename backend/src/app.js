import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.js"; // Importamos el router de productos

const app = express()

// Asi se realiza la llamada a la API desde el frontend
//http://localhost:5173/api/trabajadores
//http://localhost:5173/api/login 
app.use(cors({
    origin: 'http://localhost:5173', // permití solo tu frontend
  })); // Configuración de CORS para permitir solicitudes desde el frontend

app.use(express.json())
app.use(morgan('dev')) //Colores y log liviano: método, URL, status, tiempo, tamaño. Ideal para desarrollo.Middleware para registrar las solicitudes HTTP en la consola
app.use('/auth',authRouter)

export {app};
  
