'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer, Navbar } from '@/components';
import { getImageBaseUrl } from '@/lib/config';

type Article = {
    id: string | number;
    title: string;
    heroSection?: string;
    content?: string;
    headerImage: string;
    category: string;
    date: string;
    views: number;
};

const BlogPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filter, setFilter] = useState('Toate');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('/api/blog/list');
                setArticles(response.data || []);
            } catch (err) {
                console.error('Eroare la încărcarea articolelor:', err);
                setError('Nu am putut încărca articolele. Te rugăm să încerci din nou mai târziu.');
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const getArticleImage = (article: Article): string => {
        if (!article.headerImage) return 'https://placehold.co/800x450/e2e8f0/64748b?text=ONedu';
        if (article.headerImage.startsWith('http')) return article.headerImage;
        const year = new Date(article.date).getFullYear();
        return `${getImageBaseUrl()}/blog/${year}/${article.headerImage}`;
    };

    const createSlug = (title: string | undefined): string => {
        if (!title) return '';
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const categories = ['Toate', ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean))).sort()];
    const featuredArticle = articles[0];
    const filteredArticles = articles.filter((article, index) => {
        if (index === 0) return false;
        return filter === 'Toate' || article.category === filter;
    });

    return (
        <>
            <Navbar />

            {loading ? (
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-pulse space-y-8">
                            <div className="h-96 bg-gray-200 rounded-xl" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-80 bg-gray-200 rounded-xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : error ? (
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary"
                        >
                            Încearcă din nou
                        </button>
                    </div>
                </section>
            ) : articles.length === 0 ? (
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-gray-600">Nu există articole disponibile momentan.</p>
                    </div>
                </section>
            ) : (
                <>
                    {/* Featured Article */}
                    <section className="py-12 md:py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Link
                                href={`/blog/${createSlug(featuredArticle.title)}`}
                                className="block group"
                            >
                                <article className="flex flex-col lg:flex-row items-stretch gap-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                    <div className="relative w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                                        <Image
                                            src={getArticleImage(featuredArticle)}
                                            alt={featuredArticle.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                            <span className="bg-custom-blue text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                                                {featuredArticle.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                        <span className="text-gray-500 text-sm font-medium mb-2">
                                            {formatDate(featuredArticle.date)}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-custom-blue transition-colors duration-300">
                                            {featuredArticle.title}
                                        </h2>
                                        <p className="text-base md:text-lg text-gray-600 leading-relaxed line-clamp-3 mb-4">
                                            {featuredArticle.heroSection || (() => {
                                            const t = (featuredArticle.content || '').replace(/<[^>]*>/g, '');
                                            return t.length > 200 ? t.slice(0, 200) + '...' : t;
                                        })()}
                                        </p>
                                        <span className="text-custom-blue font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Citește articolul
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    </section>

                    {/* Filter Bar */}
                    <section className="sticky top-0 z-30 py-4 md:py-5 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Filtrează</span>
                                    <span className="hidden sm:inline text-gray-300">|</span>
                                    <h2 className="text-base font-semibold text-gray-800">Categorii</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setFilter(category)}
                                            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                                                filter === category
                                                    ? 'bg-custom-blue text-white shadow-md shadow-custom-blue/25 scale-[1.02]'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Articles Grid */}
                    <section className="py-12 md:py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {filteredArticles.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-lg md:text-xl text-gray-600 font-medium">
                                        Nu există articole în această categorie.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredArticles.map((article, index) => (
                                        <Link
                                            key={article.id}
                                            href={`/blog/${createSlug(article.title)}`}
                                            className="group block"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <article className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-custom-blue/20">
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <Image
                                                        src={getArticleImage(article)}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute top-3 right-3">
                                                        <span className="bg-custom-blue/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm">
                                                            {article.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <span className="text-gray-500 text-sm font-medium">
                                                        {formatDate(article.date)}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 line-clamp-2 group-hover:text-custom-blue transition-colors duration-300">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                        {article.heroSection || (() => {
                                                        const t = (article.content || '').replace(/<[^>]*>/g, '');
                                                        return t.length > 150 ? t.slice(0, 150) + '...' : t;
                                                    })()}
                                                    </p>
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </>
            )}

            <Footer />
        </>
    );
};

export default BlogPage;
