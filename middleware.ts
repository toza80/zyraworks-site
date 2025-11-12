// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const USER = process.env.BASIC_AUTH_USER;
const PASS = process.env.BASIC_AUTH_PASS;

function unauthorized() {
  const res = new NextResponse("Unauthorized", { status: 401 });
  res.headers.set('WWW-Authenticate', 'Basic realm="ZyraWorks Informes"');
  return res;
}

export function middleware(req: NextRequest) {
  // Solo protegemos /informes/*
  if (!req.nextUrl.pathname.startsWith("/informes")) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");

  if (scheme !== "Basic" || !encoded) return unauthorized();

  // Decode "user:pass" (Edge runtime: usar atob)
  let decoded = "";
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized();
  }
  const [user, pass] = decoded.split(":");

  if (user !== USER || pass !== PASS) return unauthorized();

  // Ok: evitar indexación
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return res;
}

// Ejecutar solo en /informes/*
export const config = { matcher: ["/informes/:path*"] };
