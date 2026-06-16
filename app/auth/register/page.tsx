import { ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Demande d’accès' };

export default function RegisterPage() {
    return (
        <section className="auth-card">
            <span className="eyebrow">Authentication</span>
            <h1>Demander un accès</h1>
            <p>Prépare un compte opérateur pour les équipes qui maintiennent les données territoriales.</p>

            <form className="auth-form">
                <label>
                    Nom complet
                    <input type="text" placeholder="Aminata Camara" />
                </label>
                <label>
                    Institution
                    <input type="text" placeholder="Ministère, agence, commune..." />
                </label>
                <label>
                    Email professionnel
                    <input type="email" placeholder="nom@institution.gov.gn" />
                </label>
                <Link href="/auth/login" className="auth-submit">
                    Envoyer la demande
                    <ArrowRight size={18} />
                </Link>
            </form>

            <div className="auth-meta">
                <Building2 size={17} />
                <span>Déjà inscrit ?</span>
                <Link href="/auth/login">Se connecter</Link>
            </div>
        </section>
    );
}
