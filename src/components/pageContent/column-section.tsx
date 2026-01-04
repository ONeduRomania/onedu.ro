"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Card {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
}

interface ColumnSectionProps {
    sectionTitle: string;
    cards: Card[];
    backgroundColor?: string;
}

export const ColumnSection: React.FC<ColumnSectionProps> = ({
                                                                sectionTitle,
                                                                cards,
                                                                backgroundColor = "bg-blue-100",
                                                            }) => {
    const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL || "/";

    const processedCards = cards.map((card) => ({
        ...card,
        imageSrc: `${BASE_IMAGE_URL}${card.imageSrc}`,
    }));

    return (
        <section className={`py-16 md:py-20 lg:py-24 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-gray-900">{sectionTitle}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {processedCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-gray-200"
                        >
                            <div className="relative w-full h-64 overflow-hidden">
                                <Image
                                    width={500}
                                    height={300}
                                    src={card.imageSrc}
                                    alt={card.imageAlt}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col items-center text-center gap-y-4">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{card.title}</h3>
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{card.description}</p>
                                {card.linkText && card.linkHref && (
                                    <Link
                                        href={card.linkHref}
                                        className="text-custom-blue font-semibold hover:text-custom-blue-dark transition-colors duration-200 hover:underline"
                                    >
                                        {card.linkText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ColumnSection;
