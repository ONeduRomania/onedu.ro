'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer, Navbar } from '@/components';

type Article = {
    id: string;
    title: string;
    heroSection: string;
    heroImage: string;
    category: string;
    views: number;
};

const BlogPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filter, setFilter] = useState('Toate');
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/blog/list');
                setArticles(response.data);
            } catch (error) {
                console.error('Eroare la încărcarea articolelor:', error);
            }
        };

        fetchArticles();
    }, []);

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
        window.location.href = `/blog/${id}`;
    };

    return (
        <>
            <Navbar />
            <section className="py-8 text-center bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800">Blog</h1>
            </section>
            {articles.length > 0 ? (
                <section
                    className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => handleArticleClick(articles[0].title, articles[0].id)}
                >
                    <div className="flex-1 overflow-hidden rounded-lg">
                        <img
                            src={articles[0].heroImage || '/placeholder-image.jpg'}
                            alt={articles[0].title}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="bg-blue-700 text-white px-4 py-1 rounded-full font-bold">
                                {articles[0].category}
                            </span>
                            <span className="text-gray-600">{articles[0].views} views</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">{articles[0].title}</h2>
                        <p className="text-gray-600">{articles[0].heroSection}</p>
                    </div>
                </section>
            ) : (
                <p className="text-center text-gray-500 py-8">Nu există articole disponibile.</p>
            )}

            <section className="py-4 text-center bg-gray-100">
                <div className="flex justify-center space-x-4">
                    {['Toate', 'COR', 'Jurnal de ONG'].map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                                filter === category
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-white text-gray-800 border'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            <section className="py-8 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
                            onClick={() => handleArticleClick(article.title, article.id)}
                        >
                            <img
                                src={article.heroImage || '/placeholder-image.jpg'}
                                alt={article.title}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center space-x-4">
                                    <span className="bg-blue-700 text-white px-4 py-1 rounded-full font-bold">
                                        {article.category}
                                    </span>
                                    <span className="text-gray-600">{article.views} views</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
                                <p className="text-gray-600">{article.heroSection}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogPage;
