// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Feature flag check (reads env at build/runtime)
  const subsOff = process.env.NEXT_PUBLIC_FEATURE_SUBSCRIPTIONS !== 'true';

  // If subscriptions are disabled, block these routes entirely
  if (subsOff && (pathname.startsWith('/pricing') || pathname.startsWith('/dashboard') || pathname.startsWith('/account'))) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  // Existing auth protection for member/admin areas
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = ['/dashboard', '/admin'];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    const url = new URL('/signin', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Role check for /admin UI routes
  if (pathname.startsWith('/admin')) {
    // @ts-ignore
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Role check for /api/admin/* — return 401/403 instead of redirecting
  if (pathname.startsWith('/api/admin')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
    // @ts-ignore
    if (token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/pricing',
    '/account',
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/signin',
    '/signup',
  ],
};
