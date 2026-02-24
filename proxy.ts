import { NextRequest, NextResponse } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/upload",
  "/processing",
  "/preview",
  "/report",
];
const authPaths = ["/login"];

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("complyly-session")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAuthPath = authPaths.some((p) => pathname.startsWith(p));
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/upload/:path*",
    "/processing/:path*",
    "/preview/:path*",
    "/report/:path*",
    "/login",
  ],
};
