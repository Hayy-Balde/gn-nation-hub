import { SidebarItemsType } from '@/types/sidebarItemType';
import {
    Home, Users, BarChart3, Settings, TrendingUp, DollarSign, ShoppingCart, Calendar
} from 'lucide-react';


// Définition des items du sidebar avec les routes associées
export const sidebarItems: SidebarItemsType[] = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', route: 'home.index' },
    { id: 'regions', icon: Users, label: 'Régions', route: 'regions.index.public' },
    { id: 'prefecture', icon: BarChart3, label: 'Préfectures', route: 'prefectures.index.public' },
    { id: 'communes', icon: ShoppingCart, label: 'Communes', route: 'communes.index.public' },
    { id: 'quartiers', icon: Calendar, label: 'Quartiers', route: 'quartiers.index.public' },
    { id: 'secteurs', icon: Settings, label: 'Secteurs', route: 'secteurs.index.public' },
];
