import { NextResponse } from 'next/server';
import { getSummary } from '@backend/zones';

export async function GET() {
    try {
        return NextResponse.json(await getSummary());
    } catch (error) {
        return NextResponse.json(
            { message: 'Impossible de charger le résumé.', error: error instanceof Error ? error.message : 'Erreur inconnue' },
            { status: 500 },
        );
    }
}
