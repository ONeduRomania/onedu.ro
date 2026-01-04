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
    type SolutionType = {
        title: string;
        category: string;
        image: string;
        description: string;
        link: string;
        id: string;
        status: string;
    };

    const [allSolutions, setAllSolutions] = useState<SolutionType[]>([]);
    const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 30;

    const openPopup = (
        solution: SolutionType,
        allSolutionsList: SolutionType[],
        solutionId: string
    ) => {
        // Verifică dacă soluția există în listă
        const solutionInList = allSolutionsList.find(s => s.id === solutionId);
        if (!solutionInList) {
            console.error('Soluție negăsită în listă:', solutionId, 'Soluție primită:', solution);
            return;
        }
        
        // Verifică dacă soluția primită corespunde cu soluția din listă
        if (solution.id !== solutionId) {
            console.error('ID-ul soluției nu corespunde:', solution.id, 'vs', solutionId);
        }
        
        // Salvează lista de soluții și soluția selectată
        // Folosim o copie a listei pentru a evita problemele cu re-render-ul
        const solutionsCopy = allSolutionsList.map(s => ({ ...s }));
        setAllSolutions(solutionsCopy);
        setSelectedSolutionId(solutionId);
        
        // Actualizează pagina bazată pe poziția soluției în listă
        const indexInAll = solutionsCopy.findIndex(s => s.id === solutionId);
        if (indexInAll !== -1) {
            const page = Math.floor(indexInAll / projectsPerPage) + 1;
            setCurrentPage(page);
        }
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedSolutionId(null);
        setShowPopup(false);
        setAllSolutions([]);
    };

    const handleNavigate = (direction: 'prev' | 'next') => {
        if (!selectedSolutionId || allSolutions.length === 0) return;

        const currentIndex = allSolutions.findIndex(s => s.id === selectedSolutionId);
        if (currentIndex === -1) return;

        const newIndex = direction === 'prev'
            ? currentIndex - 1
            : currentIndex + 1;

        if (newIndex >= 0 && newIndex < allSolutions.length) {
            const newSolution = allSolutions[newIndex];
            setSelectedSolutionId(newSolution.id);
            // Actualizează pagina dacă este necesar
            const newPage = Math.floor(newIndex / projectsPerPage) + 1;
            if (newPage !== currentPage) {
                setCurrentPage(newPage);
            }
        }
    };


    return (
        <>
            <Navbar/>
            <section
                className="w-full flex flex-col items-center justify-center relative min-h-[150px] md:min-h-[180px] overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #d2e2ff 0%, #a8c5ff 30%, #16366d 100%)",
                }}
            >
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="relative z-10 flex flex-col items-center justify-center max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md text-center">
                        Planul nostru pentru educația din România
                    </h1>
                </div>
            </section>

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}raly_workshop_cje.jpg`]}
                altTexts={['scoalaonedu']}
                title="Investitori în educație"
                text="Încă din 2019, la Asociația ONedu investim în viitorul educației prin timp, resurse, donații și inovație. Cu sprijinul donatorilor și partenerilor noștri transformăm idei în soluții digitale, proiecte educaționale și evenimente care inspiră, atingând anual zeci de mii de oameni. Printr-o donație lunară poți deveni și tu parte din comunitatea care investește în educația din România."
                layout="left"
                buttonText="Donează acum"
                buttonLink="/doneaza"
            />

            <ColumnSection
                sectionTitle="Ce facem pentru România"
                cards={ceFacem}
                backgroundColor="bg-[#d2e2ff]"
            />

            <DigitalSolutionsSection 
                solutions={solutii.solutii} 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                openPopup={openPopup}
            />

            {showPopup && selectedSolutionId && allSolutions.length > 0 && (() => {
                const selectedSolution = allSolutions.find(s => s.id === selectedSolutionId);
                const currentIndex = allSolutions.findIndex(s => s.id === selectedSolutionId);
                
                if (!selectedSolution) {
                    console.error('Soluție negăsită pentru ID:', selectedSolutionId, 'Lista:', allSolutions.map(s => s.id));
                    return null;
                }
                
                return (
                    <SolutionPopup
                        solution={selectedSolution}
                        closePopup={closePopup}
                        onNavigate={handleNavigate}
                        hasPrevious={currentIndex > 0}
                        hasNext={currentIndex < allSolutions.length - 1}
                    />
                );
            })()}

            <Footer/>
        </>
    );
}
