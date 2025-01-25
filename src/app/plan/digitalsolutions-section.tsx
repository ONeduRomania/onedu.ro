"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface Solution {
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
    id: string;
    status: string;
}

interface DigitalSolutionsSectionProps {
    solutions: Solution[];
    openPopup: (solution: Solution) => void;
}

const categories = [
    { name: 'Toate soluțiile', value: 'Toate' },
    { name: 'Abilități și aptitudini', value: 'Abilități și aptitudini' },
    { name: 'Management școlar', value: 'Management școlar' },
    { name: 'Educație în online', value: 'Educație în online' },
];

// Funcția de amestecare a array-ului
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const DigitalSolutionsSection: React.FC<DigitalSolutionsSectionProps> = ({ solutions, openPopup }) => {
    const [filter, setFilter] = useState('Toate');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 12;

    const filteredSolutions = useMemo(() => {
        return solutions.filter((solution) => {
            if (filter === 'Toate') {
                return true;
            }
            return solution.category === filter;
        });
    }, [solutions, filter]);

    const shuffledSolutions = useMemo(() => {
        return shuffleArray(filteredSolutions);
    }, [filteredSolutions]);

    const indexOfLastSolution = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastSolution - projectsPerPage;
    const currentProjects = shuffledSolutions.slice(indexOfFirstProject, indexOfLastSolution);

    const totalPages = Math.ceil(shuffledSolutions.length / projectsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <section className="py-12 bg-custom-blue-light">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">
                Soluții digitale pentru educație
            </h2>

            <div className="hidden lg:flex justify-center mb-6 space-x-2">
                {categories.map((category) => (
                    <button
                        key={category.value}
                        className={`px-4 py-2 rounded-md border ${
                            filter === category.value
                                ? 'bg-custom-blue text-white border-custom-blue'
                                : 'bg-white text-custom-blue border-custom-blue hover:bg-custom-blue-light'
                        } transition duration-300`}
                        onClick={() => {
                            setFilter(category.value);
                            setCurrentPage(1);
                        }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="flex justify-center mb-6 lg:hidden">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-custom-blue font-medium border border-custom-blue rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue">
                            {categories.find((cat) => cat.value === filter)?.name}
                            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Menu.Items className="absolute mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
                        <div className="py-1">
                            {categories.map((category) => (
                                <Menu.Item key={category.value}>
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active ? 'bg-custom-blue-light text-custom-blue' : 'text-gray-700'
                                            } group flex items-center w-full px-4 py-2 text-sm`}
                                            onClick={() => {
                                                setFilter(category.value);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            {category.name}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Menu>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto justify-items-center">
                    {currentProjects.map((solution) => (
                        <div
                            key={solution.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:translate-y-[-5px] hover:shadow-lg flex items-center justify-center p-4"
                            onClick={() => openPopup(solution)}
                            style={{ width: '160px', height: '160px' }}
                        >
                            <Image
                                src={`${process.env.BASE_IMAGE_URL}${solution.image}`}
                                alt={solution.title}
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {shuffledSolutions.length > projectsPerPage && (
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        className={`px-4 py-2 bg-custom-blue text-white rounded-md ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-blue-dark'
                        }`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        &laquo; Anterior
                    </button>
                    <span className="text-lg text-custom-blue">
                        {currentPage} din {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 bg-custom-blue text-white rounded-md ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-custom-blue-dark'
                        }`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Următoarea &raquo;
                    </button>
                </div>
            )}
        </section>
    );

};

export default DigitalSolutionsSection;
