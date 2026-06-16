import { NextResponse, type NextRequest } from 'next/server';
import { getZone, listChildren } from '@backend/zones';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const regionId = Number(id);

    try {
        const region = await getZone('regions', regionId);

        if (!region) {
            return NextResponse.json({ message: 'Région introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ zone: region, children: await listChildren('regions', regionId) });
    } catch (error) {
        return NextResponse.json(
            { message: 'Impossible de charger la région.', error: error instanceof Error ? error.message : 'Erreur inconnue' },
            { status: 500 },
        );
    }
}
