'use client';

import {Navbar, Footer} from "@/components";
import Hero from "@/app/redirectioneaza/hero";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import studentsStories from "../../data/studentsStories.json";
import FormSubmission from "@/app/redirectioneaza/infoRedirect";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function RedirectioneazaPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/redirectioneaza/fwd");
    }, [router]);

    return (
        <>
            <Navbar/>
            <Hero
                background={`${process.env.BASE_IMAGE_URL}tedx/tedx_sala2.jpg`}
                title="Construim împreună viitorul educației."
                subtitle="Cu 3,5% din impozitul tău, transformăm modul în care copiii din România învață. Ajută-ne să aducem tehnologia în sălile de clasă și să le oferim elevilor șansa de a se conecta la viitor."
                // youtubeUrl="https://youtu.be/3WvchgVIOqI"
                buttonText="Completează formularul"
                buttonLink="/formular230"
            />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/tedx2024.jpeg`, `${process.env.BASE_IMAGE_URL}team-group/bkm_centru.jpg`, `${process.env.BASE_IMAGE_URL}team-group/galaCOR2021.jpeg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Manifestul nostru"
                text="Am pornit la inițiativa a doi elevi gălățeni în 2019, cu scopul de a conecta cei 3.8 milioane de elevi români la viitor.
                Avem peste 3.8 milioane de motive pentru a moderniza educația din România. Construim zi de zi soluții digitale inovatoare pentru elevi, părinți, profesori și școli. Împreună pentru generațiile de azi și mâine!"
                layout="left"
            />

            <ColumnSection
                sectionTitle="Poveștile elevilor din România"
                cards={studentsStories}
                backgroundColor="bg-[#d2e2ff]"
            />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/AmaliaCD.jpeg`, `${process.env.BASE_IMAGE_URL}team-group/abc_GL_2019.jpg`, `${process.env.BASE_IMAGE_URL}team-group/clase.png`, `${process.env.BASE_IMAGE_URL}team-group/caravanaCluj_1.jpg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Unde merge investiția ta?"
                text='Cu fiecare formular, ecosistemul de <a href="/plan">soluții digitale</a> devine realitate pentru cei 3.8 milioane de elevi din toată țara.
                    Prin investiția ta, conectăm elevii cu viitorul. <br/><br/>
                    Pentru anul 2025, ne-am propus să construim soluțiile:
                    <br/>
                    - <b>Andrei</b>: asistent în alegerea liceului
                    <br/>
                    - <b>AmExamen</b>: un ecosistem dedicat examenelor naționale
                    <br/>
                    - <b>Eva</b>: competențe digitale de 10!'
                layout="right"
            />

            <FormSubmission/>
            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}fiscal_details.jpg`]}
                altTexts={['bkm_centru']}
                title="Detalii fiscale"
                text="Formularul 230 se completează de către persoanele fizice care realizează venituri din salarii. Procentul nu trebuie să depăşească plafonul de 3,5% din impozitul pe venit.
                <br/><br/>Nu pot redirecționa 3,5% din impozitul pe venit: PFA-urile, titularii de întreprinderi individuale și familiale și alții care obțin venituri din activități independente (profesii liberale), cei care obțin venituri din drepturi de autor și pensii, în general cei care puteau face redirecționarea prin completarea formularului 230 sau a rubricii specifice din Declarația Unică (formularul 212)."
                layout="left"
            />
            <Footer/>
        </>
    );
}
