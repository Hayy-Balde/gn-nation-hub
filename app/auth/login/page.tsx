import { LoginForm } from '@frontend/LoginForm';
import { Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Connexion' };

export default function LoginPage() {
    return (
        <section className="auth-card">
            <span className="eyebrow">Authentication</span>
            <h1>Se connecter</h1>
            <p>Accède au backoffice pour administrer le référentiel territorial.</p>

            <LoginForm />

            <div className="auth-meta">
                <Mail size={17} />
                <span>Pas encore d’accès ?</span>
                <Link href="/auth/register">Demander un compte</Link>
            </div>
            <div className="auth-assurance">
                <ShieldCheck size={18} />
                <span>Interface prête pour NextAuth, JWT ou sessions serveur.</span>
            </div>
        </section>
    );
}
