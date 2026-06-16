import { KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Sécurité' };

export default function BackofficeSecurityPage() {
    return (
        <section className="bo-page">
            <div className="bo-hero compact">
                <div>
                    <span className="eyebrow">Backoffice</span>
                    <h1>Sécurité et accès</h1>
                    <p>Structure prête pour connecter une vraie stratégie d’authentification.</p>
                </div>
                <Link href="/auth/login" className="solid-action">
                    Tester l’accès
                </Link>
            </div>
            <div className="security-grid">
                <article>
                    <ShieldCheck size={24} />
                    <h2>Rôles</h2>
                    <p>Administrateur, éditeur territorial et lecteur peuvent être branchés sur une table users/roles.</p>
                </article>
                <article>
                    <KeyRound size={24} />
                    <h2>Sessions</h2>
                    <p>La couche UI est prête pour cookies httpOnly, JWT ou NextAuth selon ton choix backend.</p>
                </article>
                <article>
                    <LockKeyhole size={24} />
                    <h2>Audit</h2>
                    <p>Les actions sensibles pourront alimenter un journal d’activité côté API.</p>
                </article>
            </div>
        </section>
    );
}
