export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "super_admin";
    };
  }
}
