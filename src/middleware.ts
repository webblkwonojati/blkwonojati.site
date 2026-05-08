import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as any)?.role;

  const isDashboardRoute = nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");

  // 1. Proteksi Halaman Dashboard & Admin
  if (isDashboardRoute) {
    if (!isLoggedIn || userRole !== "admin") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  // 2. Redirect jika Admin sudah login mencoba akses halaman login/register
  if (isAuthRoute && isLoggedIn && userRole === "admin") {
    return Response.redirect(new URL("/admin", nextUrl));
  }

  // 3. Proteksi API Admin
  if (nextUrl.pathname.startsWith("/api/admin")) {
    if (!isLoggedIn || userRole !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
