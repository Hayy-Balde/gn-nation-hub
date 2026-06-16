import { NextResponse } from 'next/server';
import { listZones } from '@backend/zones';

export async function GET() {
    try {
        return NextResponse.json(await listZones('communes'));
    } catch (error) {
        return NextResponse.json(
            { message: 'Impossible de charger les communes.', error: error instanceof Error ? error.message : 'Erreur inconnue' },
            { status: 500 },
        );
    }
}
