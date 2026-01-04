// src/pages/Rapoarte.tsx
import { Navbar, Footer } from "@/components";
import React from "react";
import RaportCard from "@/app/rapoarte/RaportCard";
import Link from "next/link";
import { Raport } from "@/app/rapoarte/Raport";
import HeroRapoarte from "./hero-rapoarte";
import { FaFilePdf } from "react-icons/fa";

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
            <HeroRapoarte
                title="📂 Rapoarte"
                subtitle="Investim transparent în educație."
            />

            {/* Rapoarte de An */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Rapoarte Anuale</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rapoarteAnuale.map((raport, index) => (
                            <RaportCard
                                key={index}
                                year={raport.year}
                                title={raport.title}
                                links={raport.links}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Transparență */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Transparență</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transparenta.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-custom-blue/30">
                                <h3 className="text-xl font-bold mb-5 text-gray-900 pb-3 border-b-2 border-custom-blue">{item.category}</h3>
                                {item.links && item.links.length > 0 && (
                                    <ul className="space-y-3">
                                        {item.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link 
                                                    href={link.href} 
                                                    className="text-gray-700 hover:text-custom-blue transition-colors duration-200 text-sm hover:underline"
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
