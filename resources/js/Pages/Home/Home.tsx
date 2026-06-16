import StatsCard from '@/Components/StatsCard';
import { statsCards } from '@/Datas/statCard';
import { motion } from 'framer-motion';
import {
    Users, BarChart3, Settings, Plus, ShoppingCart, Eye, Edit, Filter, Download
} from 'lucide-react';
import type { FC } from 'react';
import { Head } from '@inertiajs/react';
import { HomeLayout } from '@/Layouts/Fronts/HomeLayout';
import PageHeader from '@/Components/PageHeader';

interface HomeProps {
}


const Home: FC<HomeProps> = ({ }) => {
    return (
        <HomeLayout >
            <Head title="Accueil" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="dashboard-content"
            >
                <PageHeader title='Dashboard' description='Bienvenue sur votre tableau de bord administrateur' />

                <div className="stats-grid">
                    {statsCards.map((stat, index) => (
                        <StatsCard key={index} stat={stat} index={index} />
                    ))}
                </div>

                <div className="dashboard-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="chart-card"
                    >
                        <div className="card-header">
                            <h3>Revenus mensuels</h3>
                            <div className="card-actions">
                                <button className="btn-icon" title='title'>
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="chart-placeholder">
                            <div className="chart-bars">
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '80%' }}></div>
                                <div className="bar" style={{ height: '45%' }}></div>
                                <div className="bar" style={{ height: '90%' }}></div>
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '85%' }}></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="quick-actions"
                >
                    <h3>Actions rapides</h3>
                    <div className="actions-grid">
                        <button className="action-card">
                            <Users size={24} />
                            <span>Ajouter utilisateur</span>
                        </button>
                        <button className="action-card">
                            <ShoppingCart size={24} />
                            <span>Nouvelle commande</span>
                        </button>
                        <button className="action-card">
                            <BarChart3 size={24} />
                            <span>Générer rapport</span>
                        </button>
                        <button className="action-card">
                            <Settings size={24} />
                            <span>Configuration</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </HomeLayout>
    )
};

export default Home;
