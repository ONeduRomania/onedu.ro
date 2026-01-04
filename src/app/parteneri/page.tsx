import {Navbar, Footer} from "@/components";
import React from "react";
import partnersData from '@/data/parteneri.json';
import PartenerCard from "@/app/parteneri/PartenerCard";
import HeroParteneri from "./hero-parteneri";


export default function Parteneri() {

    return (
        <>
            <Navbar/>
            <HeroParteneri
                title="🤝 Parteneri"
                subtitle="Investim transparent în educație."
            />
            {/* Secțiune Sponsori */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Sponsori</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                        {partnersData.sponsori.map((sponsor) => (
                            <PartenerCard
                                key={sponsor.id}
                                url={sponsor.url}
                                src={sponsor.src}
                                alt={sponsor.alt}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Secțiune Sponsori in-kind */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Sponsori in-kind</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                        {partnersData.sponsoriInKind.map((sponsor) => (
                            <PartenerCard
                                key={sponsor.id}
                                url={sponsor.url}
                                src={sponsor.src}
                                alt={sponsor.alt}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Secțiune Parteneri și prieteni #teamCOR */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Parteneri și prieteni #teamCOR</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                        {partnersData.teamCOR.map((partner) => (
                            <PartenerCard
                                key={partner.id}
                                url={partner.url}
                                src={partner.src}
                                alt={partner.alt}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
        ;
}
