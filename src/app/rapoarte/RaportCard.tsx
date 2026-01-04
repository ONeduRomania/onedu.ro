// src/app/rapoarte/RaportCard.tsx
import React from 'react';
import Link from 'next/link';
import { FaFilePdf, FaCalendarAlt } from 'react-icons/fa';

interface RaportCardProps {
    year: string;
    title: string;
    links: { href: string; text: string }[];
}

const RaportCard: React.FC<RaportCardProps> = ({ year, title, links }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-custom-blue/30">
            <div className="flex items-center gap-2 mb-3">
                <FaCalendarAlt className="text-custom-blue text-lg" />
                <h3 className="text-xl font-bold text-gray-900">{year}</h3>
            </div>
            <Link 
                href={links[0].href} 
                className="text-gray-900 text-lg font-semibold no-underline hover:text-custom-blue transition-colors duration-200 mb-4 block"
            >
                {title}
            </Link>
            {links.length > 1 && (
                <ul className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                    {links.slice(1).map((link, index) => (
                        <li key={index}>
                            <Link 
                                href={link.href} 
                                className="text-gray-700 hover:text-custom-blue transition-colors duration-200 text-sm"
                            >
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RaportCard;
