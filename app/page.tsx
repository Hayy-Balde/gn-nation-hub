import { getSummary, listZones } from '@backend/zones';
import { ZoneFinder } from '@frontend/ZoneFinder';
import { ArrowRight, Building2, Layers3, Map, MapPinned, Route, ShieldCheck, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const [summary, regions, prefectures, communes, quartiers] = await Promise.all([
        getSummary(),
        listZones('regions', 12),
        listZones('prefectures', 12),
        listZones('communes', 12),
        listZones('quartiers', 12),
    ]);

    const finderZones = [
        ...regions.map((zone) => ({ ...zone, level: 'Région', href: `/regions/${zone.id}` })),
        ...prefectures.map((zone) => ({ ...zone, level: 'Préfecture', href: `/prefectures/${zone.id}` })),
        ...communes.map((zone) => ({ ...zone, level: 'Commune', href: `/communes/${zone.id}` })),
        ...quartiers.map((zone) => ({ ...zone, level: 'Quartier', href: `/quartiers/${zone.id}` })),
    ];

    const highlights = [
        { label: 'Régions', value: summary.regions, icon: Map, href: '/regions' },
        { label: 'Préfectures', value: summary.prefectures, icon: MapPinned, href: '/prefectures' },
        { label: 'Communes', value: summary.communes, icon: Building2, href: '/communes' },
        { label: 'Quartiers', value: summary.quartiers, icon: Users, href: '/quartiers' },
        { label: 'Secteurs', value: summary.secteurs, icon: Layers3, href: '/secteurs' },
    ];

    return (
        <>
            <section className="hero-section">
                <div className="hero-copy">
                    <span className="hero-kicker">
                        <Sparkles size={17} />
                        Référentiel territorial intelligent
                    </span>
                    <h1>Explorer la Guinée administrative avec précision et élégance.</h1>
                    <p>
                        GnNationHub transforme les régions, préfectures, communes, quartiers et secteurs en une expérience claire,
                        rapide et pensée pour la décision.
                    </p>
                    <div className="hero-actions">
                        <Link href="/regions" className="primary-cta">
                            Explorer les territoires
                            <ArrowRight size={18} />
                        </Link>
                        <Link href="/auth/login" className="secondary-cta">
                            Accès sécurisé
                        </Link>
                    </div>
                </div>

                <div className="territory-visual" aria-label="Carte synthétique des niveaux administratifs">
                    <div className="visual-topline">
                        <span>Guinée</span>
                        <strong>{summary.regions} régions actives</strong>
                    </div>
                    <div className="map-board">
                        {regions.slice(0, 8).map((region, index) => (
                            <Link key={region.id} href={`/regions/${region.id}`} className={`map-cell cell-${index + 1}`}>
                                <span>{region.code}</span>
                                <strong>{region.nom}</strong>
                            </Link>
                        ))}
                    </div>
                    <div className="visual-foot">
                        <Route size={18} />
                        <span>Navigation hiérarchique: région → préfecture → commune → quartier → secteur</span>
                    </div>
                </div>
            </section>

            <section className="metric-strip">
                {highlights.map((item) => (
                    <Link key={item.label} href={item.href} className="metric-tile">
                        <item.icon size={20} />
                        <strong>{item.value.toLocaleString('fr-FR')}</strong>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </section>

            <ZoneFinder zones={finderZones} />

            <section className="experience-grid">
                <article className="experience-card">
                    <ShieldCheck size={24} />
                    <h2>Backoffice prêt pour la gouvernance</h2>
                    <p>Une console dédiée permet de piloter les volumes, surveiller la cohérence des données et préparer les workflows CRUD.</p>
                    <Link href="/backoffice">Ouvrir le backoffice</Link>
                </article>
                <article className="experience-card accent">
                    <Layers3 size={24} />
                    <h2>Front office orienté exploration</h2>
                    <p>Les citoyens, équipes terrain et décideurs accèdent aux zones par recherche, par niveau ou par parcours parent-enfant.</p>
                    <Link href="/prefectures">Voir les préfectures</Link>
                </article>
            </section>
        </>
    );
}
