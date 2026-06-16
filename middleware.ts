import { NextResponse, type NextRequest } from 'next/server';
import { authCookieName, verifySessionToken } from './src/backend/auth';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/backoffice')) {
        const session = verifySessionToken(request.cookies.get(authCookieName)?.value);

        if (!session) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('next', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    if (pathname.startsWith('/auth/login')) {
        const session = verifySessionToken(request.cookies.get(authCookieName)?.value);

        if (session) {
            return NextResponse.redirect(new URL('/backoffice', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/backoffice/:path*', '/auth/login'],
};
