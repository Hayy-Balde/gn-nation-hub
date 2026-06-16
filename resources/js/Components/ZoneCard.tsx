
import { Commune } from '@/types/db/commune';
import { Pays } from '@/types/db/pays';
import { Prefecture } from '@/types/db/Prefecture';
import { Quartier } from '@/types/db/quartier';
import { Region } from '@/types/db/region';
import { Secteur } from '@/types/db/secteur';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';
import type { FC } from 'react';
import { Link } from '@inertiajs/react';

interface ZoneCardProps {
    zone: Region|Prefecture|Commune|Quartier|Secteur,
    index: number,
    route?: string
}



const ZoneCard: FC<ZoneCardProps> = ({ zone, index, route }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`stats-card success`}
            >
            <Link href={route}>
                <div className="stats-content">
                    <div className="stats-info">
                        <h3>{zone.nom}</h3>
                        <p>{zone.code} - (
                            {zone.pays?.nom && zone.pays?.nom}
                            {zone.region?.nom && zone.region?.nom}
                            {zone.prefecture?.nom && zone.prefecture?.nom}
                            {zone.commune?.nom && zone.commune?.nom}
                            {zone.quartier?.nom && zone.quartier?.nom})
                        </p>
                    </div>
                    <div className="stats-icon">
                        <Building size={24} />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default ZoneCard;
