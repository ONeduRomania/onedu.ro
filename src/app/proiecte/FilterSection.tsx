'use client';

import React from 'react';

interface FilterSectionProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
    filters: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ currentFilter, onFilterChange, filters }) => {
    return (
        <section className="sticky top-0 z-30 py-4 md:py-5 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Filtrează</span>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <h2 className="text-base font-semibold text-gray-800">Status</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => onFilterChange(filter)}
                                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                                    currentFilter === filter
                                        ? 'bg-custom-blue text-white shadow-md shadow-custom-blue/25 scale-[1.02]'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                                }`}
                            >
                                {filter === 'Toate' ? 'Toate proiectele' : filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSection;
