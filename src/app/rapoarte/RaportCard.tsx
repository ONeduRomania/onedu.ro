// src/app/rapoarte/RaportCard.tsx
import React from 'react';
import Link from 'next/link';

interface RaportCardProps {
    year: string;
    title: string;
    links: { href: string; text: string }[];
}

const RaportCard: React.FC<RaportCardProps> = ({ year, title, links }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-2 text-black">{year}</h3>
            <Link href={links[0].href} className="text-black text-lg font-semibold no-underline hover:underline">
                {title}
            </Link>
            {links.length > 1 && (
                <ul className="list-disc list-inside mt-3">
                    {links.slice(1).map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} className="text-black hover:underline">
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
