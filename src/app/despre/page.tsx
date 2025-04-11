import { Navbar, Footer } from "@/components";
import Hero from "@/components/pageContent/hero";
import React from "react";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import ceFacem from "@/data/ceFacem.json";
import TeamSection from "@/app/despre/echipa";
import DigitalizationSection from "@/app/despre/steps";
import TransparencySection from "@/app/despre/TransparencySection";


export default function Homepage() {
    return (
        <>
            <Navbar />
            <Hero
                background={`${process.env.BASE_IMAGE_URL}tedx_principalphoto.jpg`}
                title="Modernizăm educația împreună. Pas cu pas."
                subtitle=""
            >
            </Hero>

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/tedxteam2025.jpg`, `${process.env.BASE_IMAGE_URL}team-group/sedintaCD_2021.jpg`, `${process.env.BASE_IMAGE_URL}team-group/galaCOR_2021.jpg`, `${process.env.BASE_IMAGE_URL}team-group/galatren2022.jpg`]}
                altTexts={['Sedinta CD 2021', 'GalaCOR2021', 'Bucuresti 2020', 'Spre Gala 2022']}
                title="Povestea noastră"
                text="Comunitatea ONedu România a început ca un vis curajos al doi elevi din Galați, care în 2019 au văzut o nevoie urgentă: să aducă educația din România mai aproape de generația lor. Cu resurse limitate, dar cu inimi pline de pasiune, au pornit la drum, crezând cu tărie că educația trebuie să fie accesibilă, modernă și adaptată la secolul 21 pentru toți.
                <br/><br/> Ce a început ca o inițiativă mică s-a transformat într-o mișcare națională. În fiecare proiect, fiecare soluție digitală creată, am pus o bucățică din visul nostru.  Astăzi, Asociația ONedu înseamnă o comunitate dedicată, formată din oameni care cred în puterea educației de a schimba vieți. Construim împreună nu doar soluții digitale, ci și șansa unui viitor mai bun pentru elevi, profesori, părinți și întreaga societate. Visăm la o țară mai educată, și ne străduim, zi de zi, să transformăm acest vis în realitate."
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
