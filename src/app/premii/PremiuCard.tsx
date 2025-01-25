import React from 'react';
import Image from 'next/image';

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
    return (
        <div className="w-80 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <Image
                width={500}
                height={300}
                src={`${process.env.BASE_IMAGE_URL}${premiu.imageSrc}`}
                alt={premiu.imageAlt}
                className="w-full h-auto border-b border-gray-200"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{premiu.title}</h3>
                <p className="text-gray-500 mb-2">{premiu.date}</p>
                <p className="text-gray-600">{premiu.description}</p>
            </div>
        </div>
    );
};

export default PremiuCard;
