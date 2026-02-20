'use client';

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <nav className="flex justify-center items-center gap-4 py-12 mt-4">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-custom-blue hover:text-custom-blue hover:bg-custom-blue-light'
                }`}
            >
                ← Anterior
            </button>
            <span className="text-sm font-medium text-gray-600">
                Pagina {currentPage} din {totalPages}
            </span>
            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-custom-blue hover:text-custom-blue hover:bg-custom-blue-light'
                }`}
            >
                Următorul →
            </button>
        </nav>
    );
};

export default Pagination;
