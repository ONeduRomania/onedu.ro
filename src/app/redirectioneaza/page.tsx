// components
import { Navbar, Footer } from "@/components";
import Hero from "@/components/pageContent/hero";
import React from "react";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import studentsStories from "../../data/studentsStories.json";
import RedirectioneazaCall from "@/app/redirectioneaza/redirectCall";
import FormSubmission from "@/app/redirectioneaza/infoRedirect";


export default function Homepage() {
    return (
        <>
            <Navbar />
            <Hero
                background="/image/gvr-people.jpg"
                title="Modernizăm educația împreună."
                subtitle="Anual părinții scot bani din buzunar pentru accesul elevilor din România la educație. Ajută-ne să construim soluții digitale în educație și să renovăm împreună școli."
            >
                <RedirectioneazaCall/>
            </Hero>

            <ContentSection
                images={['/image/team-group/bkm_centru.jpg', '/image/team-group/tgmures_abc.jpg']}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Manifestul nostru"
                text="Am pornit ca o mișcare civică în 2019 la inițiativa a doi elevi gălățeni, din dorința de a digitaliza educația din România. Din 2025 modernizăm educația pe toate planurile: infrastructură, resurse materiale și resurse digitale. Construim împreună soluții digitale pentru elevi, părinți, tineri, profesori, școli și modernizăm școlile României. Construim România educată."
                layout="left"
            />

            <ColumnSection
                sectionTitle="Poveștile elevilor din România"
                cards={studentsStories}
                backgroundColor="bg-[#d2e2ff]"
            />

            <ContentSection
                images={['/image/team-group/bkm_centru.jpg', '/image/team-group/tgmures_abc.jpg']}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Unde merge investiția ta?"
                text="Am pornit ca o mișcare civică în 2019 la inițiativa a doi elevi gălățeni, din dorința de a digitaliza educația din România. Din 2025 modernizăm educația pe toate planurile: infrastructură, resurse materiale și resurse digitale. Construim împreună soluții digitale pentru elevi, părinți, tineri, profesori, școli și modernizăm școlile României. Construim România educată."
                layout="right"
            />

            <FormSubmission />
            <ContentSection
                images={['/image/team-group/bkm_centru.jpg']}
                altTexts={['bkm_centru']}
                title="Detalii fiscale"
                text="Formularul 230 se completează de către persoanele fizice care realizează venituri din salarii. Procentul nu trebuie să depăşească plafonul de 3,5% din impozitul pe venit.
                <br/><br/>Nu pot redirecționa 3,5% din impozitul pe venit: PFA-urile, titularii de întreprinderi individuale și familiale și alții care obțin venituri din activități independente (profesii liberale), cei care obțin venituri din drepturi de autor și pensii, în general cei care puteau face redirecționarea prin completarea formularului 230 sau a rubricii specifice din Declarația Unică (formularul 212)."
                layout="left"
            />
            <Footer />
        </>
    );
}
