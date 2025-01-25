"use client";
import {Navbar, Footer, Hero} from "@/components";
import React, {useMemo, useState} from "react";
import ContentSection from "@/components/pageContent/content-section";
import ceFacem from "@/data/ceFacem.json";
import ColumnSection from "@/components/pageContent/column-section";
import DigitalSolutionsSection from "@/app/plan/digitalsolutions-section";
import SolutionPopup from "@/app/plan/SolutionPopup";
import solutii from '@/data/solutions.json';

export default function Plan() {
    const [selectedSolution, setSelectedSolution] = useState<{
        title: string;
        category: string;
        image: string;
        description: string;
        link: string;
        id: string;
        status: string;
    } | null>(null);

    const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const filteredSolutions = useMemo(() => solutii.solutii, []);

    const openPopup = (solution: {
        title: string;
        category: string;
        image: string;
        description: string;
        link: string;
        id: string;
        status: string;
    }) => {
        const index = filteredSolutions.findIndex(s => s.id === solution.id);
        setSelectedSolutionIndex(index);
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedSolutionIndex(null);
        setShowPopup(false);
    };

    const handleNavigate = (direction: 'prev' | 'next') => {
        if (selectedSolutionIndex === null) return;

        const newIndex = direction === 'prev'
            ? selectedSolutionIndex - 1
            : selectedSolutionIndex + 1;

        if (newIndex >= 0 && newIndex < filteredSolutions.length) {
            setSelectedSolutionIndex(newIndex);
        }
    };


    return (
        <>
            <Navbar/>
            <Hero
                background={`${process.env.BASE_IMAGE_URL}hero-bg.jpg`}
                title="Planul nostru pentru educația din România"
                subtitle=""
            />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}workshop_cj_1.jpg`]}
                altTexts={['tedx2024']}
                title="Investitori în educație"
                text="La Asociația ONedu, investim zi de zi în viitorul educației prin resurse, timp, donații și inovație, încă din 2019. Alături de donatorii și partenerii noștri, transformăm ideile în soluții digitale, proiecte educaționale și evenimente care inspiră și ajung anual la zeci de mii de oameni.
                Poți investi în educația din România printr-o donație lunară și devii parte din comunitatea investitorilor în educație."
                layout="left"
            />

            <ColumnSection
                sectionTitle="Ce facem pentru România"
                cards={ceFacem}
                backgroundColor="bg-[#d2e2ff]"
            />



            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}raly_workshop_cje.jpg`]}
                altTexts={['scoalaonedu']}
                title="Programul Școala ONedu: școala secolului 21"
                text="Sistemul educațional este învechit și are nevoie de modernizare pe toate planurile: digitalizare, planuri de învățământ, spații de învățare și multe altele. Prin programul Școala ONedu ne propunem să renovăm școli și să le transformăm în spații de învățare moderne, adaptate nevoilor elevilor și profesorilor din secolul 21. Mai multe detalii în curând."
                layout="right"
                // buttonText="Vezi conceptul"
                // buttonLink="/scoala"
            />

            <DigitalSolutionsSection solutions={solutii.solutii} openPopup={openPopup}/>

            {showPopup && selectedSolutionIndex !== null && (
                <SolutionPopup
                    solution={filteredSolutions[selectedSolutionIndex]}
                    closePopup={closePopup}
                    onNavigate={handleNavigate}
                    hasPrevious={selectedSolutionIndex > 0}
                    hasNext={selectedSolutionIndex < filteredSolutions.length - 1}
                />
            )}

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}invitati_abc.jpg`]}
                altTexts={['Centrul iVoluntar']}
                title="Centrul iVoluntar"
                text="Născuți din pasiune pentru voluntariat și comunitate, suntem primul centru dedicat tinerilor și voluntarilor din România, din cadrul Asociației ONedu. Construim soluții digitale dedicate tinerilor și organizațiilor non-guvernamentale și organizării de programe de formare a tinerilor și voluntarilor. Organizăm anual Gala Voluntariatului - eveniment dedicat eroilor din comunități."
                layout="left"
                buttonText="Vezi activitatea"
                buttonLink="https://ivoluntar.org"
            />

            <Footer/>
        </>
    );
}
