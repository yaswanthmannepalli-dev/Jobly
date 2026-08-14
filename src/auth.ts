import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.username === "admin" ? "admin@jobly.com" : (credentials.username as string);
        const password = credentials.password as string;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
            },
            body: JSON.stringify({ email, password }),
          });
          
          const data = await res.json();
          if (data.user) {
            return { id: data.user.id, name: "Admin", email: data.user.email };
          }
        } catch (error) {
          console.error("Supabase auth error:", error);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
})
