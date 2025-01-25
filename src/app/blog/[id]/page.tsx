'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Navbar, Footer } from '@/components';

type Article = {
    id: string;
    title: string;
    content: string;
    heroImage: string;
    category: string;
    views: number;
    date: string;
};

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                try {
                    const response = await axios.get<Article>(`http://localhost:5001/api/blog/${id}`);
                    setArticle(response.data);
                } catch (error) {
                    console.error('Eroare la încărcarea articolului:', error);
                }
            };

            fetchArticle();
        }
    }, [id]);

    if (!article) {
        return (
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-800">Se încarcă...</h1>
            </div>
        );
    }

    console.log('Article Data:', article); // Verifică datele articolului

    return (
        <>
            <Navbar />
            <section className="py-8 bg-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="relative w-full h-64">
                        <Image
                            src={article.heroImage}
                            alt={article.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="mt-6 space-y-4">
                        <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
                        <div className="text-gray-600">
                            <span>{article.category}</span> •{' '}
                            <span>{new Date(article.date).toLocaleDateString()}</span> •{' '}
                            <span>{article.views} vizualizări</span>
                        </div>
                        <div className="text-gray-700 text-lg">{article.content}</div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ArticlePage;
