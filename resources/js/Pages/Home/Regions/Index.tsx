import PageHeader from "@/Components/PageHeader";
import ZoneCard from "@/Components/ZoneCard";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { PageProps } from "@/types";
import { Region } from "@/types/db/region";
import { Head, Link, usePage } from "@inertiajs/react";
import { FC } from "react";

interface IndexProps {
    regions: Region[];
}

const Index: FC = () => {
    const  {props}  = usePage<PageProps>();
    console.log(props);
    // Assurez-vous que `props.regions` est bien de type `Region[]`
    // Si `props.regions` peut être `undefined` ou `null`, ajoutez une vérification

    const regions: Region[] = props.regions.data || [];
    return (
        <HomeLayout >
            <Head title="Régions" />
            <PageHeader title='Régions' description='Liste de toutes les Régions' />

            <div className="stats-grid">
                {regions.map((region, index) => (
                    <ZoneCard key={index} zone={region} index={index} route={route('regions.index.prefecture.public', {region: region.id})} />
                ))}
            </div>
            {/* Paginations */}
            <div className="mt-4 flex gap-2">
                {props.regions.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                ))}

            </div>
        </HomeLayout>
    )
}

export default Index
