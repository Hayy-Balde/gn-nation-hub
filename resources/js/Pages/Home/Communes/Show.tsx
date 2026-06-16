import PageHeader from "@/Components/PageHeader";
import ZoneCard from "@/Components/ZoneCard";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { PageProps } from "@/types";
import { Commune } from "@/types/db/commune";
import { Prefecture } from "@/types/db/Prefecture";
import { Quartier } from "@/types/db/quartier";
import { Head, usePage } from "@inertiajs/react";
import { FC } from "react";

const Show: FC = () => {
    const { props } = usePage<PageProps>()

    const quartiers: Quartier[] = props.quartiers;
    const commune: Commune = props.commune;

    return (
        <HomeLayout >
            <Head title="Communes Détails" />
            <PageHeader title='Listes des Quartiers' description={`les Quartiers de la commune de ${commune.nom}`} route={route('prefectures.index.commune.public', {prefecture: commune.prefecture.id})} />

            <div className="stats-grid">
                {quartiers.map((quartier, index) => (
                    <ZoneCard key={index} zone={quartier} index={index} route={route('quartiers.index.secteur.public', {quartier: quartier.id})} />
                ))}
            </div>
        </HomeLayout>
    )
}

export default Show
