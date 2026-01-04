// components/FilterSection.tsx
import React from 'react';

interface FilterSectionProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

const filters = ['Toate', 'Finalizat', 'În desfășurare'];

const FilterSection: React.FC<FilterSectionProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <section className="py-8 md:py-12 bg-gray-50 flex justify-center">
            <div className="flex flex-wrap justify-center gap-4 px-4">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`px-6 py-3 rounded-lg font-semibold text-sm md:text-base border-2 transition-all duration-300 ${
                            currentFilter === filter 
                                ? 'bg-custom-blue text-white border-custom-blue shadow-lg scale-105' 
                                : 'bg-white text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light hover:text-custom-blue shadow-sm hover:shadow-md'
                        }`}
                        onClick={() => onFilterChange(filter)}
                    >
                        {filter === 'Toate' ? 'Toate proiectele' : filter}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default FilterSection;
