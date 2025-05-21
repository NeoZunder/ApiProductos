import prisma from "../db/prisma.js";

export async function userExists(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return !!user; // true si existe, false si no
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function isUsernameTaken(username) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return !!user;
}