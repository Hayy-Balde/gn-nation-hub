'use client';

import { motion } from 'framer-motion';
import { BarChart3, Building2, Map, MapPinned, Navigation, Users } from 'lucide-react';

export type StatsIconName = 'barChart' | 'building' | 'map' | 'mapPinned' | 'navigation' | 'users';

const icons = {
    barChart: BarChart3,
    building: Building2,
    map: Map,
    mapPinned: MapPinned,
    navigation: Navigation,
    users: Users,
};

type StatsCardProps = {
    title: string;
    value: number;
    color: string;
    icon: StatsIconName;
    index: number;
};

export function StatsCard({ title, value, color, icon, index }: StatsCardProps) {
    const Icon = icons[icon];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className={`stats-card ${color}`}
        >
            <div className="stats-content">
                <div className="stats-info">
                    <h3>{value.toLocaleString('fr-FR')}</h3>
                    <p>{title}</p>
                </div>
                <div className="stats-icon">
                    <Icon size={24} />
                </div>
            </div>
        </motion.div>
    );
}
