import { auth, clerkClient } from "@clerk/nextjs/server";

export type UserRole = "admin" | "super_admin";

/**
 * Checks the current user's role with a robust fallback.
 * Priority: Session Claims (Fast) > Clerk API (Reliable)
 */
export async function checkRole(): Promise<UserRole | null> {
  const session = await auth();
  if (!session.userId) return null;

  // 1. Cek dari session claims (JWT) - Sangat cepat
  let role = session.sessionClaims?.metadata?.role as UserRole | undefined;

  // 2. Fallback: Cek langsung ke API Clerk - Sangat handal
  if (!role) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(session.userId);
      role = user.publicMetadata?.role as UserRole | undefined;
    } catch (error) {
      console.error("Error fetching user role from Clerk API:", error);
      return null;
    }
  }

  return role || null;
}
