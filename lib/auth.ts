import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId:
        (process.env.GITHUB_CLIENT_ID as string) || "client Id here",
      clientSecret:
        (process.env.GITHUB_CLIENT_SECRET as string) || "secret key here",
    }),
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || "client Id here",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "secret key here",
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
