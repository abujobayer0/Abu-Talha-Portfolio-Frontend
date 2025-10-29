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
  if (AuthRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))) {
    // If already logged in, avoid showing login
    if (accessToken) {
      try {
        const decoded: any = jwtDecode(accessToken);
        const role = decoded?.role;
        // Only redirect to dashboard if user is admin
        if (role && (role === 'ADMIN' || role === 'admin')) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch {
        // Invalid token, allow login
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard: redirect before any client renders
  const isDashboard = pathname.startsWith('/dashboard');

  if (!accessToken) {
    if (isDashboard) {
      return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
    }
    return NextResponse.next();
  }

  // Decode token to get role
  let role: string | null = null;
  try {
    const decoded: any = jwtDecode(accessToken);
    role = decoded?.role ?? null;

    // Normalize role to uppercase for matching
    if (role) {
      role = role.toUpperCase() === 'ADMIN' ? 'ADMIN' : role;
    }
  } catch (error) {
    // Token is invalid or expired, redirect to login
    if (isDashboard) {
      return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url));
    }
    return NextResponse.next();
  }

  if (isDashboard) {
    // Allow if role is ADMIN (case-insensitive) and path matches
    if (role && role.toUpperCase() === 'ADMIN') {
      const normalizedRole: Role = 'ADMIN';
      const allowed = roleBasedRoutes[normalizedRole].some((re) => re.test(pathname));
      if (allowed) {
        return NextResponse.next();
      }
    }
    // If role doesn't match or path doesn't match, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
