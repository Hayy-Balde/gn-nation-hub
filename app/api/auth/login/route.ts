import { authCookieName, createSessionToken, getAdminCredentials, isValidLogin } from '@backend/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = (await request.json().catch(() => null)) as { email?: string; password?: string; remember?: boolean } | null;
    const email = body?.email ?? '';
    const password = body?.password ?? '';

    if (!isValidLogin(email, password)) {
        return NextResponse.json({ message: 'Identifiants invalides.' }, { status: 401 });
    }

    const response = NextResponse.json({
        user: {
            email: getAdminCredentials().email,
            name: getAdminCredentials().name,
        },
    });

    response.cookies.set(authCookieName, createSessionToken(email), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: body?.remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8,
    });

    return response;
}
