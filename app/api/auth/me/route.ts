import { authCookieName, getAdminCredentials, verifySessionToken } from '@backend/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookieStore = await cookies();
    const session = verifySessionToken(cookieStore.get(authCookieName)?.value);

    if (!session) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
        user: {
            email: getAdminCredentials().email,
            name: getAdminCredentials().name,
        },
    });
}
