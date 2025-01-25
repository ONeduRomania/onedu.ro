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
        <Link href={url} target="_blank" rel="noopener noreferrer" className="no-underline">
            <div
                className="border border-black rounded-lg p-2 flex items-center justify-center hover:shadow-lg transition transform hover:-translate-y-1 aspect-square max-w-150">
                <Image  src={`${process.env.BASE_IMAGE_URL}logos/${src}`} alt={alt} fill className="object-contain p-2"/>
            </div>
        </Link>
    );
};

export default PartenerCard;
