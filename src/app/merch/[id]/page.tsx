'use client';

import { useEffect, useState } from 'react';
import productsData from '@/data/products.json';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    images: string[];
    description: string;
}

const ProductPage = () => {
    const { id } = useParams(); // Extrage ID-ul din URL
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Obține produsul pe baza ID-ului
        const fetchedProduct = productsData.find((p) => p.id === id) || null;
        setProduct(fetchedProduct);
    }, [id]);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Produsul nu a fost găsit.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-8">
            {/* Caruselul de Imagini */}
            <div className="w-full md:w-1/2">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    className="w-full h-full"
                >
                    {product.images.length > 0 ? (
                        product.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-96">
                                    <Image
                                        src={img}
                                        alt={`Product Image ${index + 1}`}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        className="rounded-lg"
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <div className="relative w-full h-96">
                                <Image
                                    src="/image/produse/default.png"
                                    alt="Imagine default"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* Detaliile Produsului */}
            <div className="w-full md:w-1/2 flex flex-col">
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <div className="inline-block px-3 py-1 border-2 border-blue-500 text-blue-500 rounded mb-4">
                    {product.category}
                </div>
                <p className="text-2xl text-gray-800 mb-4">{product.price} RON</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors mb-4">
                    Adaugă în coș
                </button>
                <p className="text-gray-700">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductPage;
