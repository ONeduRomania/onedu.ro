'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer, Navbar } from '@/components';

type Article = {
    id: string;
    title: string;
    heroSection: string;
    headerImage: string;
    category: string;
    date: string;
    views: number;
};

const BlogPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filter, setFilter] = useState('Toate');
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${process.env.BASE_API_URL}api/blog/list`);
                setArticles(response.data);
            } catch (error) {
                console.error('Eroare la încărcarea articolelor:', error);
            }
        };

        fetchArticles();
    }, []);

    const getArticleImage = (article: Article): string => {
        const year = new Date(article.date).getFullYear();
        return `${process.env.BASE_IMAGE_URL}blog/${year}/${article.headerImage}`;
    };


    const createSlug = (title: string | undefined): string => {
        if (!title) return '';
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const filteredArticles = articles.filter((article, index) => {
        if (index === 0) return false;
        return filter === 'Toate' || article.category === filter;
    });

    const handleArticleClick = (title: string, id: string) => {
        const slug = createSlug(title);
        window.location.href = `/blog/${id}-${slug}`;
    };

    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <section className="w-full py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Blog</h1>
                </div>
            </section>

            {/* Featured Article */}
            {articles.length > 0 ? (
                <section className="py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                            onClick={() => handleArticleClick(articles[0].title, articles[0].id)}
                        >
                            <div className="w-full lg:w-1/2 h-64 md:h-80 lg:h-96 relative overflow-hidden">
                                <Image
                                    src={getArticleImage(articles[0])}
                                    alt={articles[0].title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                            <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-4 flex-wrap">
                                    <span className="bg-custom-blue text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                                        {articles[0].category}
                                    </span>
                                    <span className="text-gray-600 text-sm md:text-base font-medium">
                                        {articles[0].views} views
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-custom-blue transition-colors duration-300">
                                    {articles[0].title}
                                </h2>
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                    {articles[0].heroSection}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-gray-500">Nu există articole disponibile.</p>
                    </div>
                </section>
            )}

            {/* Filter Section */}
            <section className="py-8 md:py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Toate', 'COR', 'Jurnal de ONG'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm md:text-base border-2 transition-all duration-300 ${
                                    filter === category
                                        ? 'bg-custom-blue text-white border-custom-blue shadow-lg scale-105'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light hover:text-custom-blue shadow-sm hover:shadow-md'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-12 md:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredArticles.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-lg md:text-xl text-gray-700 font-medium">Nu există articole în această categorie.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredArticles.map((article) => (
                                <div
                                    key={article.id}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
                                    onClick={() => handleArticleClick(article.title, article.id)}
                                >
                                    <div className="relative w-full h-48 md:h-56 overflow-hidden">
                                        <Image
                                            src={getArticleImage(article)}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-5 md:p-6">
                                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                                            <span className="bg-custom-blue text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-md">
                                                {article.category}
                                            </span>
                                            <span className="text-gray-600 text-xs md:text-sm font-medium">
                                                {article.views} views
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-custom-blue transition-colors duration-300 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3">
                                            {article.heroSection}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogPage;
