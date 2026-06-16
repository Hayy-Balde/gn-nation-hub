import { NextResponse, type NextRequest } from 'next/server';
import { getZone, listChildren } from '@backend/zones';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const communeId = Number(id);

    try {
        const commune = await getZone('communes', communeId);

        if (!commune) {
            return NextResponse.json({ message: 'Commune introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ zone: commune, children: await listChildren('communes', communeId) });
    } catch (error) {
        return NextResponse.json(
            { message: 'Impossible de charger la commune.', error: error instanceof Error ? error.message : 'Erreur inconnue' },
            { status: 500 },
        );
    }
}
