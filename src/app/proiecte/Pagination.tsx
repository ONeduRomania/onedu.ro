// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 mb-8 px-4">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-lg font-semibold text-sm md:text-base border-2 transition-all duration-300 ${
                    currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                        : 'bg-custom-blue text-white border-custom-blue hover:bg-custom-blue-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                }`}
            >
                &laquo; Pagina anterioară
            </button>
            <span className="text-base md:text-lg text-gray-700 font-semibold">
                Pagina {currentPage} din {totalPages}
            </span>
            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`px-6 py-3 rounded-lg font-semibold text-sm md:text-base border-2 transition-all duration-300 ${
                    currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                        : 'bg-custom-blue text-white border-custom-blue hover:bg-custom-blue-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                }`}
            >
                Următoarea pagină &raquo;
            </button>
        </div>
    );
};

export default Pagination;
