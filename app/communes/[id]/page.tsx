import { getZone, listChildren } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export const dynamic = 'force-dynamic';

export default async function CommuneDetailPage({ params }: PageProps) {
    const { id } = await params;
    const communeId = Number(id);
    const commune = await getZone('communes', communeId);

    if (!commune) {
        notFound();
    }

    const quartiers = await listChildren('communes', communeId);

    return (
        <section className="zone-page">
            <PageHeader title="Quartiers" description={`Quartiers de ${commune.nom}`} backHref="/communes" />
            <div className="stats-grid">
                {quartiers.map((quartier, index) => (
                    <ZoneCard key={quartier.id} zone={quartier} index={index} href={`/quartiers/${quartier.id}`} />
                ))}
            </div>
        </section>
    );
}
