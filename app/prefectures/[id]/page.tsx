import { getZone, listChildren } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export const dynamic = 'force-dynamic';

export default async function PrefectureDetailPage({ params }: PageProps) {
    const { id } = await params;
    const prefectureId = Number(id);
    const prefecture = await getZone('prefectures', prefectureId);

    if (!prefecture) {
        notFound();
    }

    const communes = await listChildren('prefectures', prefectureId);

    return (
        <section className="zone-page">
            <PageHeader title="Communes" description={`Communes de ${prefecture.nom}`} backHref="/prefectures" />
            <div className="stats-grid">
                {communes.map((commune, index) => (
                    <ZoneCard key={commune.id} zone={commune} index={index} href={`/communes/${commune.id}`} />
                ))}
            </div>
        </section>
    );
}
