import {app} from "./app.js";
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Verifica que aparezca bien

// Aquí va el resto de tu código, importando y usando Prisma

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




