import NavLink from '@/Components/NavLink';
import { SidebarItemsType } from '@/types/sidebarItemType';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity
} from 'lucide-react';

import type { FC } from 'react';

interface SidebarProps {
    sidebarCollapsed: boolean,
    darkMode: boolean,
    activeSection: string,
    setActiveSection: (id: string) => void,
    sidebarItems: SidebarItemsType[],

}

const Sidebar: FC<SidebarProps> = ({ sidebarCollapsed, darkMode, activeSection, setActiveSection, sidebarItems }) => {

    const { url } = usePage();

    return <motion.div
        className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${darkMode ? 'dark' : ''}`}
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
        <div className="sidebar-header">
            <motion.div
                className="logo"
                animate={{ scale: sidebarCollapsed ? 0.8 : 1 }}
                transition={{ duration: 0.3 }}
            >
                <Activity size={32} className="text-primary" />
                <AnimatePresence>
                    {!sidebarCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="logo-text"
                        >
                            GnNationHub
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>

        <nav className="sidebar-nav">
            {sidebarItems.map((item) => {
                // const isActive = url === route(item.route);
                // // Compare avec la route actuelle
                const pathname = new URL(route(item.route)).pathname;

                const isActive = pathname === '/'
                ? url === '/' // active uniquement si on est vraiment à la racine
                : url.startsWith(pathname);

                return (
                    <Link
                        key={item.id}
                        href={route(item.route)}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        as="button" // Permet de garder le style button si nécessaire
                    >
                        <motion.div
                            whileHover={{ x: sidebarCollapsed ? 0 : 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="nav-icon-label"
                            style={{
                                display: 'contents'
                            }}
                        >
                            <item.icon size={20} />
                            <AnimatePresence>
                                {!sidebarCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="nav-label"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Link>
                );
            })}
        </nav>
    </motion.div>
};

export default Sidebar;
