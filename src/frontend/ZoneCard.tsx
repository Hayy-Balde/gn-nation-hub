'use client';

import type { Zone } from '@backend/zones';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';
import Link from 'next/link';

type ZoneCardProps = {
    zone: Zone;
    index: number;
    href?: string;
};

export function ZoneCard({ zone, index, href }: ZoneCardProps) {
    const content = (
        <div className="stats-content">
            <div className="stats-info">
                <h3>{zone.nom}</h3>
                <p>
                    {zone.code || 'Code non défini'}
                    {zone.parent ? ` - ${zone.parent.nom}` : ''}
                </p>
            </div>
            <div className="stats-icon">
                <Building size={24} />
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="stats-card success"
        >
            {href ? <Link href={href}>{content}</Link> : content}
        </motion.div>
    );
}
