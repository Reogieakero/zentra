import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("principal_session");
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith("/principal") && pathname !== "/principal-login";

  if (isProtected && session?.value !== "authenticated") {
    const loginUrl = new URL("/principal-login", request.url);
    loginUrl.searchParams.set("reason", "session_required");
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/principal-login" && session?.value === "authenticated") {
    return NextResponse.redirect(new URL("/principal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/principal/:path*", "/principal-login"],
};