import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Récupération' };

export default function RecoverPage() {
    return (
        <section className="auth-card">
            <span className="eyebrow">Authentication</span>
            <h1>Récupérer l’accès</h1>
            <p>Entre ton email institutionnel pour recevoir la procédure de réinitialisation.</p>
            <form className="auth-form">
                <label>
                    Email
                    <input type="email" placeholder="admin@gnnationhub.gov.gn" />
                </label>
                <Link href="/auth/login" className="auth-submit">
                    Envoyer le lien
                    <ArrowRight size={18} />
                </Link>
            </form>
        </section>
    );
}
