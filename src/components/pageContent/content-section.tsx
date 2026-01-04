"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import './carousel.scss';

interface ContentSectionProps {
    images: string[];
    altTexts: string[];
    title: string;
    text: string;
    layout?: "left" | "right";
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: string;
}

export function ContentSection({
                                   images,
                                   altTexts,
                                   title,
                                   text,
                                   layout = "left",
                                   buttonText,
                                   buttonLink,
                                   backgroundColor = "bg-[#fdfdff]",
                               }: ContentSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setActiveIndex(selectedIndex);
    };

    return (
        <section className={`w-full py-16 md:py-20 lg:py-24 ${backgroundColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div
                    className={`
                        flex flex-col
                        ${layout === "left" ? "md:flex-row" : "md:flex-row-reverse"}
                        items-center
                        justify-center
                        gap-12
                    `}
                >
                    {/* Carousel Column */}
                    <div className="w-full md:w-1/2 max-w-[500px] relative max-h-[400px] ">
                        <Carousel
                            activeIndex={activeIndex}
                            onSelect={handleSelect}
                            interval={null}
                            indicators={false}
                            controls={false}
                        >
                            {images.map((image, index) => (
                                <Carousel.Item key={index}>

                                    <div className="max-w-[500px] relative max-h-[400px] w-full h-full min-h-[200px] md:min-h-[350px] overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={altTexts[index]}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        {activeIndex < images.length - 1 && (
                            <button
                                className="carousel-control-next"
                                onClick={() => setActiveIndex(activeIndex + 1)}
                                aria-label="Next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                            </button>
                        )}
                        {activeIndex > 0 && (
                            <button
                                className="carousel-control-prev"
                                onClick={() => setActiveIndex(activeIndex - 1)}
                                aria-label="Previous"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                            </button>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 max-w-[600px] flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">{title}</h2>
                        <div
                            className="text-base md:text-lg leading-7 text-gray-700"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                        {buttonText && buttonLink && (
                            <a
                                href={buttonLink}
                                className="mt-6 px-6 py-3 bg-custom-blue text-white font-semibold text-base rounded-lg transition-all duration-300 hover:bg-custom-blue-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 block mx-auto md:mx-0 text-center w-max"
                            >
                                {buttonText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContentSection;
