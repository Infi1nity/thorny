import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnChat = req.nextUrl.pathname.startsWith("/chat");
  const isOnFlashcards = req.nextUrl.pathname.startsWith("/flashcards");
  const isOnProfile = req.nextUrl.pathname.startsWith("/profile");

  const isProtectedRoute = isOnDashboard || isOnChat || isOnFlashcards || isOnProfile;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isLoggedIn && (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/auth"))) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};