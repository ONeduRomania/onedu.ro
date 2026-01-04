'use client';

import React from 'react';
import Image from 'next/image';
import {Navbar, Footer} from '@/components';
import HeroBrand from './hero-brand';

const BrandPage = () => {
    return (
        <>
            <Navbar/>
            <HeroBrand 
                title="Brandul ONedu"
                subtitle="Împreună construim pentru România, sub un singur brand - ON for Education."
            />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 md:space-y-16">
                {/* Prima secțiune */}
                <section className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Un singur brand: zeci de soluții digitale</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Din 2019, Asociația ONedu și-a dezvoltat un brand puternic în comunitate, prin care exprimă
                            puterea a doi tineri de a schimba România. Acest brand este un simbol al educației digitale,
                            al transparenței și al colaborării. Este un brand care inspiră și care aduce împreună oameni
                            din toate colțurile țării pentru a construi soluții digitale pentru educație.
                            Fie că ești voluntar, partener sau susținător, ne bucurăm să te avem alături. Pentru a ne
                            asigura integritatea unui brand construit în ani, te rugăm să respecți regulile de utilizare
                            ale brandurilor.
                        </p>
                    </div>
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={`${process.env.BASE_IMAGE_URL}team-group/BKM_voluntari2024.jpg`}
                            alt="Echipa Asociației ONedu"
                            width={500}
                            height={300}
                            className="rounded-xl w-full h-auto"
                        />
                    </div>
                </section>

                {/* Secțiune Badge */}
                <section className="bg-gray-50 p-8 md:p-10 rounded-xl text-center space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Badge de susținător #ONedu</h2>
                    <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        Susții Asociația ONedu? Poți folosi badgeul nostru de susținător în postările tale pentru a
                        încuraja și prietenii tăi să susțină educația din România. Descarcă badge-ul de mai jos.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        <a href="/downloads/brand-image1.png" download className="group">
                            <Image
                                src="/images/brand/thumb1.png"
                                alt="Material ONedu 1"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            />
                        </a>
                        <a href="/downloads/brand-image2.png" download className="group">
                            <Image
                                src="/images/brand/thumb2.png"
                                alt="Material ONedu 2"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            />
                        </a>
                        <a href="/downloads/brand-image3.png" download className="group">
                            <Image
                                src="/images/brand/thumb3.png"
                                alt="Material ONedu 3"
                                width={250}
                                height={150}
                                className="rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            />
                        </a>
                    </div>
                    <p className="text-sm text-gray-600 mt-6">
                        Ai o idee de colaborare sau vrei să organizezi o strângere de fonduri? Scrie-ne la{' '}
                        <a
                            className="underline text-custom-blue hover:text-custom-blue-dark transition-colors"
                            href="mailto:contact@onedu.ro"
                        >
                            contact@onedu.ro
                        </a>
                    </p>
                </section>

                {/* Secțiune Reguli */}
                <section className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-custom-blue">Reguli pentru parteneri</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-3 text-sm md:text-base">
                            <li>Folosirea logo-ului și a numelui nostru este permisă în cadrul parteneriatelor,
                                cu aprobarea prealabilă a echipei de comunicare a Asociației ONedu. Nu folosi logo-ul ONedu în scopuri comerciale fără acordul scris al nostru.
                            </li>
                            <li>Evităm să folosim termeni precum sponsori sau parteneri în comunicările din social media, astfel
                                că te rugăm să nu folosești aceste denumiri în postările tale pentru a comunica susținerea Asociației ONedu.
                            </li>
                            <li>Numele și logo-ul nostru nu poate apărea pe site-uri pentru tutun, materiale politice sau arme de foc. Nu ne asociem cu niciun produs sau serviciu obscen,
                            pornografic, violent, intolerant, denigrator și descriminator în orice fel.</li>
                            <li>
                                Pentru strângerile de fonduri organizate în beneficiul Asociației ONedu, te rugăm să ne scrii pe email pentru a stabili detaliile necesare. Numele asociației și ale proiectelor noastre
                                nu vor apărea pe produse, pe creații artistice audio sau vizuale. Vor apărea exclusiv ca destinatar al donației, iar numele/logo-ul nostru nu vor fi mai vizibile decât numele organizatorului.
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-custom-blue">Reguli pentru susținători și voluntari</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-3 text-sm md:text-base">
                            <li>Persoanele care strâng fonduri prin crearea unei campanii pe Platforma ONedu, pot folosi numele organizației,
                                fără a sugera asocierea Asociației cu campania respectivă.</li>
                            <li>Logo-ul asociației poate fi folosit doar de persoanele care strâng fonduri prin crearea unei campanii pe Platforma ONedu,
                                cu mențiunea În beneficiul Asociației ONedu.</li>
                            <li>Te încurajăm să folosești hashtagurile #ONedu și badgeul de susținător al asociației în postările tale pentru a ne ajuta să ne promovăm împreună.</li>
                            <li>Apreciem strângerile de fonduri organizate pentru Asociația ONedu, însă, pentru a putea face proiecte cu impact, nu putem susține și finanța oficial evenimente
                            sau campanii în beneficiul nostru. Planificarea evenimentelor, costurile și promovarea sunt responsabilitatea persoanei organizator. Nu poate fi folosit numele nostru pentru
                            obținerea de sprijin financiar.</li>
                        </ul>
                    </div>
                </section>

                {/* Secțiune Universul ONedu */}
                <section className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Universul #ONedu</h2>
                        <p className="text-gray-700 text-base md:text-lg">Branduri și soluții digitale sub egida Asociației ONedu</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {[
                            {id: 'logo', label: 'Logo ONedu'},
                            {id: 'ivoluntar', label: 'iVoluntar'},
                            {id: 'fiide10', label: 'Fii de 10 HUB'},
                            {id: 'Gala-Voluntariatului', label: 'Gala Voluntariatului'},
                            {id: 'HowTo', label: 'How to: România'},
                            {id: 'Larisa', label: 'Larisa'},
                            {id: 'Andrei', label: 'Andrei'},
                            {id: 'Asistent', label: 'Asistent de 10!'},
                            {id: 'Catalog', label: 'Catalog de 10!'},
                            {id: 'Teme', label: 'Teme de 10!'},
                            {id: 'Teste', label: 'Teste de 10!'},
                            {id: 'Concursuri', label: 'Concursuri de 10!'},
                            {id: 'Cosmin', label: 'Cosmin'},
                            {id: 'Eva', label: 'Eva'},
                            {id: 'AmExamen', label: 'AmExamen'},
                            {id: 'InfoStart', label: 'InfoStart'},
                            {id: 'LearnHub', label: 'LearnHub'},
                            {id: 'Mara', label: 'Mara'},
                            {id: 'Stefan', label: 'Ștefan'},
                            {id: 'StudFund', label: 'StudFund'},
                            {id: 'adolescentin', label: 'adolescentin.ro'},
                            {id: 'voluntarwiki', label: 'VoluntarWiki'},
                            {id: 'raluca', label: 'Raluca'},
                        ].map(({id, label}) => (
                            <div
                                key={id}
                                className="aspect-[4/3] bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center p-4 hover:shadow-lg hover:border-custom-blue/30 transition-all duration-300"
                            >
                                <Image
                                    src={`${process.env.BASE_IMAGE_URL}solutions/${id}.png`}
                                    alt={label}
                                    width={160}
                                    height={120}
                                    className="object-contain max-h-full"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer/>
        </>
    );
};

export default BrandPage;