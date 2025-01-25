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
            year: '2023',
            title: 'Raport de Activitate 2023',
            links: [
                { href: '/rapoarte/activitate-2023', text: 'Raport de Activitate 2023' },
                { href: '/rapoarte/situatie-financiara-2023', text: 'Bilanț 2023' },
                { href: '/rapoarte/consiliu-director-2023', text: 'Raport Consiliu Director 2023' },
            ],
        },
        {
            year: '2019-2023',
            title: 'Raport final Comunitatea ONedu România',
            links: [{ href: '/rapoarte/activitate-2022', text: 'Raport final Comunitatea ONedu România' }],
        },
        {
            year: '2022',
            title: 'Raport de Activitate 2022',
            links: [{ href: '/rapoarte/activitate-2022', text: 'Raport de Activitate 2022' }],
        },
        {
            year: '2020',
            title: 'Raport de Activitate 2020',
            links: [{ href: '/rapoarte/activitate-2021', text: 'Raport de Activitate 2020' }],
        },
    ];

    const transparenta = [
        {
            category: 'Organizare',
            title: 'Statutul Asociației ONedu',
            links: [
                { href: '/rapoarte/audit-2020', text: 'Regulamentul de Organizare și Funcționare' },
                { href: '/rapoarte/audit-2020', text: 'Codul de etică și conduită' },
                { href: '/rapoarte/audit-2020', text: 'Principiile și valorile Organizației' },
            ],
        },
        {
            category: 'Documente înființare',
            title: 'Certificat fiscal',
            links: [
                { href: '/rapoarte/audit-2020', text: 'Certificat fiscal TVA' },
                { href: '/rapoarte/audit-2020', text: 'Hotărâre judecătorie' },
                { href: '/rapoarte/audit-2020', text: 'Decizie registrul entităților' },
            ],
        },
        {
            category: 'Regulamente',
            links: [
                { href: '/rapoarte/audit-2020', text: 'Regulament evenimente' },
                { href: '/rapoarte/audit-2020', text: 'Gala Voluntariatului' },
                { href: '/rapoarte/audit-2020', text: 'BikeMarathon Cluj-Napoca' },
                { href: '/rapoarte/audit-2020', text: 'ROI Centrele iVoluntar' },
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

            {/* Secțiunea Transparență */}
            <h1 className="text-3xl font-bold text-center text-black my-8">Transparență</h1>
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {transparenta.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-2xl font-bold mb-4 text-black">{item.category}</h3>
                            {item.title && (
                                <Link href={item.links[0].href}
                                      className="text-black text-lg font-semibold no-underline hover:underline">
                                    {item.title}
                                </Link>
                            )}
                            {item.links && item.links.length > 0 && (
                                <>
                                    <p className="mt-4 text-black">Regulamente:</p>
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
