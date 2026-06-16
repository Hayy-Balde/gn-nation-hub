import { listZones } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Communes' };

export default async function CommunesPage() {
    const communes = await listZones('communes');

    return (
        <section className="zone-page">
            <PageHeader title="Communes" description="Liste de toutes les communes" />
            <div className="stats-grid">
                {communes.map((commune, index) => (
                    <ZoneCard key={commune.id} zone={commune} index={index} href={`/communes/${commune.id}`} />
                ))}
            </div>
        </section>
    );
}
