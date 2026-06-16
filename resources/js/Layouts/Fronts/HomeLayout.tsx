import { useState, useEffect, PropsWithChildren, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Header';
import DashboardContent from '@/Pages/Home/Home';
import { sidebarItems } from '@/Datas/sidebarData';
import Footer from './Footer';
import "../../../css/style.css"

export function HomeLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const [activeSection, setActiveSection] = useState<string>('dashboard');

    // Apply dark mode to document
    useEffect(() => {
        document.body.className = darkMode ? 'dark-theme' : 'light-theme';
        // on le stocke dans le cache
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    return (
        <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
            <Sidebar sidebarCollapsed={sidebarCollapsed} darkMode={darkMode} activeSection={''} setActiveSection={setActiveSection} sidebarItems={sidebarItems} />
            <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                <main className="content">
                    {children}
                </main>
                <Footer darkMode={darkMode} />
            </div>
        </div>
    );
};
