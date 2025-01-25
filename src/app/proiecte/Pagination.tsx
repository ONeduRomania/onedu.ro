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
        <div className="flex justify-center items-center space-x-4 mt-8">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md border ${
                    currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-custom-blue text-white border-custom-blue hover:bg-custom-blue-dark'
                } transition-colors duration-300`}
            >
                &laquo; Pagina anterioară
            </button>
            <span className="text-lg text-gray-700">
        Pagina {currentPage} din {totalPages}
      </span>
            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md border ${
                    currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-custom-blue text-white border-custom-blue hover:bg-custom-blue-dark'
                } transition-colors duration-300`}
            >
                Următoarea pagină &raquo;
            </button>
        </div>
    );
};

export default Pagination;
