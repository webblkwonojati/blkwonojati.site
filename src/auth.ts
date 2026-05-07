import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Authenticate with Supabase Auth
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (error || !user) return null;

        // 2. Fetch extended profile and role from the table we created
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", user.id)
          .single();

        if (!profile) return null;

        // 3. For Companies, check if verified (optional: allow login but limit access)
        if (profile.role === 'perusahaan') {
          const { data: company } = await supabase
            .from("companies")
            .select("is_verified")
            .eq("id", user.id)
            .single();
          
          // Attach verification status to user info
          return {
            id: user.id,
            email: user.email,
            name: profile.full_name,
            role: profile.role,
            is_verified: company?.is_verified ?? false,
          };
        }

        return {
          id: user.id,
          email: user.email,
          name: profile.full_name,
          role: profile.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
        token.is_verified = (user as any).is_verified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id || token.sub;
        (session.user as any).role = token.role;
        (session.user as any).is_verified = token.is_verified;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
