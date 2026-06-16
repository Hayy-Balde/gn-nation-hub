import { getZone, listChildren } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export const dynamic = 'force-dynamic';

export default async function RegionDetailPage({ params }: PageProps) {
    const { id } = await params;
    const regionId = Number(id);
    const region = await getZone('regions', regionId);

    if (!region) {
        notFound();
    }

    const prefectures = await listChildren('regions', regionId);

    return (
        <section className="zone-page">
            <PageHeader title="Préfectures" description={`Préfectures de ${region.nom}`} backHref="/regions" />
            <div className="stats-grid">
                {prefectures.map((prefecture, index) => (
                    <ZoneCard key={prefecture.id} zone={prefecture} index={index} href={`/prefectures/${prefecture.id}`} />
                ))}
            </div>
        </section>
    );
}
