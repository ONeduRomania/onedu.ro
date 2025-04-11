'use client';

import React from 'react';
import Image from 'next/image';
import { Navbar, Footer } from '@/components';

const BrandPage = () => {
    return (
        <>
            <Navbar />

            <section className="py-12 text-center bg-[#16366D] text-white">
                <h1 className="text-5xl font-bold mb-4">Brandul ONedu</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Un brand ușor de recunoscut, construit cu grijă, valori clare și o identitate vizuală coerentă. Ghidul de mai jos te ajută să înțelegi și să folosești corect elementele vizuale ONedu.
                </p>
            </section>

            <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
                <section className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-[#16366D] mb-4">Despre brand</h2>
                        <p className="text-gray-700">
                            Brandul ONedu reflectă misiunea, valorile și identitatea Asociației ONedu. Ghidul de identitate vizuală asigură o reprezentare unitară și corectă a brandului în toate materialele și comunicările publice.
                        </p>
                    </div>
                    <Image
                        src="/images/brand/logo-main.png"
                        alt="Sigla ONedu"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-md"
                    />
                </section>

                <section className="bg-gray-50 p-8 rounded-xl shadow-md">
                    <h2 className="text-3xl font-bold text-[#16366D] mb-6">Numele organizației</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                        <ul className="list-disc list-inside space-y-1">
                            <li>Forma completă: <strong>Comunitatea ONedu România</strong></li>
                            <li>În engleză: <strong>The ONedu Romania Community</strong></li>
                            <li>Acronim permis: <strong>COR</strong> (doar în contexte informale)</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Filiale: <em>Asociația ONedu, Filiala [Județ]</em></li>
                            <li>Substructuri: <em>Comunitatea ONedu [Județ]</em> (ex: COGL)</li>
                            <li>Sucursale: <em>Asociația ONedu, sucursala [Nume]</em></li>
                        </ul>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-[#16366D] mb-4">Sigla și elemente vizuale</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Stema și logotipul formează sigla oficială</li>
                            <li>Culoare oficială: <code className="bg-gray-200 px-2 py-0.5 rounded">#16366D</code></li>
                            <li>Font logotip: Nunito, negru pe alb</li>
                            <li>Slogan (ocazional): „Prioritate pentru educație!”</li>
                        </ul>
                    </div>
                    <Image
                        src="/images/brand/sigla-varianta.png"
                        alt="Exemplu siglă ONedu"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-md"
                    />
                </section>

                <section className="bg-white p-8 rounded-xl border shadow-md">
                    <h2 className="text-3xl font-bold text-[#16366D] mb-6">Culori oficiale</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div className="rounded-lg h-24 flex flex-col justify-center items-center text-white font-bold bg-[#16366D]">
                            #16366D
                            <span className="text-sm font-normal">Albastru identitar</span>
                        </div>
                        <div className="rounded-lg h-24 flex flex-col justify-center items-center text-gray-800 font-bold bg-[#F3F4F6]">
                            #F3F4F6
                            <span className="text-sm font-normal">Gri deschis (fundal)</span>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-[#16366D] mb-4">Tipografie</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Documente: Tahoma, Times New Roman</li>
                        <li>Materiale grafice: Nunito, Helvetica</li>
                        <li>Dimensiuni recomandate: 14px titlu, 12px subtitlu, 11px text</li>
                    </ul>
                </section>

                <section className="grid md:grid-cols-2 gap-10 items-center">
                    <Image
                        src="/images/brand/materiale.png"
                        alt="Materiale promoționale ONedu"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-md"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-[#16366D] mb-4">Materiale promoționale</h2>
                        <p className="text-gray-700">
                            Brandul ONedu este prezent pe antete, plicuri, cărți de vizită, legitimații, agende, diplome, rapoarte și prezentări oficiale. Toate aceste elemente trebuie să respecte regulile vizuale ale organizației.
                        </p>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-3xl font-bold text-[#16366D] mb-4">Contact & resurse</h2>
                    <p className="text-gray-700">
                        Pentru întrebări sau acces la fișierele originale, contactează DCRP:
                    </p>
                    <ul className="text-blue-600 underline space-y-1 mt-2">
                        <li><a href="http://identitate.onedu.ro">identitate.onedu.ro</a></li>
                        <li><a href="mailto:contact@onedu.ro">contact@onedu.ro</a></li>
                    </ul>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default BrandPage;