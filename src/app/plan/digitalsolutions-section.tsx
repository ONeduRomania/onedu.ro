"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
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
    currentPage: number;
    setCurrentPage: (page: number) => void;
    openPopup: (solution: Solution, allSolutions: Solution[], solutionId: string) => void;
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

const DigitalSolutionsSection: React.FC<DigitalSolutionsSectionProps> = ({ solutions, currentPage, setCurrentPage, openPopup }) => {
    const [filter, setFilter] = useState('Toate');
    const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
    const projectsPerPage = 30;

    const filteredSolutions = useMemo(() => {
        return solutions.filter((solution) => {
            if (filter === 'Toate') {
                return true;
            }
            return solution.category === filter;
        });
    }, [solutions, filter]);

    // Generează o ordine shuffled consistentă doar când se schimbă filtrul sau când se schimbă lista de soluții
    const previousFilterRef = useRef<string>('');
    const previousSolutionIdsRef = useRef<string>('');
    
    useEffect(() => {
        if (filteredSolutions.length === 0) {
            setShuffledOrder([]);
            previousFilterRef.current = filter;
            previousSolutionIdsRef.current = '';
            return;
        }
        
        const currentSolutionIds = filteredSolutions.map(s => s.id).sort().join(',');
        const filterChanged = previousFilterRef.current !== filter;
        const solutionsChanged = previousSolutionIdsRef.current !== currentSolutionIds;
        
        // Reamestecă doar dacă s-a schimbat filtrul sau lista de soluții
        if (filterChanged || solutionsChanged) {
            const order = filteredSolutions.map((_, index) => index);
            for (let i = order.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [order[i], order[j]] = [order[j], order[i]];
            }
            setShuffledOrder(order);
            previousFilterRef.current = filter;
            previousSolutionIdsRef.current = currentSolutionIds;
            // Resetează pagina la 1 când se schimbă filtrul
            setCurrentPage(1);
        }
    }, [filter, filteredSolutions, setCurrentPage]);

    const shuffledSolutions = useMemo(() => {
        if (shuffledOrder.length === 0 || filteredSolutions.length === 0) return filteredSolutions;
        return shuffledOrder
            .map(index => filteredSolutions[index])
            .filter(solution => solution !== undefined && solution !== null);
    }, [filteredSolutions, shuffledOrder]);

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
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
                    Soluții digitale pentru educație
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Platforme și instrumente digitale care transformă modul în care învățăm și predăm
                </p>

                <div className="hidden lg:flex justify-center mb-8 space-x-3">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            className={`px-5 py-2.5 rounded-lg border-2 font-medium transition-all duration-200 ${
                                filter === category.value
                                    ? 'bg-custom-blue text-white border-custom-blue shadow-md'
                                    : 'bg-white text-custom-blue border-custom-blue hover:bg-custom-blue-light hover:shadow-sm'
                            }`}
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

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto justify-items-center">
                    {currentProjects.filter(solution => solution).map((solution) => (
                        <div
                            key={solution.id}
                            className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl hover:border-custom-blue flex items-center justify-center p-4 group"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Creează o copie a listei pentru a evita problemele cu re-render-ul
                                openPopup(solution, [...shuffledSolutions], solution.id);
                            }}
                            style={{ width: '160px', height: '160px' }}
                        >
                            <Image
                                src={`${process.env.BASE_IMAGE_URL}${solution.image}`}
                                alt={solution.title}
                                width={120}
                                height={120}
                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>

                {shuffledSolutions.length > projectsPerPage && (
                    <div className="flex justify-center items-center mt-10 space-x-4">
                        <button
                            className={`px-5 py-2.5 bg-custom-blue text-white rounded-lg font-medium transition-all duration-200 ${
                                currentPage === 1 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-custom-blue-dark hover:shadow-md hover:-translate-y-0.5'
                            }`}
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            &laquo; Anterior
                        </button>
                        <span className="text-lg font-semibold text-gray-700 px-4">
                            {currentPage} din {totalPages}
                        </span>
                        <button
                            className={`px-5 py-2.5 bg-custom-blue text-white rounded-lg font-medium transition-all duration-200 ${
                                currentPage === totalPages 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-custom-blue-dark hover:shadow-md hover:-translate-y-0.5'
                            }`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Următoarea &raquo;
                        </button>
                    </div>
                )}
            </div>
        </section>
    );

};

export default DigitalSolutionsSection;
