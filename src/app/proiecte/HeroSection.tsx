import React from "react";

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
    handleProjectClick: (id: string) => void;
}

export function HeroSection({ heroProject, handleProjectClick }: HeroSectionProps) {
    if (!heroProject) return null;

    return (
        <section
            className="relative w-screen h-[30vh] md:h-[50vh] bg-cover bg-center flex items-end justify-center pb-40 md:pb-20 mb-28"
            style={{ backgroundImage: `url(${heroProject.image})` }}
        >
            <div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-3/4 md:bottom-0 md:translate-y-1/2 w-4/5 md:w-3/5 bg-white p-8 shadow-md rounded-lg text-center cursor-pointer"
                onClick={() => handleProjectClick(heroProject.id)}
            >
                <h1 className="text-lg md:text-2xl font-semibold mb-2">{heroProject.title}</h1>
                <div className="flex justify-center gap-2 mt-4 flex-wrap">
                    <span className="hidden md:inline bg-indigo-800 text-white px-4 py-1 rounded-full text-sm">
                        {heroProject.category}
                    </span>
                    <span className="bg-indigo-800 text-white px-4 py-1 rounded-full text-sm">
                        {heroProject.status}
                    </span>
                </div>
                <span className="text-gray-600 text-sm mt-4 block">{heroProject.date}</span>
            </div>
        </section>
    );
}

export default HeroSection;
