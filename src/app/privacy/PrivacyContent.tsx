// app/privacy/PrivacyContent.tsx (client component)
"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface Section {
    id: string;
    title: string;
    content: string; // Markdown brut
}

interface PrivacyContentProps {
    sections: Section[];
}

export default function PrivacyContent({ sections }: PrivacyContentProps) {
    const [selectedSection, setSelectedSection] = useState<string>(
        sections.length > 0 ? sections[0].id : ""
    );
    const contentRef = useRef<HTMLDivElement>(null);

    // Citire hash din URL la încărcare
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.replace('#', '');
            if (hash && sections.some((sec) => sec.id === hash)) {
                setSelectedSection(hash);
            }
        }
    }, [sections]);

    // Actualizare hash în URL când se schimbă secțiunea
    useEffect(() => {
        if (typeof window !== 'undefined' && selectedSection) {
            window.history.replaceState(null, '', `#${selectedSection}`);
        }
    }, [selectedSection]);

    useEffect(() => {
        // Dacă secțiunea selectată nu mai există, selectăm prima
        if (sections.length > 0 && !sections.some((sec) => sec.id === selectedSection)) {
            setSelectedSection(sections[0].id);
        }
    }, [sections, selectedSection]);

    const handleSectionClick = (id: string) => {
        setSelectedSection(id);
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    // Căutăm conținutul brut (Markdown) al secțiunii curente
    const currentContent =
        sections.find((section) => section.id === selectedSection)?.content || "";

    if (!sections || sections.length === 0) {
        return (
            <div className="p-6 text-center">
                <p>Nu există secțiuni disponibile.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row w-full">
            {/* Sidebar */}
            <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 shadow-sm">
                <div className="sticky top-0 p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Politica de Confidențialitate</h1>
                    <nav className="space-y-1" aria-label="Secțiuni politica de confidențialitate">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleSectionClick(section.id)}
                                className={`text-left w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                    selectedSection === section.id
                                        ? "bg-custom-blue text-white shadow-md"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-custom-blue"
                                }`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                    selectedSection === section.id ? "bg-white" : "bg-custom-blue opacity-0 group-hover:opacity-100"
                                }`}></span>
                                {section.title}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Conținutul principal */}
            <main className="flex-1 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-12">
                    <div ref={contentRef} id={selectedSection} className="prose prose-lg max-w-none 
                        prose-headings:text-gray-900 prose-headings:font-bold 
                        prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-custom-blue
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800
                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
                        prose-strong:text-gray-900 prose-strong:font-semibold
                        prose-ul:text-gray-700 prose-ul:mb-6 prose-ul:space-y-2
                        prose-ol:text-gray-700 prose-ol:mb-6 prose-ol:space-y-2
                        prose-li:text-gray-700 prose-li:mb-2
                        prose-a:text-custom-blue prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                        prose-blockquote:border-l-4 prose-blockquote:border-custom-blue prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                        prose-code:text-custom-blue prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                        prose-pre:bg-gray-900 prose-pre:text-gray-100">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                            {currentContent}
                        </ReactMarkdown>
                    </div>
                </div>
            </main>
        </div>
    );
}
