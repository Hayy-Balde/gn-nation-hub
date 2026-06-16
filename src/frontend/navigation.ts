import { BarChart3, Calendar, Home, LayoutDashboard, LockKeyhole, MapPinned, Settings, ShoppingCart, Users } from 'lucide-react';

export const frontNavigationItems = [
    { id: 'home', icon: Home, label: 'Accueil', href: '/' },
    { id: 'regions', icon: Users, label: 'Régions', href: '/regions' },
    { id: 'prefectures', icon: BarChart3, label: 'Préfectures', href: '/prefectures' },
    { id: 'communes', icon: ShoppingCart, label: 'Communes', href: '/communes' },
    { id: 'quartiers', icon: Calendar, label: 'Quartiers', href: '/quartiers' },
    { id: 'secteurs', icon: Settings, label: 'Secteurs', href: '/secteurs' },
];

export const backofficeNavigationItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Pilotage', href: '/backoffice' },
    { id: 'zones', icon: MapPinned, label: 'Territoires', href: '/backoffice/zones' },
    { id: 'security', icon: LockKeyhole, label: 'Sécurité', href: '/backoffice/security' },
];
