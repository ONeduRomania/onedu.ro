import React from "react";
import Link from "next/link";

interface HeroProps {
    background?: string;
    title: string;
    subtitle: string;
    youtubeUrl?: string;
    buttonText: string;
    buttonLink: string;
}

export function Hero({
                         background,
                         title,
                         subtitle,
                         youtubeUrl,
                         buttonText,
                         buttonLink,
                     }: HeroProps) {
    return (
        <section
            className="w-full flex flex-col items-center justify-center relative"
            style={{
                background: background
                    ? `linear-gradient(to right, rgba(255, 255, 255, 0.9) 30%, transparent 70%), url(${background})`
                    : "#d2e2ff",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:hidden"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-6 max-w-screen-xl w-full px-4 py-12 md:py-16">
                <div className="flex-1 text-black max-w-lg flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">{subtitle}</p>
                    <Link
                        href={buttonLink}
                        className="bg-custom-blue text-white px-6 py-3 text-base font-bold rounded-md cursor-pointer transition-colors duration-300 hover:bg-custom-blue-dark text-center w-fit"
                    >
                        {buttonText}
                    </Link>
                </div>
                {youtubeUrl && (
                    <div className="flex-1 max-w-md flex justify-center">
                        <iframe
                            className="w-full h-64 rounded-lg shadow-lg"
                            src={`${youtubeUrl}?rel=0&autoplay=0`}
                            title="YouTube Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Hero;
