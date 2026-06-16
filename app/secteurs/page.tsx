import { listZones } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Secteurs' };

export default async function SecteursPage() {
    const secteurs = await listZones('secteurs');

    return (
        <section className="zone-page">
            <PageHeader title="Secteurs" description="Liste de tous les secteurs" />
            <div className="stats-grid">
                {secteurs.map((secteur, index) => (
                    <ZoneCard key={secteur.id} zone={secteur} index={index} />
                ))}
            </div>
        </section>
    );
}
