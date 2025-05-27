import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import dbConnect from "../config/database";
import User from "../models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email || !profile?.name || !profile?.picture) {
        throw new Error("Missing Google profile data");
      }

      await dbConnect();

      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const userName = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username: userName,
          image: profile.picture,
        });
      }

      return true;
    },

    async session({ session }) {
      await dbConnect();

      const user = await User.findOne({ email: session.user.email });
      if (user) {
        session.user.id = user._id.toString();
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

