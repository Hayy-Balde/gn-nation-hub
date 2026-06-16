import PageHeader from "@/Components/PageHeader";
import ZoneCard from "@/Components/ZoneCard";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { PageProps } from "@/types";
import { Commune } from "@/types/db/commune";
import { Prefecture } from "@/types/db/Prefecture";
import { Head, usePage } from "@inertiajs/react";
import { FC } from "react";

const Show: FC = () => {
    const { props } = usePage<PageProps>()

    const communes: Commune[] = props.communes;
    const prefecture: Prefecture = props.prefecture;

    return (
        <HomeLayout >
            <Head title="Liste Communes" />
            <PageHeader title='Listes des Communes' description={`La liste de toutes les communes de ${prefecture.nom}`} route={route('regions.index.prefecture.public', {region: prefecture.region.id})} />

            <div className="stats-grid">
                {communes.map((commune, index) => (
                    <ZoneCard key={index} zone={commune} index={index} route={route('communes.index.quartier.public', {commune: commune.id})} />
                ))}
            </div>
        </HomeLayout>
    )
}

export default Show
