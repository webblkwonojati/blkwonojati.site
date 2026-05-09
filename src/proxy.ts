import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoot = createRouteMatcher(["/admin(.*)", "/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // 1. Shortlink Subdomain Handling
  if (hostname === "bit.blkwonojati.site" || hostname.startsWith("bit.localhost")) {
    // If the path already starts with /s/, don't rewrite it again (avoid infinite loop)
    if (url.pathname.startsWith("/s/")) {
      return NextResponse.next();
    }
    
    const code = url.pathname === "/" ? "" : url.pathname;
    // Rewrite to our internal route /s/[code]
    return NextResponse.rewrite(new URL(`/s${code}`, req.url));
  }

  // 2. Linktree Subdomain Handling
  if (hostname === "bio.wonojati.site" || hostname === "bio.blkwonojati.site" || hostname.startsWith("bio.localhost")) {
    // If we are already on the /bio path, stop rewriting
    if (url.pathname === "/bio") {
      return NextResponse.next();
    }
    // Rewrite to our internal public linktree route /bio
    return NextResponse.rewrite(new URL(`/bio`, req.url));
  }

  // 2. Admin Protection Handling
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

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
