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

            <section className="w-full py-16 md:py-20 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {/* YouTube Video Column */}
                        <div className="w-full md:w-1/2 max-w-[650px] relative">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/3WvchgVIOqI?autoplay=1&mute=1&loop=1&playlist=3WvchgVIOqI&controls=1&rel=0&modestbranding=1"
                                    title="YouTube Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Text Column */}
                        <div className="w-full md:w-1/2 max-w-[600px] flex flex-col justify-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">De ce se pierde creativitatea în școală?</h2>
                            <div className="text-base md:text-lg leading-7 text-gray-700">
                                <p className="mb-4">
                                    Copiii intră în școală curioși, creativi și dornici să descopere. De multe ori însă, sistemul îi învață să reproducă informații, nu să creeze sau să gândească liber. Creativitatea nu dispare, ci rămâne nefolosită.
                                </p>
                                <p>
                                    Educația digitală nu înseamnă ecrane în plus, ci un mod de a învăța care încurajează explorarea, colaborarea și creația. Este șansa de a transforma școala într-un spațiu unde creativitatea nu se oprește, ci crește.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                backgroundColor="bg-gray-50"
                buttonText="Vezi planul nostru"
                buttonLink="/plan"
            />

            <SponsorshipCalculator/>

            <Footer />
        </>
    );
}
