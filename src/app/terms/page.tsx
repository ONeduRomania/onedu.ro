// TermsPage (server)
import React from 'react';
import { Footer, Navbar } from '@/components';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// Eliminăm remark + remark-html aici, pentru că parsează la HTML
// import { remark } from 'remark';
// import remarkGfm from 'remark-gfm';
// import remarkBreaks from 'remark-breaks';
// import html from 'remark-html';
import TermsContent from './TermsContent';

interface Section {
    id: string;
    title: string;
    content: string;
}

const getSections = async (): Promise<Section[]> => {
    const sectionsDirectory = path.join(process.cwd(), 'src', 'app', 'terms', 'sections');
    const filenames = fs.readdirSync(sectionsDirectory).filter((file) => file.endsWith('.md'));

    return filenames.map((filename) => {
        const filePath = path.join(sectionsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const { data, content } = matter(fileContents);

        const id = path.parse(filename).name.toLowerCase();

        const fallbackTitle = path.parse(filename).name.replace(/\.md$/, '');
        const title = data.title || fallbackTitle.replace(/-/g, ' ');

        // Aici stocăm conținutul brut (markdown), fără parse
        return {
            id,
            title,
            content // conținutul brut .md
        };
    });
};

const TermsPage = async () => {
    const sections = await getSections();

    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <Navbar />
            </header>

            <div className="flex flex-1 flex-col md:flex-row">
                <TermsContent sections={sections} />
            </div>

            <Footer />
        </div>
    );
};

export default TermsPage;
