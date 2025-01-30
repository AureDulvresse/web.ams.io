import { NextRequest } from "next/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { AUTH_CONFIG } from "@/auth.config";

export const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: 30 * 24 * 60 * 60, // 30 jours en secondes
};

export function setCookie(request: NextRequest, name: string, value: string, options?: any) {
  const url = request.nextUrl.clone();
  url.pathname = "/"; // Set cookie for the entire domain
  const cookie = new URLSearchParams();
  cookie.set(name, value);
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      cookie.append(key, value as string);
    });
  }
  return new Response(null, {
    headers: {
      "Set-Cookie": cookie.toString(),
    },
  });
}

export function getCookie(request: NextRequest, name: string): string | null {
  const cookies = request.cookies.getAll();
  const cookie = cookies.find((c) => c.name === name);
  return cookie?.value || null;
}

export function deleteCookie(request: NextRequest, name: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/"; // Delete cookie for the entire domain
  return new Response(null, {
    headers: {
      "Set-Cookie": `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    },
  });
}
