import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get language from query param or cookie
  const langParam = request.nextUrl.searchParams.get('lang');
  const langCookie = request.cookies.get('preferred-language')?.value;
  
  // If language parameter is provided, set it as cookie
  if (langParam && (langParam === 'en' || langParam === 'fr')) {
    response.cookies.set('preferred-language', langParam, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
  } else if (!langCookie) {
    // Set default language if no cookie exists
    response.cookies.set('preferred-language', 'en', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

