import NextAuth, { NextAuthConfig } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "./config/env"
import { db } from "./lib/db/db"
import { accounts, sessions, users, verificationTokens } from "./lib/db/schema"
import { eq } from "drizzle-orm"

export const authOptions =
  {
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens
    }),
    providers: [
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      })
    ],
    secret: AUTH_SECRET,
    session: {
      strategy: "database"
    },

    callbacks: {
      async session({ session, user }) {
        const userDB = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id))
          .limit(1)

        if (userDB.length > 0 && userDB[0].id) {
          session.user.id = userDB[0].id
          session.user.image = userDB[0].image
        }

        return session
      },
      // async redirect({ url, baseUrl }) {
      //   if (url.startsWith(baseUrl)) {
      //     return url;
      //   }
      //   return `${baseUrl}/dashboard`;
      // },
    },
  } satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
