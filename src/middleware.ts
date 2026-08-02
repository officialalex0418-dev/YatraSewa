import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const payload = await decrypt(session);
    // You can add role-based checks here
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/company/:path*"],
};
