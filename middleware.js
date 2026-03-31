import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get environment variables (must be set in Vercel)
  const username = process.env.PROTECTED_USERNAME;
  const password = process.env.PROTECTED_PASSWORD;
  
  // Require both username and password to be set
  if (!username || !password) {
    return new Response('Server configuration error: Missing authentication credentials', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
  
  // Get the authorization header
  const auth = request.headers.get('authorization');
  
  // Check if the request is for static assets (allow these through)
  const url = request.nextUrl;
  if (url.pathname.startsWith('/_next') || 
      url.pathname.startsWith('/images') || 
      url.pathname.startsWith('/css') || 
      url.pathname.startsWith('/js') ||
      url.pathname.endsWith('.ico') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.JPG') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    return NextResponse.next();
  }
  
  // Check authentication
  if (!auth || auth !== 'Basic ' + btoa(`${username}:${password}`)) {
    // Return 401 Unauthorized with Basic Auth challenge
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Bokachá Café"',
        'Content-Type': 'text/plain'
      }
    });
  }
  
  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Configure middleware to run on all paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
