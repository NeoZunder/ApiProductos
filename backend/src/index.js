import './setupEnv.js'; // Esto carga las variables antes que todo
import {app} from "./app.js";

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Verifica que aparezca bien

// Aquí va el resto de tu código, importando y usando Prisma

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS :", process.env.EMAIL_PASS);


