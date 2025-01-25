// components/FilterSection.tsx
import React from 'react';

interface FilterSectionProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

const filters = ['Toate', 'Finalizat', 'În desfășurare'];

const FilterSection: React.FC<FilterSectionProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <section className="py-8 flex justify-center">
            <div className="flex space-x-4">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`px-4 py-2 rounded-md border ${
                            currentFilter === filter ? 'bg-custom-blue text-white border-custom-blue' : 'bg-white text-gray-700 border-gray-300'
                        } transition-colors duration-300 hover:bg-custom-blue hover:text-white`}
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
