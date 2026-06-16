import { NextResponse, type NextRequest } from 'next/server';
import { getZone, listChildren } from '@backend/zones';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const quartierId = Number(id);

    try {
        const quartier = await getZone('quartiers', quartierId);

        if (!quartier) {
            return NextResponse.json({ message: 'Quartier introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ zone: quartier, children: await listChildren('quartiers', quartierId) });
    } catch (error) {
        return NextResponse.json(
            { message: 'Impossible de charger le quartier.', error: error instanceof Error ? error.message : 'Erreur inconnue' },
            { status: 500 },
        );
    }
}
