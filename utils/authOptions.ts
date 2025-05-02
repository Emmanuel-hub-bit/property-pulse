// import GoogleProvider from 'next-auth/providers/google';

// export const authOptions = {
//     provider: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             authorization: {
//                 params: {
//                     prompt: 'consent',
//                     access_type: 'offline',
//                     response_type: 'code'
//                 }
//             }
//         })
//     ],
//     callbacks: {
//         // invoked on successful sign in
//         async signIn({ profile }) {
//             // connect to the database
//             // check if user exists
//             // if not, create user
//             // return true to allow sign in
//         },
//         // session callback function that modifies the session object
//         async session({ session }) {
//             // get user from the database
//             // assign user id from the session
//             // return session
//         }
//     }
// }



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
      // Connect to the database
      await dbConnect();
      // check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // if not, create user
      if (!userExists) {
        // Truncate username if too long
        const userName = profile.name.slice(0, 20);


        await User.create({
          email: profile.email,
          username,
          image: profile.picture
        });
      }
      // return true to allow sign in
      return true;
    },
    async session({ session }) {
      // get user from database
      // assign user id from the session
      // return session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
