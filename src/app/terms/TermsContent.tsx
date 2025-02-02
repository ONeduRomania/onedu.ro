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

interface TermsContentProps {
    sections: Section[];
}

const TermsContent: React.FC<TermsContentProps> = ({ sections }) => {
    const [selectedSection, setSelectedSection] = useState<string>(
        sections.length > 0 ? sections[0].id : ""
    );
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Dacă secțiunile s-au actualizat și secțiunea selectată nu există,
        // selectăm prima secțiune disponibilă.
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

    // Căutăm conținutul markdown al secțiunii curente.
    const currentContent =
        sections.find((section) => section.id === selectedSection)?.content || "";

    // Dacă nu există nicio secțiune, arătăm un mesaj simplu.
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
            <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-6">Termeni și Condiții</h2>
                <ul className="space-y-4">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <button
                                onClick={() => handleSectionClick(section.id)}
                                className={`text-left w-full px-4 py-2 rounded-md text-sm font-medium ${
                                    selectedSection === section.id
                                        ? "bg-custom-blue text-white"
                                        : "hover:bg-custom-blue hover:text-white"
                                }`}
                            >
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Conținutul principal */}
            <main className="w-full md:w-3/4 lg:w-4/5 p-6 overflow-auto">
                {/* Clasa .prose pentru stiluri tipografice Markdown (dacă ai Tailwind Typography) */}
                <div ref={contentRef} className="prose max-w-none">
                    <ReactMarkdown

                        remarkPlugins={[remarkGfm, remarkBreaks]}
                    >
                        {currentContent}
                    </ReactMarkdown>
                </div>
            </main>
        </div>
    );
};

export default TermsContent;
