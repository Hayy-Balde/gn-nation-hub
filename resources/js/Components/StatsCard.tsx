
import { StatsCardsType } from '@/types/sidebarItemType';
import { motion } from 'framer-motion';
import type { FC } from 'react';

interface StatsCardProps {
    stat: StatsCardsType,
    index: number,
}


const StatsCard: FC<StatsCardProps> = ({ stat, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`stats-card ${stat.color}`}
        >
        <div className="stats-content">
            <div className="stats-info">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                { stat.change &&
                    <span className={`change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                        {stat.change} vs mois dernier
                    </span>
                }
            </div>
            <div className="stats-icon">
                <stat.icon size={24} />
            </div>
        </div>
    </motion.div>
);

export default StatsCard;
