'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('admin@gnnationhub.gov.gn');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setLoading(true);

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember }),
        });

        setLoading(false);

        if (!response.ok) {
            setError('Email ou mot de passe incorrect.');
            return;
        }

        router.replace(searchParams.get('next') || '/backoffice');
        router.refresh();
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <label>
                Email institutionnel
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required />
            </label>
            <label>
                Mot de passe
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="admin12345"
                    autoComplete="current-password"
                    required
                />
            </label>
            <div className="form-row">
                <label className="check-row">
                    <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                    Garder la session active
                </label>
                <a href="/auth/recover">Mot de passe oublié</a>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
                {loading ? 'Connexion...' : 'Continuer'}
            </button>
        </form>
    );
}
