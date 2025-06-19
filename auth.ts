import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { authConfig } from "./auth.config"

import { prisma } from "./src/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "database" }, // Use database sessions

    callbacks: {
        async session({ session, user }) {
            // The user object here is the full user from the database
            if (session.user) {
                session.user.id = user.id;
                session.user.role = user.role;
            }
            return session;
        },
    },

    providers: [
        Google({}),
    ],
})
 
