"use client";

import React from "react";

interface TransparencySectionProps {
    buttonLink: string;
    buttonText: string;
}

const TransparencySection: React.FC<TransparencySectionProps> = ({
                                                                     buttonLink,
                                                                     buttonText,
                                                                 }) => {
    return (
        <section className="w-full py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto text-center max-w-4xl px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Credem în transparența faptelor bune
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                    Publicăm anual rapoarte de activitate și financiare pentru a-ți arăta cum folosim
                    investiția ta în educație. Funcționăm în baza Statutului și a regulamentelor
                    interne, disponibile în secțiunea de transparență.
                </p>
                <a
                    href={buttonLink}
                    className="inline-block px-8 py-3 bg-custom-blue text-white font-semibold text-base rounded-lg hover:bg-custom-blue-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    );
};

export default TransparencySection;
