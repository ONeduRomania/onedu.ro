import React from "react";

interface HeroProps {
    background?: string; // Imaginea de fundal
    title: string; // Titlul principal
    subtitle: string; // Subtitlul
    children?: React.ReactNode; // Conținut suplimentar (ex. formularul)
}

export function Hero({
                         background,
                         title,
                         subtitle,
                         children,
                     }: HeroProps) {
    return (
        <section
            className="w-full flex flex-col items-center justify-center relative"
            style={{
                background: background
                    ? `linear-gradient(
                          to right, 
                          rgba(255, 255, 255, 0.9) 30%, 
                          transparent 70%
                      ), url(${background})`
                    : "#d2e2ff",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
            }}
        >

            <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:hidden"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-screen-xl w-full px-4 py-12 md:py-16">
                <div className="flex-1 text-black max-w-lg flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{subtitle}</p>
                </div>

                <div className="flex-1 max-w-md flex flex-col justify-center">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default Hero;
