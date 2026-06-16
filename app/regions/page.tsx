import { listZones } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Régions' };

export default async function RegionsPage() {
    const regions = await listZones('regions');

    return (
        <section className="zone-page">
            <PageHeader title="Régions" description="Liste de toutes les régions" />
            <div className="stats-grid">
                {regions.map((region, index) => (
                    <ZoneCard key={region.id} zone={region} index={index} href={`/regions/${region.id}`} />
                ))}
            </div>
        </section>
    );
}
