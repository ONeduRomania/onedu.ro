'use client';

import React from 'react';
import Link from 'next/link';

const InfoRedirect: React.FC = () => {

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = `${process.env.BASE_IMAGE_URL}docs/D230_AsociatiaONedu.pdf`;
        link.download = "Formular_230.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-[#d2e2ff] to-[#e8f0ff]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Vreau să completez și să depun singur Formularul 230
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Depunere în persoană</h3>
                        <p className="text-base text-gray-700 mb-4 leading-relaxed">
                            <strong className="text-gray-900">Formularul poate fi depus în persoană</strong> la sediul ANAF de care aparții cu
                            domiciliul sau trimis prin curier sau prin poștă cu scrisoare recomandată.
                        </p>
                        <Link
                            href="https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/telefoane_judete/Regiuni.htm"
                            className="text-custom-blue font-semibold text-base mb-4 hover:underline inline-block transition-colors duration-200">
                            Vezi aici lista administrațiilor financiare →
                        </Link>
                        <p className="text-base text-gray-700 leading-relaxed">
                            Descarcă formularul pre-completat cu datele Asociației ONedu apăsând pe butonul de mai
                            jos. <strong className="text-gray-900">Nu este nevoie să completezi și suma.</strong>
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Depunere online</h3>
                        <p className="text-base text-gray-700 mb-4 leading-relaxed">
                            <strong className="text-gray-900">Formularul poate fi depus și online</strong> prin <Link
                            href="https://pfinternet.anaf.ro/my.policy"
                            className="text-custom-blue font-semibold hover:underline">SPV (Spațiul Privat
                            Virtual)</Link> în cazul în care ai cont creat pe site-ul ANAF. Completează formularul
                            inteligent cu datele personale și datele Asociației, bifează suma de 3,5%, validează-l și
                            încarcă-l în SPV. Vei avea nevoie de aplicația Adobe Reader.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-sm font-semibold text-gray-900 mb-2">Datele fiscale pentru completare:</p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                <strong>Asociația ONedu</strong><br/>
                                Cod identificare fiscală: <strong>49039313</strong><br/>
                                Cont bancar: <strong>RO49 BTRL RONC RT0C O956 3601</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleDownload}
                        className="bg-custom-blue text-white px-8 py-4 text-base font-bold rounded-lg cursor-pointer transition-all duration-300 hover:bg-custom-blue-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    > 
                        Descarcă formularul 230 pre-completat
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InfoRedirect;
