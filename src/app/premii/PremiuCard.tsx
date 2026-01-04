"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaAward } from 'react-icons/fa';

interface Premiu {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    date: string;
    description: string;
}

interface PremiuCardProps {
    premiu: Premiu;
}

const PremiuCard: React.FC<PremiuCardProps> = ({ premiu }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-200 hover:border-custom-blue hover:-translate-y-1 group">
                <div className="relative overflow-hidden cursor-pointer" onClick={handleImageClick}>
                    <Image
                        width={500}
                        height={300}
                        src={`${process.env.BASE_IMAGE_URL}${premiu.imageSrc}`}
                        alt={premiu.imageAlt}
                        className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg">
                        <FaAward className="text-custom-blue text-lg" />
                    </div>
                </div>
                <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-custom-blue transition-colors duration-300">
                        {premiu.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">{premiu.date}</p>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{premiu.description}</p>
                </div>
            </div>

            {/* Modal pentru imagine mărită */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-[999999] flex items-center justify-center p-4"
                    onClick={handleOverlayClick}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        onClick={handleCloseModal}
                        aria-label="Închide"
                    >
                        ×
                    </button>
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <Image
                            width={1200}
                            height={800}
                            src={`${process.env.BASE_IMAGE_URL}${premiu.imageSrc}`}
                            alt={premiu.imageAlt}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default PremiuCard;
