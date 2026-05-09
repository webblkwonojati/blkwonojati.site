import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoot = createRouteMatcher(["/admin(.*)", "/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoot(req)) {
    const session = await auth();
    
    // Redirect to sign-in if not authenticated
    if (!session.userId) {
      return session.redirectToSignIn();
    }

    // Role-based access control (RBAC)
    const client = await clerkClient();
    const user = await client.users.getUser(session.userId);
    const role = user.publicMetadata?.role as string;
    
    // Check if the user has any of the allowed roles for dashboard
    if (!role || (role !== "admin" && role !== "super_admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
