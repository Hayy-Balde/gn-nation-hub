import PageHeader from "@/Components/PageHeader";
import ZoneCard from "@/Components/ZoneCard";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { PageProps } from "@/types";
import { Prefecture } from "@/types/db/Prefecture";
import { Head, usePage } from "@inertiajs/react";
import { FC } from "react";

const Index: FC = () => {
    const { props } = usePage<PageProps>()

    const prefectures: Prefecture[] = props.prefectures;

    return (
        <HomeLayout >
            <Head title="Préfectures" />
            <PageHeader title='Préfectures' description='La liste de toutes les Préfectures' />

            <div className="stats-grid">
                {prefectures.map((prefecture, index) => (
                    <ZoneCard key={index} zone={prefecture} index={index} route={route('prefectures.index.commune.public', {prefecture: prefecture.id})} />
                ))}
            </div>
        </HomeLayout>
    )
}

export default Index
