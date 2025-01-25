import React from 'react';
import {Footer, Navbar} from "@/components";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import TermsContent from './TermsContent';

interface Section {
    id: string;
    title: string;
    content: string;
}

const getSections = async (): Promise<Section[]> => {
    const sectionsDirectory = path.join(process.cwd(), 'src', 'app', 'terms', 'sections');
    const filenames = fs.readdirSync(sectionsDirectory).filter(file => file.endsWith('.md'));

    return await Promise.all(
        filenames.map(async (filename) => {
            const filePath = path.join(sectionsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');

            // Parse frontmatter și conținutul
            const {data, content} = matter(fileContents);

            // Convertire Markdown la HTML
            const processedContent = await remark()
                .use(html)
                .process(content);
            const contentHtml = processedContent.toString();

            return {
                id: data.id || path.parse(filename).name,
                title: data.title || path.parse(filename).name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
                content: contentHtml,
            };
        })
    );
};

const TermsPage = async () => {
    const sections = await getSections();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header>
                <Navbar />
            </header>

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Sidebar și Content */}
                <TermsContent sections={sections} />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default TermsPage;
