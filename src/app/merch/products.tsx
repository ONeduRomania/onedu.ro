"use client";

import React, { useState } from "react";
import Image from "next/image";
import productsData from "@/data/products.json";

type Product = {
    id: string;
    title: string;
    category: string;
    price: number;
    images: string[];
};

const ProductsSection = () => {
    const products: Product[] = productsData;

    const [filter, setFilter] = useState("Toate");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    const filteredProducts = products.filter((product: Product) =>
        filter === "Toate" ? true : product.category === filter
    );

    // Paginare
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    const handleProductClick = (id: string) => {
        window.location.href = `/merch/${id}`;
    };

    return (
        <>

            {/* Filtrare */}
            <section className="py-8 flex justify-center">
                <div className="flex gap-4">
                    {["Toate", "Îmbrăcăminte", "Birotică", "Accesorii"].map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded border ${
                                filter === category
                                    ? "bg-custom-blue text-white border-custom-blue"
                                    : "bg-white text-gray-700 border-gray-300"
                            }`}
                            onClick={() => {
                                setFilter(category);
                                setCurrentPage(1);
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Produse */}
            <section className="py-8">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product: Product) => (
                        <div
                            key={product.id}
                            className="block bg-white rounded shadow hover:shadow-lg transition p-4 cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <Image
                                width={500}
                                height={300}
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="text-lg font-bold mt-2">{product.title}</h3>
                            <div className="text-gray-500 mt-1">{product.price} RON</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Navigare pagini */}
            {filteredProducts.length > productsPerPage && (
                <div className="flex justify-center items-center gap-4 py-4">
                    <button
                        className="px-4 py-2 bg-custom-blue-light text-white rounded disabled:bg-gray-300"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        &laquo; Pagina anterioară
                    </button>
                    <span>
            Pagina {currentPage} din {totalPages}
          </span>
                    <button
                        className="px-4 py-2 bg-custom-blue-light text-white rounded disabled:bg-gray-300"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Următoarea pagină &raquo;
                    </button>
                </div>
            )}
        </>
    );
};

export default ProductsSection;
