"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const closePopupOnOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).classList.contains("popup-overlay")) {
            setIsPopupOpen(false);
        }
    };

    return (
        <section className="py-8 sm:py-16 px-4 sm:px-8 bg-[#d0e3ff]">
            <div className="max-w-6xl mx-auto text-left">
                <h1 className="text-2xl sm:text-4xl font-bold text-black mb-4">
                    Modernizăm educația împreună.
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-8">
                    Construim un hub de servicii digitale în educație pentru elevi, profesori, școli și părinți.
                    <br/>Ajută-ne să parcurgem harta spre o Românie digitală și modernă.
                </p>

                <div className="flex flex-col md:flex-row justify-between gap-8">
                    {/* Card 1 */}
                    <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 text-left p-4 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-custom-blue mb-4">
                            Anul 2025
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Completează contractul și investește în educația din România în doar 5 minute.
                            Vei primi toate detaliile despre investiția ta după completarea contractului.
                        </p>
                        <Link
                            href="/contract"
                            className="inline-block bg-custom-blue text-white px-5 py-2 rounded-md font-bold transition-colors duration-300 hover:bg-custom-blue-dark"
                        >
                            Completează contractul
                        </Link>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                            <Link
                                href={`${process.env.BASE_IMAGE_URL}docs/Asociatia_ONedu_CTR_sponsorizare.docx`}
                                className="text-custom-blue underline"
                            >
                                Model de contract
                            </Link>
                            <button
                                onClick={togglePopup}
                                className="text-custom-blue underline cursor-pointer"
                            >
                                Informații suplimentare
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`
          popup-overlay
          fixed inset-0 bg-black bg-opacity-50
          flex justify-center md:items-center items-end
          z-50
          transition-opacity duration-300
          ${isPopupOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
                onClick={closePopupOnOutsideClick}
            >
                <div
                    className={`
            bg-white p-8 rounded-t-xl md:rounded-xl w-full max-w-2xl
            shadow-lg relative flex flex-col
            transition-transform duration-300 transform
            ${isPopupOpen ? 'translate-y-0' : 'translate-y-full'}
            pointer-events-auto
          `}
                >
                    <button
                        onClick={togglePopup}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        &#x2715;
                    </button>
                    <h3 className="text-2xl font-bold mb-4">Detalii fiscale</h3>
                    <p className="text-gray-700 mb-4">
                        <strong>Pentru companiile plătitoare de impozit pe profit</strong>
                    </p>
                    <p className="text-gray-700 mb-6">
                        Companiile plătitoare de impozit pe profit pot face în continuare sponsorizări cu plata directă,
                        către ONG, în baza contractului de sponsorizare încheiat cu acestea, în limitele legale
                        (20% din impozitul pe profit, dar nu mai mult de 0,75% din CA). Diferența de 80% din
                        impozitul datorat se va vira către bugetul de stat, la termenele prevăzute de codul fiscal.
                        Sponsorizările se pot deduce trimestrial (de exemplu, sponsorizările plătite până la 30 martie
                        pot fi deduse, în limitele precizate mai sus, din impozitul de plată la 25 aprilie) sau anual
                        (sponsorizările efectuate în cursul unui an fiscal vor fi deduse, în limitele legale,
                        din impozitul de plată la 25 martie al anului următor).
                    </p>
                    <p className="text-gray-700">
                        <strong>Microîntreprinderile plătitoare de impozit pe venit </strong>
                         nu mai beneficiază de facilitatea fiscală 20%, începând cu anul 2024.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
