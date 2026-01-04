import { Navbar, Footer } from "@/components";
import React from "react";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import ceFacem from "@/data/ceFacem.json";
import TeamSection from "@/app/despre/echipa";
import DigitalizationSection from "@/app/despre/steps";
import TransparencySection from "@/app/despre/TransparencySection";
import HeroDespre from "./hero-despre";


export default function Homepage() {
    return (
        <>
            <Navbar />
            <HeroDespre
                background={`${process.env.BASE_IMAGE_URL}tedx_principalphoto.jpg`}
                title="Punem bazele unei educații care ține pasul cu viitorul."
            />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/tedxteam2025.jpg`, `${process.env.BASE_IMAGE_URL}team-group/sedintaCD_2021.jpg`, `${process.env.BASE_IMAGE_URL}team-group/galaCOR_2021.jpg`, `${process.env.BASE_IMAGE_URL}team-group/galatren2022.jpg`]}
                altTexts={['Sedinta CD 2021', 'GalaCOR2021', 'Bucuresti 2020', 'Spre Gala 2022']}
                title="Povestea noastră"
                text="Comunitatea ONedu România s-a născut din curajul și viziunea a doi elevi din Galați care, în 2019, au simțit nevoia urgentă de a moderniza educația din România. Cu resurse limitate au pornit pe un drum lung cu dorința de a face educația accesibilă, modernă și adaptată la secolul 21 pentru toți.
                <br/><br/> Ce a început ca o inițiativă mică s-a transformat într-o mișcare națională. În fiecare proiect, fiecare soluție digitală creată, am pus o bucățică din visul nostru.  Astăzi, Asociația ONedu construiește și dezvoltă soluții digitale gratuite pentru educație, proiecte pentru tineri și programe cu impact în comunitate. Construim împreună nu doar soluții digitale, ci și șansa unui viitor mai bun pentru elevi, profesori, părinți și întreaga societate. Visăm la o Românie în care educația este accesibilă tuturor și muncim zi de zi pentru a transforma acest vis în realitate."
                layout="left"
            />

            <ColumnSection
                sectionTitle="Ce facem pentru România"
                cards={ceFacem}
                backgroundColor="bg-[#d2e2ff]"
            />

            <DigitalizationSection />
            <TeamSection />
            <TransparencySection
                buttonLink="/rapoarte"
                buttonText="Vezi rapoartele noastre"
            />

            <Footer />
        </>
    );
}
