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
        <section className={`py-12 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold mb-8">{sectionTitle}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {processedCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg"
                        >
                            <Image
                                width={500}
                                height={300}
                                src={card.imageSrc}
                                alt={card.imageAlt}
                                className="w-full h-auto"
                            />
                            <div className="p-4 flex flex-col items-center text-center gap-y-4 mb-4">
                                <h3 className="text-xl font-bold">{card.title}</h3>
                                <p className="text-gray-600">{card.description}</p>
                                <Link
                                    href={card.linkHref}
                                    className="text-custom-blue font-semibold hover:text-custom-blue-dark transition-colors"
                                >
                                    {card.linkText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ColumnSection;
