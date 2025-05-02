// import NextAuth from "next-auth";
// import { authOptions } from "../../../../utils/authOptions";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // 🔐 Replace this with real user logic
//         if (credentials?.email === "admin@example.com" && credentials.password === "password") {
//           return {
//             id: "1",
//             name: "Admin User",
//             email: "admin@example.com",
//           };
//         }
//         return null; // ❌ Invalid login
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import { authOptions } from "../../../../../utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
