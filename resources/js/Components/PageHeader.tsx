import { Link } from "@inertiajs/react";
import { ArrowLeftCircleIcon, Download, Plus } from "lucide-react";
import { FC } from "react";

interface PageHeaderProps {
    title: string,
    description?: string
    route?: string
}

const PageHeader: FC<PageHeaderProps> = ({title, route,  description = ''})=> {
    return (
        <div className="page-header">
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className="page-actions">
                {
                    route &&
                    <Link href={route} className="btn btn-primary">
                        <ArrowLeftCircleIcon size={18} />
                        Retour
                    </Link>
                }
            </div>
        </div>
    )
}

export default PageHeader
