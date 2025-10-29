import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const AuthRoutes = ['/login', '/register'];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  ADMIN: [/^\/dashboard/],
} as const;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  // Allow unauthenticated access to auth routes
  if (AuthRoutes.includes(pathname)) {
    // If already logged in, avoid showing login
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard: redirect before any client renders
  const isDashboard = pathname.startsWith('/dashboard');

  if (!accessToken) {
    if (isDashboard) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
    return NextResponse.next();
  }

  // Decode token to get role
  let role: string | null = null;
  try {
    const decoded: any = jwtDecode(accessToken);
    role = decoded?.role ?? null;
  } catch {
    role = null;
  }

  if (isDashboard) {
    if (role && roleBasedRoutes[role as Role]) {
      const allowed = roleBasedRoutes[role as Role].some((re) => re.test(pathname));
      if (allowed) return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
