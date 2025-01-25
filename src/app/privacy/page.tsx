"use client";

import React, { useState, useEffect, useRef } from 'react';
import privacyData from '@/data/privacy.json';
import Image from 'next/image';
import {Footer, Navbar} from "@/components";

const PrivacyPolicyPage: React.FC = () => {
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

    const currentContent = privacyData.find(section => section.id === selectedSection)?.content || '';

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header>
               <Navbar />
            </header>

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-6">
                    <h2 className="text-2xl font-bold mb-6">Politica de Confidențialitate</h2>
                    <ul className="space-y-4">
                        {privacyData.map(section => (
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
            </div>

            {/* Footer */}
           <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
