import { listZones } from '@backend/zones';
import { Edit3, Plus, Search } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Territoires' };

export default async function BackofficeZonesPage() {
    const [regions, prefectures, communes] = await Promise.all([
        listZones('regions', 20),
        listZones('prefectures', 20),
        listZones('communes', 20),
    ]);
    const rows = [
        ...regions.map((zone) => ({ ...zone, level: 'Région', href: `/regions/${zone.id}` })),
        ...prefectures.map((zone) => ({ ...zone, level: 'Préfecture', href: `/prefectures/${zone.id}` })),
        ...communes.map((zone) => ({ ...zone, level: 'Commune', href: `/communes/${zone.id}` })),
    ];

    return (
        <section className="bo-page">
            <div className="bo-hero compact">
                <div>
                    <span className="eyebrow">Backoffice</span>
                    <h1>Territoires</h1>
                    <p>Vue de gestion préparée pour recherche, édition et création.</p>
                </div>
                <button className="solid-action">
                    <Plus size={17} />
                    Nouvelle zone
                </button>
            </div>

            <div className="table-toolbar">
                <Search size={18} />
                <input placeholder="Filtrer les zones..." />
            </div>

            <div className="data-table">
                <div className="data-row head">
                    <span>Nom</span>
                    <span>Niveau</span>
                    <span>Parent</span>
                    <span>Action</span>
                </div>
                {rows.map((zone) => (
                    <div key={`${zone.level}-${zone.id}`} className="data-row">
                        <strong>{zone.nom}</strong>
                        <span>{zone.level}</span>
                        <span>{zone.parent?.nom ?? 'Guinée'}</span>
                        <Link href={zone.href}>
                            <Edit3 size={16} />
                            Voir
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
