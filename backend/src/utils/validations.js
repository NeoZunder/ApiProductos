import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import validator from 'validator';

// --- Validaciones Prisma (base de datos) ---

export async function userExists(email) {
  const user = await prisma.administradores.findUnique({ where: { email } });
  return !!user;
}

export async function getUserByEmail(email) {
  return await prisma.administradores.findUnique({ where: { email } });
}

export async function isUsernameTaken(username) {
  const user = await prisma.administradores.findUnique({ where: { username } });
  return !!user;
}

// --- Validaciones básicas (sintaxis y lógica) ---

export function isValidEmail(email) {
  return validator.isEmail(email);
}

export function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

export function hasEmptyFields(...fields) {
  return fields.some(field => !field || field.trim() === "");
}

export function doPasswordsMatch(pwd, repeatPwd) {
  return pwd === repeatPwd;
}
