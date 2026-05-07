import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as any)?.role;

  // 1. Proteksi Halaman Admin
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn || userRole !== "admin") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  // 2. Proteksi Dashboard Perusahaan
  if (nextUrl.pathname.startsWith("/dashboard-perusahaan")) {
    if (!isLoggedIn || userRole !== "perusahaan") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  // 3. Proteksi Dashboard Siswa
  if (nextUrl.pathname.startsWith("/dashboard-siswa")) {
    if (!isLoggedIn || userRole !== "siswa") {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }
  // 4. Proteksi API Admin
  if (nextUrl.pathname.startsWith("/api/admin")) {
    if (!isLoggedIn || userRole !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
