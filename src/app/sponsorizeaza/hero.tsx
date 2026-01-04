"use client";

import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isPopupOpen) {
                setIsPopupOpen(false);
            }
        };

        if (isPopupOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isPopupOpen]);

    return (
        <section className="w-full flex flex-col items-center justify-center relative min-h-[280px] md:min-h-[320px] lg:min-h-[360px] overflow-hidden" style={{
            background: "linear-gradient(135deg, #d2e2ff 0%, #e8f0ff 50%, #a8c5ff 100%)",
        }}>
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 py-3 md:py-4 lg:py-5">
                {/* Left Column - Title and Subtitle */}
                <div className="flex-1 flex flex-col gap-2">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight text-gray-900 max-w-2xl">
                            Creativitatea are nevoie de structură. Noi o construim digital.
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                            Ajutăm profesorii și școlile să folosească tehnologia ca instrument de organizare, nu de control, astfel încât creativitatea elevilor să rămână vie.
                        </p>
                    </div>
                </div>

                {/* Right Column - Card with Content */}
                <div className="flex-1 w-full lg:max-w-[420px]">
                    <div className="bg-white rounded-lg p-5 md:p-6 shadow-md border border-gray-200">
                        <div className="text-sm md:text-base text-gray-800 leading-relaxed mb-4 text-left">
                            <p className="mb-2">
                                Contribuie la digitalizarea educației și devino partenerul nostru în 2026.
                            </p>
                            <p>
                                Susții instrumente digitale care ajută școala să fie mai vie, mai relevantă și mai conectată la nevoile elevilor.
                            </p>
                        </div>
                        <Link
                            href="/contract"
                            className="inline-block bg-custom-blue text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:bg-custom-blue-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 w-full text-center mb-4 text-sm md:text-base"
                        >
                            Completează contractul
                        </Link>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <Link
                                href={`${process.env.BASE_IMAGE_URL}docs/Asociatia_ONedu_CTR_sponsorizare.docx`}
                                className="text-custom-blue font-semibold hover:underline transition-colors duration-200 text-sm md:text-base"
                            >
                                Model de contract →
                            </Link>
                            <button
                                onClick={togglePopup}
                                className="text-custom-blue font-semibold hover:underline cursor-pointer transition-colors duration-200 text-sm md:text-base"
                            >
                                Informații suplimentare →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`
          popup-overlay
          fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm
          flex justify-center md:items-center items-end
          z-50
          transition-opacity duration-300
          ${isPopupOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
                onClick={closePopupOnOutsideClick}
            >
                <div
                    className={`
            bg-white p-6 md:p-8 rounded-t-xl md:rounded-xl w-full max-w-3xl
            shadow-2xl relative flex flex-col
            transition-transform duration-300 transform
            ${isPopupOpen ? 'translate-y-0' : 'translate-y-full'}
            pointer-events-auto
            max-h-[90vh] overflow-y-auto
          `}
                >
                    <button
                        onClick={togglePopup}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 z-10"
                        aria-label="Închide"
                    >
                        <span className="text-xl leading-none">×</span>
                    </button>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Detalii fiscale</h3>
                    <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                        <div>
                            <p className="font-bold text-gray-900 mb-2">
                                Pentru companiile plătitoare de impozit pe profit
                            </p>
                            <p>
                                Companiile plătitoare de impozit pe profit pot face în continuare sponsorizări cu plata directă,
                                către ONG, în baza contractului de sponsorizare încheiat cu acestea, în limitele legale
                                (20% din impozitul pe profit, dar nu mai mult de 0,75% din CA). Diferența de 80% din
                                impozitul datorat se va vira către bugetul de stat, la termenele prevăzute de codul fiscal.
                                Sponsorizările se pot deduce trimestrial (de exemplu, sponsorizările plătite până la 30 martie
                                pot fi deduse, în limitele precizate mai sus, din impozitul de plată la 25 aprilie) sau anual
                                (sponsorizările efectuate în cursul unui an fiscal vor fi deduse, în limitele legale,
                                din impozitul de plată la 25 martie al anului următor).
                            </p>
                        </div>
                        <div className="border-t border-gray-300 pt-4">
                            <p>
                                <strong className="text-gray-900">Microîntreprinderile plătitoare de impozit pe venit</strong> nu mai beneficiază de facilitatea fiscală 20%, începând cu anul 2024.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
