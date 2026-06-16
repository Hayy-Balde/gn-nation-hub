import { StatsCardsType } from "@/types/sidebarItemType";
import {
    Home, Users, BarChart3, Settings, TrendingUp, DollarSign, ShoppingCart, Calendar
} from 'lucide-react';

export const statsCards: StatsCardsType[] = [
    { title: 'Revenus totaux', value: '€45,231', change: '+20.1%', icon: DollarSign, color: 'success' },
    { title: 'Utilisateurs actifs', value: '2,350', change: '+12.5%', icon: Users, color: 'info' },
    { title: 'Commandes', value: '1,234', change: '+8.3%', icon: ShoppingCart, color: 'warning' },
    { title: 'Taux conversion', value: '3.47%', change: '+2.1%', icon: TrendingUp, color: 'danger' }
];
