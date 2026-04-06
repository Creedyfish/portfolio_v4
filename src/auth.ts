import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/db";
import { formDataSchema } from "./schemas";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await formDataSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          const valid = await bcrypt.compare(password, String(user.password));

          if (!valid) return null;
          console.log("login success");
          return {
            id: user.id,
            email: user.email,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
});
