import {Navbar, Footer} from "@/components";
import Hero from "@/components/pageContent/hero";
import React from "react";
import partnersData from '@/data/parteneri.json';
import PartenerCard from "@/app/parteneri/PartenerCard";


export default function Parteneri() {

    return (
        <>
            <Navbar/>
            <Hero
                title="🤝 Parteneri"
                subtitle="Investim transparent în educație."
            />
            <section className="py-8 px-4">
                <h2 className="text-xl font-bold mb-6 ml-2">Sponsori</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
                    {partnersData.sponsori.map((sponsor) => (
                        <PartenerCard
                            key={sponsor.id}
                            url={sponsor.url}
                            src={sponsor.src}
                            alt={sponsor.alt}
                        />
                    ))}
                </div>
            </section>

        {/* Secțiune Sponsori in-kind */}
            <section className="py-8 px-4">
                <h2 className="text-xl font-bold mb-6 ml-2">Sponsori in-kind</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
                    {partnersData.sponsoriInKind.map((sponsor) => (
                        <PartenerCard
                            key={sponsor.id}
                            url={sponsor.url}
                            src={sponsor.src}
                            alt={sponsor.alt}
                        />
                    ))}
                </div>
            </section>

            {/* Secțiune Parteneri și prieteni #teamCOR */}
            <section className="py-8 px-4">
                <h2 className="text-xl font-bold mb-6 ml-2">Parteneri și prieteni #teamCOR</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
                    {partnersData.teamCOR.map((partner) => (
                        <PartenerCard
                            key={partner.id}
                            url={partner.url}
                            src={partner.src}
                            alt={partner.alt}
                        />
                    ))}
                </div>
            </section>
            <Footer/>
        </>
    )
        ;
}
