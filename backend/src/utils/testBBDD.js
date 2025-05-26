import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Conectado a la DB Supabase correctamente!");
  } catch (e) {
    console.error("Error al conectar a la DB:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();