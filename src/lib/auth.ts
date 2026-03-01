import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma";
import { sendWelcomeEmail } from "./resend";

const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  providers: [
    Resend({
      from: "TOKI & TOMO <noreply@tokitomo.com>",
    }),
  ],
  pages: {
    signIn: "/en/auth/signin",
    verifyRequest: "/en/auth/verify-request",
  },
  events: {
    async createUser({ user }) {
      // Send welcome email when a new user is created
      if (user.email) {
        try {
          await sendWelcomeEmail(user.email, user.name);
        } catch (e) {
          console.error("Failed to send welcome email:", e);
        }
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true, locale: true, preferenceStyle: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.locale = dbUser.locale;
          token.preferenceStyle = dbUser.preferenceStyle;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "user";
        session.user.locale = (token.locale as string) ?? "en";
        session.user.preferenceStyle =
          (token.preferenceStyle as string | null) ?? null;
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
      locale: string;
      preferenceStyle: string | null;
    };
  }
}
