import { listZones } from '@backend/zones';
import { PageHeader } from '@frontend/PageHeader';
import { ZoneCard } from '@frontend/ZoneCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Préfectures' };

export default async function PrefecturesPage() {
    const prefectures = await listZones('prefectures');

    return (
        <section className="zone-page">
            <PageHeader title="Préfectures" description="Liste de toutes les préfectures" />
            <div className="stats-grid">
                {prefectures.map((prefecture, index) => (
                    <ZoneCard key={prefecture.id} zone={prefecture} index={index} href={`/prefectures/${prefecture.id}`} />
                ))}
            </div>
        </section>
    );
}
