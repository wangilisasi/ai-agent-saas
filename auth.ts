import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { z } from "zod"
import bcrypt from "bcrypt"
import { loginSchema } from "./src/lib/schemas/auth"

import { prisma } from "./src/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" }, // Correctly handle sessions via the adapter

    callbacks: {
        // These callbacks correctly link the Credentials provider with database sessions
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },

    providers: [
      Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const parsedCredentials = loginSchema.safeParse(credentials);
    
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await prisma.user.findUnique({ where: { email } });
            
            if (!user || !user.password) return null;
              
            const passwordsMatch = await bcrypt.compare(password, user.password);
            
            if (passwordsMatch) {
              // On success, return the user and NextAuth will handle the session.
              return user;
            }
          }
    
          return null;
        },
      }),
    ],
})
 
