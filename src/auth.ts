import { AuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/app/actions";

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        return await signIn(credentials.username, credentials.password)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 400) {
              throw new Error(
                JSON.stringify({ message: data.detail, code: data.error }),
                {}
              );
            }

            const authorization = { id: data.access_token };

            if (authorization) {
              return authorization;
            } else {
              throw new Error("No authorization found");
            }
          });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_JWT,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user = user as User & AdapterUser;
      session.token = token as JWT;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};

export default auth;
