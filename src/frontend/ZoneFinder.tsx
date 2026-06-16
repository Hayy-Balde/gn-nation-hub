'use client';

import type { Zone } from '@backend/zones';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type ZoneFinderProps = {
    zones: Array<Zone & { href: string; level: string }>;
};

export function ZoneFinder({ zones }: ZoneFinderProps) {
    const [query, setQuery] = useState('');

    const results = useMemo(() => {
        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return zones.slice(0, 8);
        }

        return zones
            .filter((zone) => {
                const haystack = `${zone.nom} ${zone.code ?? ''} ${zone.parent?.nom ?? ''} ${zone.level}`.toLowerCase();
                return haystack.includes(normalized);
            })
            .slice(0, 8);
    }, [query, zones]);

    return (
        <section className="finder-panel" aria-label="Recherche territoriale">
            <div className="finder-copy">
                <span className="eyebrow">Recherche instantanée</span>
                <h2>Trouver rapidement une zone administrative</h2>
                <p>Saisis un nom, un code ou un parent territorial pour ouvrir directement la fiche correspondante.</p>
            </div>

            <div className="finder-box">
                <div className="finder-input">
                    <Search size={19} />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex: Conakry, KAN, Mamou..." />
                </div>
                <div className="finder-results">
                    {results.map((zone) => (
                        <Link key={`${zone.level}-${zone.id}`} href={zone.href} className="finder-result">
                            <span>
                                <strong>{zone.nom}</strong>
                                <small>{zone.parent?.nom ?? 'Guinée'}</small>
                            </span>
                            <em>{zone.level}</em>
                        </Link>
                    ))}
                    {results.length === 0 && <p className="empty-state">Aucun résultat pour cette recherche.</p>}
                </div>
            </div>
        </section>
    );
}
