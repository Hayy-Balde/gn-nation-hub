import { getSummary, listZones } from '@backend/zones';
import { Activity, ArrowUpRight, Database, MapPinned, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Backoffice' };

export default async function BackofficePage() {
    const [summary, regions] = await Promise.all([getSummary(), listZones('regions', 8)]);
    const totalZones = summary.regions + summary.prefectures + summary.communes + summary.quartiers + summary.secteurs;

    return (
        <section className="bo-page">
            <div className="bo-hero">
                <div>
                    <span className="eyebrow">Backoffice</span>
                    <h1>Pilotage du référentiel territorial</h1>
                    <p>Surveille les volumes, la couverture et les points d’attention avant les workflows d’administration avancée.</p>
                </div>
                <Link href="/backoffice/zones" className="solid-action">
                    Gérer les territoires
                    <ArrowUpRight size={17} />
                </Link>
            </div>

            <div className="bo-metrics">
                <Metric icon={Database} label="Zones totales" value={totalZones.toLocaleString('fr-FR')} />
                <Metric icon={MapPinned} label="Régions" value={summary.regions.toLocaleString('fr-FR')} />
                <Metric icon={Users} label="Quartiers" value={summary.quartiers.toLocaleString('fr-FR')} />
                <Metric icon={ShieldCheck} label="Statut API" value="Active" />
            </div>

            <div className="bo-grid">
                <article className="bo-panel wide">
                    <div className="panel-heading">
                        <h2>Couverture régionale</h2>
                        <Activity size={18} />
                    </div>
                    <div className="region-bars">
                        {regions.map((region, index) => (
                            <Link key={region.id} href={`/regions/${region.id}`} className="region-bar">
                                <span>{region.nom}</span>
                                <div>
                                    <i style={{ width: `${100 - index * 7}%` }} />
                                </div>
                                <em>{region.code}</em>
                            </Link>
                        ))}
                    </div>
                </article>

                <article className="bo-panel">
                    <h2>Priorités</h2>
                    <ul className="task-list">
                        <li>Brancher l’auth réelle sur NextAuth ou JWT.</li>
                        <li>Ajouter les écrans CRUD des zones.</li>
                        <li>Contrôler les secteurs sans donnée active.</li>
                    </ul>
                </article>
            </div>
        </section>
    );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Database; label: string; value: string }) {
    return (
        <div className="bo-metric">
            <Icon size={20} />
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}
