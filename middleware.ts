import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_CONFIG } from "./auth.config";

// Liste des routes publiques qui ne nécessitent pas d'authentification
const PUBLIC_ROUTES = new Set([
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
]);

// Liste des ressources statiques à ignorer
const STATIC_RESOURCES = new Set([
  "/api",
  "/_next",
  "/favicon.ico",
  "/images",
  "/static",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les ressources statiques
  if (STATIC_RESOURCES.has(pathname.split("/")[1])) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_CONFIG.storage.ACCESS_TOKEN);
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);

  // Redirection avec statut 308 (Permanent Redirect)
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl, { status: 308 });
  }

  if (token && isPublicRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl, { status: 308 });
  }

  return NextResponse.next();
}

// Optimisation du matcher pour éviter les vérifications inutiles
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/* (API routes)
     * 2. /_next/* (Next.js internals)
     * 3. /static/* (static files)
     * 4. /favicon.ico, /sitemap.xml (common static files)
     */
    "/((?!api|_next|static|favicon.ico|sitemap.xml).*)",
  ],
};
