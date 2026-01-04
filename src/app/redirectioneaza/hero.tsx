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
    // Convert YouTube URL to embed format
    const getEmbedUrl = (url?: string) => {
        if (!url) return '';
        // Handle different YouTube URL formats
        const videoId = url.includes('youtu.be/') 
            ? url.split('youtu.be/')[1]?.split('?')[0]
            : url.includes('youtube.com/watch?v=')
            ? url.split('v=')[1]?.split('&')[0]
            : url.includes('youtube.com/embed/')
            ? url.split('embed/')[1]?.split('?')[0]
            : null;
        
        if (!videoId) return '';
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1`;
    };

    return (
        <section
            className="w-full flex flex-col items-center justify-center relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #e8f0ff 0%, #d2e2ff 50%, #a8c5ff 100%)",
            }}
        >
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 max-w-screen-xl w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
                {/* Video Column - Left */}
                {youtubeUrl && (
                    <div className="flex-1 w-full lg:max-w-[550px] flex justify-center lg:justify-start">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                className="w-full h-full"
                                src={getEmbedUrl(youtubeUrl)}
                                title="YouTube Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
                
                {/* Text Column - Right */}
                <div className="flex-1 text-black max-w-lg flex flex-col justify-center">
                    <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-gray-900 max-w-md">{title}</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-8">{subtitle}</p>
                    <Link
                        href={buttonLink}
                        className="bg-custom-blue text-white px-10 py-5 text-lg font-bold rounded-lg cursor-pointer transition-all duration-300 hover:bg-custom-blue-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-center w-fit"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;
