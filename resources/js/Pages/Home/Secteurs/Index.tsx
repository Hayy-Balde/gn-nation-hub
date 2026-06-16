import PageHeader from "@/Components/PageHeader";
import { HomeLayout } from "@/Layouts/Fronts/HomeLayout";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const Index: FC = () => {
    return (
        <HomeLayout >
            <Head title="Secteurs" />
            <PageHeader title='Secteurs' description='Bienvenue sur votre tableau de bord administrateur' />

            <div>Hello Gays</div>
        </HomeLayout>
    )
}

export default Index
