import { ArrowLeftCircleIcon } from 'lucide-react';
import Link from 'next/link';

type PageHeaderProps = {
    title: string;
    description?: string;
    backHref?: string;
};

export function PageHeader({ title, description = '', backHref }: PageHeaderProps) {
    return (
        <div className="page-header">
            <div>
                <h1>{title}</h1>
                {description && <p>{description}</p>}
            </div>
            {backHref && (
                <div className="page-actions">
                    <Link href={backHref} className="btn btn-primary">
                        <ArrowLeftCircleIcon size={18} />
                        Retour
                    </Link>
                </div>
            )}
        </div>
    );
}
