'use client';

import React, { useState, useRef } from 'react';

interface Section {
    id: string;
    title: string;
    content: string;
}

interface TermsContentProps {
    sections: Section[];
}

const TermsContent: React.FC<TermsContentProps> = ({ sections }) => {
    const [selectedSection, setSelectedSection] = useState<string>('introduction');
    const contentRef = useRef<HTMLDivElement>(null);

    const handleSectionClick = (id: string) => {
        setSelectedSection(id);
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const currentContent = sections.find(section => section.id === selectedSection)?.content || '';

    return (
        <>
            {/* Sidebar */}
            <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-6">Termeni și Condiții</h2>
                <ul className="space-y-4">
                    {sections.map(section => (
                        <li key={section.id}>
                            <button
                                onClick={() => handleSectionClick(section.id)}
                                className={`text-left w-full px-4 py-2 rounded-md text-sm font-medium ${
                                    selectedSection === section.id
                                        ? 'bg-custom-blue text-white'
                                        : 'hover:bg-custom-blue hover:text-white'
                                }`}
                            >
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Content */}
            <main className="w-full md:w-3/4 lg:w-4/5 p-6 overflow-auto">
                <div
                    ref={contentRef}
                    className="prose prose-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentContent }}
                />
            </main>
        </>
    );
};

export default TermsContent;
