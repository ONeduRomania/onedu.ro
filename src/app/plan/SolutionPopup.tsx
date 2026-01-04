import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Solution {
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
    id: string;
    status: string;
}

interface SolutionPopupProps {
    solution: Solution;
    closePopup: () => void;
    onNavigate: (direction: 'prev' | 'next') => void;
    hasPrevious: boolean;
    hasNext: boolean;
}

const SolutionPopup: React.FC<SolutionPopupProps> = ({
                                                         solution,
                                                         closePopup,
                                                         onNavigate,
                                                         hasPrevious,
                                                         hasNext
                                                     }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [closePopup]);

    const statusColor =
        solution.status === 'Soluție live'
            ? 'bg-green-500'
            : solution.status === 'Soluție în lucru'
                ? 'bg-yellow-500'
                : 'bg-custom-blue';

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999999] p-4"
            onClick={closePopup}
        >
            {/* Navigation buttons */}
            <button
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-xl transition-all duration-200 ${
                    !hasPrevious ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    if (hasPrevious) onNavigate('prev');
                }}
                disabled={!hasPrevious}
            >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
            </button>

            <div
                className="bg-white rounded-xl p-6 md:p-8 w-11/12 max-w-3xl relative flex flex-col md:flex-row shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 z-10"
                    onClick={closePopup}
                    aria-label="Închide"
                >
                    ×
                </button>

                {/* Left Column with Image */}
                <div className="md:w-1/3 flex justify-center items-center mb-6 md:mb-0 md:pr-6">
                    <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                        <Image
                            width={180}
                            height={180}
                            src={`${process.env.BASE_IMAGE_URL}${solution.image}`}
                            alt={solution.title}
                            className="rounded-lg object-contain"
                        />
                    </div>
                </div>

                {/* Right Column with Text and Buttons */}
                <div className="md:w-2/3 flex flex-col">
                    <div className="flex items-center mb-3">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColor} shadow-sm`}></span>
                        <span className="font-semibold text-sm text-gray-700">{solution.status}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{solution.title}</h2>
                    <p className="text-gray-600 flex-grow leading-relaxed mb-6">{solution.description}</p>
                    <div className="mt-auto flex flex-wrap gap-3">
                        {solution.link ? (
                            <Link
                                href={solution.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 bg-custom-blue text-white rounded-lg font-semibold hover:bg-custom-blue-dark transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Vezi soluția &rarr;
                            </Link>
                        ) : (
                            <Link
                                href="/contact"
                                className="px-5 py-2.5 bg-custom-blue text-white rounded-lg font-semibold hover:bg-custom-blue-dark transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Hai să o facem realitate
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <button
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-xl transition-all duration-200 ${
                    !hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    if (hasNext) onNavigate('next');
                }}
                disabled={!hasNext}
            >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
            </button>
        </div>
    );
};

export default SolutionPopup;