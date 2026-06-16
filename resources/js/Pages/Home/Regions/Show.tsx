import PageHeader from "@/Components/PageHeader";
import ZoneCard from "@/Components/ZoneCard";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { PageProps } from "@/types";
import { Prefecture } from "@/types/db/Prefecture";
import { Region } from "@/types/db/region";
import { Head, usePage } from "@inertiajs/react";
import { FC } from "react";

const Show: FC = () => {
    const { props } = usePage<PageProps>()

    const prefectures: Prefecture[] = props.prefectures;
    const region: Region = props.region;

    return (
        <HomeLayout >
            <Head title="Liste des Préfectures" />
            <PageHeader title='Liste des Préfectures' description={`La liste de toutes les Préfectures de ${region.nom}`} route={route('regions.index.public')} />

            <div className="stats-grid">
                {prefectures.map((prefecture, index) => (
                    <ZoneCard key={index} zone={prefecture} index={index}  route={route('prefectures.index.commune.public', {prefecture: prefecture.id})} />
                ))}
            </div>
        </HomeLayout>
    )
}

export default Show
