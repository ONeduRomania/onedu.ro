'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProject {
    id: string;
    title: string;
    category: string;
    status: string;
    date: string;
    image: string;
}

interface HeroSectionProps {
    heroProject: HeroProject | null;
    handleProjectClick?: (id: string) => void;
}

export function HeroSection({ heroProject }: HeroSectionProps) {
    if (!heroProject) return null;

    return (
        <section className="relative w-full overflow-hidden">
            <Link href={`/proiecte/${heroProject.id}`} className="block group">
                <div className="relative w-full aspect-[21/9] max-h-[360px] overflow-hidden">
                    <Image
                        src={heroProject.image}
                        alt={heroProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                    <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <span className="inline-block bg-custom-blue text-white px-3 py-1.5 rounded-lg text-sm font-semibold mb-3">
                            {heroProject.category}
                        </span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                            {heroProject.title}
                        </h1>
                        <div className="flex flex-wrap gap-3 text-white/90 text-sm">
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{heroProject.status}</span>
                            <span>{heroProject.date}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 mt-4 text-white font-medium group-hover:gap-3 transition-all">
                            Descoperă proiectul
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </Link>
        </section>
    );
}

export default HeroSection;
