import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PartenerCardProps {
    url: string;
    src: string;
    alt: string;
}

const PartenerCard: React.FC<PartenerCardProps> = ({url, src, alt}) => {
    return (
        <Link href={url || '#'} target={url ? "_blank" : undefined} rel={url ? "noopener noreferrer" : undefined} className="no-underline">
            <div
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-center hover:shadow-lg hover:border-custom-blue/30 transition-all duration-300 transform hover:-translate-y-1 aspect-square cursor-pointer">
                <Image  
                    src={`${process.env.BASE_IMAGE_URL}logos/${src}`} 
                    alt={alt} 
                    fill 
                    className="object-contain p-3"
                />
            </div>
        </Link>
    );
};

export default PartenerCard;
