import { listZones } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Quartiers' };

export default async function QuartiersPage() {
    const quartiers = await listZones('quartiers');

    return (
        <section className="zone-page">
            <PageHeader title="Quartiers" description="Liste de tous les quartiers" />
            <div className="stats-grid">
                {quartiers.map((quartier, index) => (
                    <ZoneCard key={quartier.id} zone={quartier} index={index} href={`/quartiers/${quartier.id}`} />
                ))}
            </div>
        </section>
    );
}
