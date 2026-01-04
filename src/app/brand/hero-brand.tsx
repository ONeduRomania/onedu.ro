import React from "react";

interface HeroBrandProps {
    title: string;
    subtitle?: string;
}

export function HeroBrand({ title, subtitle }: HeroBrandProps) {
    return (
        <section
            className="w-full flex flex-col items-center justify-center relative min-h-[150px] md:min-h-[180px] overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #d2e2ff 0%, #a8c5ff 30%, #16366d 100%)",
            }}
        >
            <div className="relative z-10 flex flex-col items-center justify-center max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm md:text-base text-white/90 drop-shadow-sm text-center max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HeroBrand;

