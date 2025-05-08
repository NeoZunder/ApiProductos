import express from "express";
import cors from "cors";
import morgan from "morgan";
import trabajadoresRouter from "../routes/trabajadores.js"; // Importamos el router de trabajadores
import productosRouter from "../routes/productos.js"; // Importamos el router de productos

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // permití solo tu frontend
    credentials: true // si vas a usar cookies o auth con credenciales
  })); // Configuración de CORS para permitir solicitudes desde el frontend

app.use(express.json())
app.use(morgan('dev')) //Colores y log liviano: método, URL, status, tiempo, tamaño. Ideal para desarrollo.Middleware para registrar las solicitudes HTTP en la consola
app.use('/trabajadores',trabajadoresRouter) // Usar el router de trabajadores para manejar las rutas relacionadas con productos
app.use('/productos',productosRouter) // Usar el router de productos para manejar las rutas relacionadas con productos


export {app};
  
