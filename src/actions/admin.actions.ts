"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { FormData, userDataSchema } from "@/schemas";
/**
 * LOGIN
 * - find admin by email
 * - verify password
 */
export async function login(formData: FormData) {
  const { email, password } = formData;

  await signIn("credentials", {
    email,
    password,
  });
}

/**
 * SIGN UP
 * - prevent duplicate email
 * - hash password
 * - create admin
 */
export async function signup(formData: FormData) {
  if (!formData.email || !formData.password) {
    throw new Error("Email and password required");
  }

  const existing = await prisma.user.findUnique({
    where: { email: formData.email },
  });

  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(formData.password, 12);

  const admin = await prisma.user.create({
    data: { email: formData.email, password: hashedPassword },
  });

  await prisma.account.create({
    data: {
      userId: admin.id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: admin.email,
    },
  });

  const validatedData = userDataSchema.parse({
    id: admin.id,
    email: admin.email,
  });

  return {
    id: validatedData.id,
    email: validatedData.email,
  };
}
