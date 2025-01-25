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
        <section className="w-full py-12 bg-[#f9f9fc]">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Credem în transparența faptelor bune
                </h2>
                <p className="text-base text-gray-700 mb-6">
                    Publicăm anual rapoarte de activitate și financiare pentru a-ți arăta cum folosim
                    investiția ta în educație. Funcționăm în baza Statutului și a regulamentelor
                    interne, disponibile în secțiunea de transparență.
                </p>
                <a
                    href={buttonLink}
                    className="inline-block px-6 py-3 bg-custom-blue text-white font-medium text-sm rounded-lg hover:bg-custom-blue-dark transition-all"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    );
};

export default TransparencySection;
