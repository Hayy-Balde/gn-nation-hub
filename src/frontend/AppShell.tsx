'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bell, ChevronDown, Compass, LockKeyhole, Menu, Search, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useMemo, useState } from 'react';
import { backofficeNavigationItems, frontNavigationItems } from './navigation';
import { LogoutButton } from './LogoutButton';

type AppShellProps = {
    children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();

    if (pathname.startsWith('/auth')) {
        return <AuthShell>{children}</AuthShell>;
    }

    if (pathname.startsWith('/backoffice')) {
        return <BackofficeShell>{children}</BackofficeShell>;
    }

    return <FrontOfficeShell>{children}</FrontOfficeShell>;
}

function FrontOfficeShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="site-shell">
            <header className="public-header">
                <Link href="/" className="brand-lockup">
                    <span className="brand-mark">
                        <Compass size={22} />
                    </span>
                    <span>
                        <strong>GnNationHub</strong>
                        <small>Territoires de Guinée</small>
                    </span>
                </Link>

                <nav className={`public-nav ${menuOpen ? 'open' : ''}`}>
                    {frontNavigationItems.map((item) => {
                        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                        return (
                            <Link key={item.id} href={item.href} className={active ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="header-actions">
                    <Link href="/auth/login" className="ghost-action">
                        Connexion
                    </Link>
                    <Link href="/backoffice" className="solid-action">
                        Backoffice
                    </Link>
                    <button className="mobile-menu" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <Menu size={20} />
                    </button>
                </div>
            </header>

            <main>{children}</main>
            <footer className="public-footer">
                <div>
                    <strong>GnNationHub</strong>
                    <p>Explorer les régions, préfectures, communes, quartiers et secteurs avec une lecture claire du territoire.</p>
                </div>
                <div className="footer-links">
                    <Link href="/regions">Explorer</Link>
                    <Link href="/auth/login">Connexion</Link>
                    <Link href="/backoffice">Pilotage</Link>
                </div>
            </footer>
        </div>
    );
}

function AuthShell({ children }: AppShellProps) {
    return (
        <div className="auth-shell">
            <Link href="/" className="brand-lockup auth-brand">
                <span className="brand-mark">
                    <Compass size={22} />
                </span>
                <span>
                    <strong>GnNationHub</strong>
                    <small>Accès sécurisé</small>
                </span>
            </Link>
            <div className="auth-visual">
                <div className="auth-panel">
                    <ShieldCheck size={36} />
                    <h1>Connexion institutionnelle</h1>
                    <p>Un point d’entrée calme pour administrer les zones, contrôler les accès et garder une vue nette sur les données territoriales.</p>
                </div>
            </div>
            <main className="auth-content">{children}</main>
        </div>
    );
}

function BackofficeShell({ children }: AppShellProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const activeLabel = useMemo(
        () => backofficeNavigationItems.find((item) => (item.href === '/backoffice' ? pathname === item.href : pathname.startsWith(item.href)))?.label ?? 'Pilotage',
        [pathname],
    );

    return (
        <div className={`backoffice-shell ${collapsed ? 'is-collapsed' : ''}`}>
            <aside className="bo-sidebar">
                <Link href="/backoffice" className="bo-brand">
                    <span className="brand-mark">
                        <Compass size={22} />
                    </span>
                    {!collapsed && <strong>Backoffice</strong>}
                </Link>
                <nav>
                    {backofficeNavigationItems.map((item) => {
                        const active = item.href === '/backoffice' ? pathname === item.href : pathname.startsWith(item.href);
                        return (
                            <Link key={item.id} href={item.href} className={active ? 'active' : ''}>
                                <item.icon size={18} />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="bo-main">
                <header className="bo-topbar">
                    <div className="bo-left">
                        <button className="icon-button" aria-label="Réduire le menu" onClick={() => setCollapsed(!collapsed)}>
                            <Menu size={20} />
                        </button>
                        <div>
                            <span className="eyebrow">Console</span>
                            <strong>{activeLabel}</strong>
                        </div>
                    </div>

                    <div className="bo-search">
                        <Search size={17} />
                        <input type="search" placeholder="Rechercher une zone, un code, une action..." />
                    </div>

                    <div className="bo-actions">
                        <button className="icon-button" aria-label="Notifications">
                            <Bell size={19} />
                        </button>
                        <div className="profile-menu">
                            <button className="profile-chip" onClick={() => setProfileOpen(!profileOpen)}>
                                <User size={17} />
                                <span>Admin</span>
                                <ChevronDown size={15} />
                            </button>
                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        className="profile-dropdown"
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                    >
                                        <Link href="/">Front office</Link>
                                        <LogoutButton />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>
                <main className="bo-content">{children}</main>
            </div>
        </div>
    );
}
