import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  await prisma.account.create({
    data: {
      userId: admin.id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: admin.email,
    },
  });

  console.log({ id: admin.id, email: admin.email });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
