import { createHmac, timingSafeEqual } from 'node:crypto';

export const authCookieName = 'gnn_session';

const fallbackEmail = 'admin@gnnationhub.gov.gn';
const fallbackPassword = 'admin12345';
const fallbackSecret = 'gnnationhub-local-secret-change-me';

function getSecret() {
    return process.env.AUTH_SECRET || fallbackSecret;
}

export function getAdminCredentials() {
    return {
        email: process.env.AUTH_ADMIN_EMAIL || fallbackEmail,
        password: process.env.AUTH_ADMIN_PASSWORD || fallbackPassword,
        name: process.env.AUTH_ADMIN_NAME || 'Administrateur',
    };
}

function sign(payload: string) {
    return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createSessionToken(email: string) {
    const payload = JSON.stringify({
        email,
        issuedAt: Date.now(),
    });
    const encodedPayload = Buffer.from(payload).toString('base64url');
    return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySessionToken(token?: string) {
    if (!token) {
        return null;
    }

    const [encodedPayload, signature] = token.split('.');

    if (!encodedPayload || !signature) {
        return null;
    }

    const expectedSignature = sign(encodedPayload);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
        return null;
    }

    try {
        const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as { email?: string; issuedAt?: number };
        const maxAge = 1000 * 60 * 60 * 8;

        if (!payload.email || !payload.issuedAt || Date.now() - payload.issuedAt > maxAge) {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}

export function isValidLogin(email: string, password: string) {
    const credentials = getAdminCredentials();
    return email.trim().toLowerCase() === credentials.email.toLowerCase() && password === credentials.password;
}
