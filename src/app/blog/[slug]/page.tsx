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
    headerImage: string;
    category: string;
    views: number;
    date: string;
};

const ArticlePage = () => {
    const { slug } = useParams();
    const slugString = Array.isArray(slug) ? slug[0] : slug;
    const id = slugString ? slugString.split('-')[0] : null;

    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                try {
                    const response = await axios.get<Article>(`${process.env.BASE_API_URL}api/blog/${id}`);
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

    const getArticleImage = (article: Article): string => {
        const year = new Date(article.date).getFullYear();
        return `${process.env.BASE_IMAGE_URL}blog/${year}/${article.headerImage}`;
    };

    // Funcție pentru formatarea datei
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('ro-RO', options);
    };

    return (
        <>
            <Navbar />
            {/* Fundal alb + imagine întinsă pe toată lățimea */}
            <section className="bg-white">
                <div className="relative w-full h-96">
                    <Image
                        src={getArticleImage(article)}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="w-full"
                        priority
                    />
                </div>
                <div className="max-w-4xl mx-auto px-6 py-12 text-black">
                    {/* Titlu mai mare și centrat */}
                    <h1 className="text-5xl font-bold text-center">{article.title}</h1>

                    {/* Mai multă distanță între titlu și data articolului */}
                    <div className="flex justify-between items-center mt-6 text-gray-600">
                        {/* Data formatată + Vizualizări */}
                        <span className="text-lg">
                            {formatDate(article.date)} | {article.views} vizualizări
                        </span>

                        {/* Categorie într-un chenar gri */}
                        <span className="bg-gray-200 px-4 py-1 rounded-md text-gray-700 text-sm font-semibold">
                            {article.category}
                        </span>
                    </div>

                    {/* Mai multă distanță între data articolului și conținut */}
                    <div
                        className="text-black text-lg mt-8"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ArticlePage;
