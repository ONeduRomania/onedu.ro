'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Footer } from '@/components';
import { getImageBaseUrl } from '@/lib/config';

type Article = {
    id: string;
    title: string;
    content: string;
    headerImage: string;
    category: string;
    views: number;
    date: string;
};

const ArticlePage = () => {
    const { slug } = useParams();
    const slugString = Array.isArray(slug) ? slug[0] : slug;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (slugString) {
            setLoading(true);
            setError(false);
            const fetchArticle = async () => {
                try {
                    const response = await axios.get<Article>(`/api/blog/slug/${slugString}`);
                    setArticle(response.data);
                } catch (err) {
                    console.error('Eroare la încărcarea articolului:', err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchArticle();
        }
    }, [slugString]);

    const getArticleImage = (article: Article): string => {
        if (!article.headerImage) return 'https://placehold.co/800x450/e2e8f0/64748b?text=ONedu';
        if (article.headerImage.startsWith('http')) return article.headerImage;
        const year = new Date(article.date).getFullYear();
        return `${getImageBaseUrl()}/blog/${year}/${article.headerImage}`;
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <article className="min-h-screen bg-gray-50">
                    <div className="animate-pulse">
                        <div className="relative w-full aspect-[3/1] max-h-[240px] bg-gray-200" />
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10 pb-16">
                            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-14">
                                <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
                                <div className="h-10 bg-gray-200 rounded-lg mb-4 w-4/5" />
                                <div className="h-10 bg-gray-200 rounded-lg mb-8 w-3/5" />
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="h-4 bg-gray-100 rounded" style={{ width: `${90 - i * 5}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <Footer />
            </>
        );
    }

    if (error || !article) {
        return (
            <>
                <Navbar />
                <section className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                    <p className="text-gray-600 mb-6">Articolul nu a putut fi încărcat.</p>
                    <Link href="/blog" className="text-custom-blue font-semibold hover:underline">
                        ← Înapoi la Blog
                    </Link>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <article className="min-h-screen bg-gray-50">
                {/* Hero image */}
                <div className="relative w-full aspect-[3/1] max-h-[240px] overflow-hidden">
                    <Image
                        src={getArticleImage(article)}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6">
                        <span className="inline-block bg-custom-blue text-white px-3 py-1 rounded-lg text-sm font-semibold mb-3">
                            {article.category}
                        </span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            {article.title}
                        </h1>
                    </div>
                </div>

                {/* Content card */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10 pb-16">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-14">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-custom-blue mb-8 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Înapoi la Blog
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10 pb-6 border-b border-gray-100">
                            <time dateTime={article.date}>{formatDate(article.date)}</time>
                            <span>•</span>
                            <span>{article.views} vizualizări</span>
                        </div>

                        <div
                            className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-custom-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:my-8 prose-ul:my-6 prose-li:my-1"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
};

export default ArticlePage;
