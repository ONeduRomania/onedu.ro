// components

"use client";
import { Navbar, Footer } from "@/components";
import React from "react";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import studentsStories from "../../data/studentsStories.json";
import HeroSection from "@/app/sponsorizeaza/hero";
import InvestmentSection from "@/app/sponsorizeaza/redirectCalculation";
import SponsorshipCalculator from "@/app/sponsorizeaza/redirectCalculation";


export default function Homepage() {
    return (
        <>
            <Navbar />
            <HeroSection />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/bkm_centru.jpg`, `${process.env.BASE_IMAGE_URL}team-group/tgmures_abc.jpg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Manifestul nostru"
                text="În 2019, doi elevi din Galați au inițiat o mișcare civică pentru a digitaliza educația din România. De atunci, această viziune s-a transformat într-o misiune națională: modernizarea educației prin infrastructură, resurse materiale și digitale. Lucrăm pentru a oferi soluții digitale inovatoare pentru elevi, părinți, profesori și școli. Împreună, construim un viitor digital pentru generațiile de azi și de mâine."
                layout="left"
            />

            <ColumnSection
                sectionTitle="Poveștile elevilor din România"
                cards={studentsStories}
                backgroundColor="bg-[#d2e2ff]"
            />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/bkm_centru.jpg`, `${process.env.BASE_IMAGE_URL}team-group/tgmures_abc.jpg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Unde merge investiția ta"
                text="Prin sprijinul tău, contribuim direct la modernizarea educației din România. Investițiile se transformă în soluții digitale gratuite pentru toți elevii, părinții și profesorii, cât și în proiecte pentru comunitate prin care educăm și dăm voce educației. Împreună construim o educație mai echitabilă și mai adaptată nevoilor actuale."
                layout="right"
                buttonText="Vezi planul nostru"
                buttonLink="/plan"
            />

            <SponsorshipCalculator/>

            <Footer />
        </>
    );
}
