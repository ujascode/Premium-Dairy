import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

/**
 * Middleware to protect routes using JWT authentication with role-based access control.
 *
 * @typedef {Object} JwtPayload
 * @property {string} userId - The user's unique identifier (MongoDB ObjectId as string)
 * @property {string} username - The user's username
 * @property {'admin' | 'user'} role - The user's role (only 'admin' allowed)
 *
 * - Reads JWT from HttpOnly cookie named 'token'
 * - Verifies token using JWT_SECRET from environment variables (via verifyToken utility)
 * - Validates payload contains required fields (userId, username, role) and role === 'admin'
 * - Protects dashboard, products, sales, reports, settings routes and their API endpoints
 * - Allows public access to home, login, and auth login API
 * - Redirects authenticated users away from login page to dashboard
 * - Clears invalid/expired tokens or tokens with invalid payload and redirects to /login
 */
export async function middleware(request) {
  // Get token from cookies
  const token = request.cookies.get('token')?.value;

  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const isPublicPath =
    pathname === '/' ||
    pathname === '/login' ||
    pathname.startsWith('/api/auth/login');

  // Define protected paths (pages and API routes)
  const isProtectedPath =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/sales') ||
    pathname.startsWith('/reports') ||
    pathname.startsWith('/settings') ||
    (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/'));

  // If the path is public, allow access without authentication
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If the path is protected, check for authentication
  if (isProtectedPath) {
    // If no token exists, redirect to login page
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Verify the JWT token using utility function
    try {
      const decoded = verifyToken(token);

      // Validate payload contains required fields and role is admin
      if (
        typeof decoded.userId !== 'string' ||
        typeof decoded.username !== 'string' ||
        typeof decoded.role !== 'string' ||
        decoded.role !== 'admin'
      ) {
        throw new Error('Invalid token payload');
      }

      // If user is authenticated and trying to access login page, redirect to dashboard
      if (pathname === '/login') {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }

      // Token is valid and payload is correct, allow access to protected route
      return NextResponse.next();
    } catch (err) {
      // Token is invalid, expired, or payload validation failed
      // Clear the token cookie and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });
      return response;
    }
  }

  // For all other paths, allow access
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};