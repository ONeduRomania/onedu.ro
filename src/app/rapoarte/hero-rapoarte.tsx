import React from "react";
import { FaFolderOpen } from "react-icons/fa";

interface HeroRapoarteProps {
    title: string;
    subtitle?: string;
}

export function HeroRapoarte({ title, subtitle }: HeroRapoarteProps) {
    return (
        <section
            className="w-full flex flex-col items-center justify-center relative min-h-[150px] md:min-h-[180px] overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #d2e2ff 0%, #a8c5ff 30%, #16366d 100%)",
            }}
        >
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative z-10 flex flex-col items-center justify-center max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
                        <FaFolderOpen className="text-2xl md:text-3xl text-white drop-shadow-lg" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                        {title.replace('📂 ', '')}
                    </h1>
                </div>
                {subtitle && (
                    <p className="text-white/90 text-sm md:text-base mt-2 text-center max-w-2xl drop-shadow-sm">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}

export default HeroRapoarte;

