// app/privacy/PrivacyPage.tsx (sau /app/privacy/page.tsx, in funcție de structura proiectului)
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Footer, Navbar } from '@/components';
import PrivacyContent from './PrivacyContent';

interface Section {
    id: string;
    title: string;
    content: string;
}

async function getSections(): Promise<Section[]> {
    const sectionsDirectory = path.join(process.cwd(), 'src', 'app', 'privacy', 'sections');

    const filenames = fs.readdirSync(sectionsDirectory).filter((file) => file.endsWith('.md'));

    return filenames.map((filename) => {
        const filePath = path.join(sectionsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const { data, content } = matter(fileContents);

        const baseName = path.parse(filename).name;
        const id = baseName.toLowerCase();

        const fallbackTitle = baseName.replace(/-/g, ' ');
        const title = data.title || fallbackTitle;

        return {
            id,
            title,
            content,
        };
    });
}

export default async function PrivacyPage() {
    const sections = await getSections();

    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <Navbar />
            </header>

            <div className="flex flex-1 flex-col md:flex-row">
                <PrivacyContent sections={sections} />
            </div>

            <Footer />
        </div>
    );
}
