import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { z } from "zod"
import bcrypt from "bcrypt"
import { loginSchema } from "./src/lib/schemas/auth"
import { v4 as uuidv4 } from "uuid"
import { prisma } from "./src/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { encode as defaultEncode } from "next-auth/jwt"

const adapter = PrismaAdapter(prisma);
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: adapter,
    //session: { strategy: "jwt" }, // Correctly handle sessions via the adapter

    callbacks: {
            async jwt({ token, account }) {
              if (account?.provider === "credentials") {
                token.credentials = true;
              }
              return token;
            },
    },
    jwt: {
        encode: async function (params) {
          if (params.token?.credentials) {
            const sessionToken = uuidv4();
    
            if (!params.token.sub) {
              throw new Error("No user ID found in token");
            }
    
            const createdSession = await adapter?.createSession?.({
              sessionToken: sessionToken,
              userId: params.token.sub,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            });
    
            if (!createdSession) {
              throw new Error("Failed to create session");
            }
    
            return sessionToken;
          }
          return defaultEncode(params);
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
 
