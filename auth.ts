import NextAuth, { type NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "./config/env";
import { db } from "./lib/db/db";
import { accounts, sessions, users, verificationTokens } from "./lib/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: AUTH_SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/user-profile`;
    },
  },
};

// Export the NextAuth handler directly
export default (req: any, res: any) => NextAuth(req, res, authOptions)
