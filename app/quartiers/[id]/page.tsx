import { getZone, listChildren } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export const dynamic = 'force-dynamic';

export default async function QuartierDetailPage({ params }: PageProps) {
    const { id } = await params;
    const quartierId = Number(id);
    const quartier = await getZone('quartiers', quartierId);

    if (!quartier) {
        notFound();
    }

    const secteurs = await listChildren('quartiers', quartierId);

    return (
        <section className="zone-page">
            <PageHeader title="Secteurs" description={`Secteurs de ${quartier.nom}`} backHref="/quartiers" />
            <div className="stats-grid">
                {secteurs.map((secteur, index) => (
                    <ZoneCard key={secteur.id} zone={secteur} index={index} />
                ))}
            </div>
        </section>
    );
}
