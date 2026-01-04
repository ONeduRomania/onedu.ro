import React from "react";

interface HeroDespreProps {
    background?: string;
    title: string;
    subtitle?: string;
}

export function HeroDespre({ background, title, subtitle }: HeroDespreProps) {
    return (
        <section
            className="w-full flex flex-col items-center justify-center relative min-h-[250px] md:min-h-[280px] lg:min-h-[300px] overflow-hidden"
            style={{
                background: background
                    ? `url(${background})`
                    : "linear-gradient(135deg, #d2e2ff 0%, #e8f0ff 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay gradient for background image */}
            {background && (
                <div 
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(
                            to right, 
                            rgba(255, 255, 255, 0.85) 0%, 
                            rgba(255, 255, 255, 0.80) 25%,
                            rgba(255, 255, 255, 0.65) 45%,
                            rgba(255, 255, 255, 0.45) 65%,
                            rgba(255, 255, 255, 0.25) 80%,
                            rgba(255, 255, 255, 0.10) 90%,
                            transparent 100%
                        )`
                    }}
                ></div>
            )}
            
            {/* Overlay gradient for mobile */}
            <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white/70 md:hidden"></div>
            
            {/* Subtle decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-custom-blue/4 via-transparent to-transparent"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
                <div className="flex-1 text-black max-w-2xl flex flex-col justify-center space-y-3 animate-fade-in-up">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-snug text-gray-900 tracking-tight drop-shadow-sm">
                        {title.includes('Punem bazele') ? (
                            <>
                                Punem bazele unei educații care<br className="hidden sm:block" />
                                <span className="sm:ml-0"> ține pasul cu viitorul.</span>
                            </>
                        ) : (
                            title
                        )}
                    </h1>
                    {subtitle && (
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed font-normal max-w-xl drop-shadow-sm">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HeroDespre;

