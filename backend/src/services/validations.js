import  { PrismaClient }  from '@prisma/client';

const prisma = new PrismaClient()

export async function userExists(email) {
  const user = await prisma.administradores.findUnique({
    where: { email },
  });
  return !!user; // true si existe, false si no
}

export async function getUserByEmail(email) {
  return await prisma.administradores.findUnique({
    where: { email },
  });
}

export async function isUsernameTaken(username) {
  const user = await prisma.administradores.findUnique({
    where: { username },
  });
  return !!user;
}