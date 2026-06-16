import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Bell, User, Menu, ChevronDown, Sun, Moon,
} from 'lucide-react';
import { useState, type FC } from 'react';

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void,
    sidebarCollapsed: boolean,
    setSidebarCollapsed: (value: boolean) => void,
}




const Navbar: FC<NavbarProps> = ({ darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
            <div className="navbar-left">
                <button
                    title='Menu'
                    className="btn-icon"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                    <Menu size={20} />
                </button>

                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="search-input"
                    />
                </div>
            </div>

            <div className="navbar-right">
                <button
                    className="btn-icon"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="dropdown">
                    <button
                        className="btn-icon notification-btn"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        <span className="notification-badge">3</span>
                    </button>
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="dropdown-menu notifications"
                            >
                                <div className="dropdown-header">Notifications</div>
                                <div className="notification-item">
                                    <div className="notification-content">
                                        <strong>Nouvelle commande</strong>
                                        <p>Commande #12349 reçue</p>
                                    </div>
                                </div>
                                <div className="notification-item">
                                    <div className="notification-content">
                                        <strong>Utilisateur inscrit</strong>
                                        <p>Nouvel utilisateur: Sophie Martin</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="dropdown">
                    <button
                        className="profile-btn"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className="avatar">
                            <User size={18} />
                        </div>
                        <span className="profile-name">Admin User</span>
                        <ChevronDown size={16} />
                    </button>
                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="dropdown-menu"
                            >
                                <a href="#" className="dropdown-item">Mon profil</a>
                                <a href="#" className="dropdown-item">Paramètres</a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item text-danger">Déconnexion</a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
