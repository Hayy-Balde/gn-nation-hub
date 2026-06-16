import './globals.css';
import type { Metadata } from 'next';
import { AppShell } from '@frontend/AppShell';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: {
        default: 'GnNationHub',
        template: '%s - GnNationHub',
    },
    description: 'Plateforme de consultation des zones administratives de Guinée.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body>
                <AppShell>{children}</AppShell>
            </body>
        </html>
    );
}
