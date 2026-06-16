import PageHeader from "@/Components/PageHeader";
import ZoneCard from "@/Components/ZoneCard";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { PageProps } from "@/types";
import { Commune } from "@/types/db/commune";
import { Head, Link, usePage } from "@inertiajs/react";
import { FC } from "react";

const Index: FC = () => {
    const { props } = usePage<PageProps>()

    const communes: Commune[] = props.communes.data
    return (
        <HomeLayout >
            <Head title="Communes" />
            <PageHeader title='Communes' description='La liste de toutes les Communes'  />

            <div className="stats-grid">
                {communes.map((commune, index) => (
                    <ZoneCard key={index} zone={commune} index={index} route={route('communes.index.quartier.public', {commune: commune.id})} />
                ))}
            </div>

            {/* Paginations */}
            <div className="mt-4 flex justify-end gap-2">
                {props.communes.links.map((link, index) => (
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
