// src/pages/Rapoarte.tsx
import { Navbar, Footer } from "@/components";
import Hero from "@/components/pageContent/hero";
import React from "react";
import RaportCard from "@/app/rapoarte/RaportCard";
import Link from "next/link";
import { Raport } from "@/app/rapoarte/Raport";

export default function Rapoarte() {

    const rapoarteAnuale: Raport[] = [
        {
            year: '2024',
            title: 'Raport de Activitate 2024',
            links: [
                { href: 'https://assets.onedu.ro/docs/rapoarte/2024/raport-2024.pdf', text: 'Raport de Activitate 2024' },
                { href: 'https://assets.onedu.ro/docs/rapoarte/2024/bilant-2024.pdf', text: 'Bilanț 2024' },
                { href: 'https://assets.onedu.ro/docs/rapoarte/2024/raportCD-2024.pdf', text: 'Raport Consiliu Director 2024' },
            ],
        },
        {
            year: '2023',
            title: 'Raport de Activitate 2023',
            links: [
                { href: 'https://assets.onedu.ro/docs/rapoarte/2023/raport-2023.pdf', text: 'Raport de Activitate 2023' },
                { href: 'https://assets.onedu.ro/docs/rapoarte/2023/bilant-2023.pdf', text: 'Bilanț 2023' },
                { href: 'https://assets.onedu.ro/docs/rapoarte/2023/raportCD-2023.pdf', text: 'Raport Consiliu Director 2023' },
            ],
        },
        {
            year: '2019-2023',
            title: 'Raport final Comunitatea ONedu România',
            links: [{ href: 'https://assets.onedu.ro/docs/rapoarte/2023/raport-final.pdf', text: 'Raport final Comunitatea ONedu România' }],
        },
        {
            year: '2022',
            title: 'Raport de Activitate 2022',
            links: [{ href: 'https://assets.onedu.ro/docs/rapoarte/2022/raport-2022.pdf', text: 'Raport de Activitate 2022' }],
        },
        {
            year: '2020',
            title: 'Raport de Activitate 2020',
            links: [{ href: 'https://assets.onedu.ro/docs/rapoarte/2020/raport-2020.pdf', text: 'Raport de Activitate 2020' }],
        },
    ];

    const transparenta = [
        {
            category: 'Organizare',
            links: [
                { href: 'https://assets.onedu.ro/docs/ong/statut.pdf', text: 'Statutul Asociației ONedu' },
                { href: 'https://assets.onedu.ro/docs/ong/ROF-COR.pdf', text: 'Regulamentul de Organizare și Funcționare' },
                { href: 'https://assets.onedu.ro/docs/regulamente/cod-etica.pdf', text: 'Codul de etică și conduită' },
                { href: 'https://assets.onedu.ro/docs/ong/valori-onedu.pdf', text: 'Principiile și valorile Organizației' },
            ],
        },
        {
            category: 'Documente înființare',
            links: [
                { href: 'https://assets.onedu.ro/docs/ong/CIF.pdf', text: 'Certificat fiscal' },
                { href: 'https://assets.onedu.ro/docs/ong/CIF-intracomunitar.pdf', text: 'Certificat fiscal TVA' },
                { href: 'https://assets.onedu.ro/docs/ong/hot-judecatorie.pdf', text: 'Hotărâre judecătorie' },
                { href: '/rapoarte/dec-registru.pdf', text: 'Decizie registrul entităților' },
            ],
        },
        {
            category: 'Regulamente',
            links: [
                { href: '/terms', text: 'Regulament evenimente' },
                { href: 'https://gala.ivoluntar.org/regulament', text: 'Gala Voluntariatului' },
                { href: 'https://bikemarathon.ro/regulament', text: 'BikeMarathon Cluj-Napoca' },
                { href: 'https://assets.onedu.ro/docs/regulamente/roi-centre.pdf', text: 'ROI Centrele iVoluntar' },
            ],
        },
    ];

    return (
        <>
            <Navbar />
            <Hero
                title="📂 Rapoarte"
                subtitle="Investim transparent în educație."
            />

            {/* Rapoarte de An */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rapoarteAnuale.map((raport, index) => (
                        <RaportCard
                            key={index}
                            year={raport.year}
                            title={raport.title}
                            links={raport.links}
                        />
                    ))}
                </div>
            </section>

            <h1 className="text-3xl font-bold text-center text-black my-8">Transparență</h1>
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {transparenta.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-2xl font-bold mb-4 text-black">{item.category}</h3>
                            {item.links && item.links.length > 0 && (
                                <>
                                    <ul className="list-disc list-inside mt-2">
                                        {item.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link href={link.href} className="text-black hover:underline">
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}
