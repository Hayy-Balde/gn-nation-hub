import PageHeader from "@/Components/PageHeader";
import ZoneCard from "@/Components/ZoneCard";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { PageProps } from "@/types";
import { Prefecture } from "@/types/db/Prefecture";
import { Secteur } from "@/types/db/secteur";
import { Head, usePage } from "@inertiajs/react";
import { FC } from "react";

const Show: FC = () => {
    const { props } = usePage<PageProps>()

    const secteurs: Secteur[] = props.secteurs;
    const quartier = props.quartier

    return (
        <HomeLayout >
            <Head title="Quartiers Détails" />
            <PageHeader title='Listes des Secteurs' description={`les Secteurs du Quartier de ${quartier.nom}`} route={route('communes.index.quartier.public', {commune: quartier.commune.id})} />

            <div className="stats-grid">
                {secteurs.map((secteur, index) => (
                    <ZoneCard key={index} zone={secteur} index={index}  route={route('secteurs.index.quartier.public', {secteur: secteur.id})}/>
                ))}
            </div>
        </HomeLayout>
    )
}

export default Show
