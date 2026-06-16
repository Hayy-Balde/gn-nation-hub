import { NextResponse, type NextRequest } from 'next/server';
import { getZone, listChildren } from '@backend/zones';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const prefectureId = Number(id);

    try {
        const prefecture = await getZone('prefectures', prefectureId);

        if (!prefecture) {
            return NextResponse.json({ message: 'Préfecture introuvable.' }, { status: 404 });
        }

        return NextResponse.json({ zone: prefecture, children: await listChildren('prefectures', prefectureId) });
    } catch (error) {
        return NextResponse.json(
            { message: 'Impossible de charger la préfecture.', error: error instanceof Error ? error.message : 'Erreur inconnue' },
            { status: 500 },
        );
    }
}
