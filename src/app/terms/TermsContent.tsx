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

interface Subsection {
    id: string;
    title: string;
}

interface TermsContentProps {
    sections: Section[];
}

// Secțiuni care au submeniuri (capitole) - ID-urile sunt generate din numele fișierului
const SECTIONS_WITH_SUBMENU = ['01-conditions', '03-retur'];

// Funcție pentru a extrage subsecțiunile (h2) din markdown
const extractSubsections = (content: string): Subsection[] => {
    // Regex pentru a găsi toate h2 (## titlu) din markdown
    const h2Regex = /^##\s+(.+)$/gm;
    const subsections: Subsection[] = [];
    let match;

    while ((match = h2Regex.exec(content)) !== null) {
        const title = match[1].trim();
        // Ignoră titlurile care sunt doar separatori (---)
        if (title === '---' || title.startsWith('---')) continue;
        
        // Creează un ID din titlu (lowercase, fără diacritice, spații înlocuite cu -)
        const id = title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        subsections.push({ id, title });
    }

    return subsections;
};


const TermsContent: React.FC<TermsContentProps> = ({ sections }) => {
    const [selectedSection, setSelectedSection] = useState<string>(
        sections.length > 0 ? sections[0].id : ""
    );
    const [selectedSubsection, setSelectedSubsection] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Obține subsecțiunile pentru secțiunea curentă
    const currentSection = sections.find((s) => s.id === selectedSection);
    const hasSubmenu = currentSection && SECTIONS_WITH_SUBMENU.includes(selectedSection);
    const subsections = hasSubmenu ? extractSubsections(currentSection.content) : [];

    // Citire hash din URL la încărcare
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.replace('#', '');
            if (hash) {
                // Verifică dacă este o secțiune
                const section = sections.find((sec) => sec.id === hash);
                if (section) {
                    setSelectedSection(hash);
                } else {
                    // Verifică dacă este o subsecțiune
                    for (const sec of sections) {
                        if (SECTIONS_WITH_SUBMENU.includes(sec.id)) {
                            const subs = extractSubsections(sec.content);
                            const sub = subs.find((s) => s.id === hash);
                            if (sub) {
                                setSelectedSection(sec.id);
                                setSelectedSubsection(hash);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }, [sections]);

    // Actualizare hash în URL când se schimbă secțiunea sau subsecțiunea
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (selectedSubsection) {
                window.history.replaceState(null, '', `#${selectedSubsection}`);
            } else if (selectedSection) {
                window.history.replaceState(null, '', `#${selectedSection}`);
            }
        }
    }, [selectedSection, selectedSubsection]);

    useEffect(() => {
        // Dacă secțiunile s-au actualizat și secțiunea selectată nu există,
        // selectăm prima secțiune disponibilă.
        if (sections.length > 0 && !sections.some((sec) => sec.id === selectedSection)) {
            setSelectedSection(sections[0].id);
        }
    }, [sections, selectedSection]);

    const handleSectionClick = (id: string) => {
        setSelectedSection(id);
        setSelectedSubsection(null);
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    // Căutăm conținutul markdown al secțiunii curente
    const currentContent = sections.find((section) => section.id === selectedSection)?.content || "";

    const handleSubsectionClick = (subsectionId: string) => {
        setSelectedSubsection(subsectionId);
        // Așteaptă ca ReactMarkdown să renderizeze conținutul
        setTimeout(() => {
            const element = document.getElementById(subsectionId);
            if (element) {
                // Scroll la element cu offset pentru navbar
                const yOffset = -100;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            } else {
                // Dacă nu găsește elementul, încearcă din nou după un delay mai mare
                setTimeout(() => {
                    const retryElement = document.getElementById(subsectionId);
                    if (retryElement) {
                        const yOffset = -100;
                        const y = retryElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                }, 300);
            }
        }, 200);
    };

    // Scroll automat la subsecțiune când se schimbă selectedSubsection
    useEffect(() => {
        if (selectedSubsection) {
            const timer = setTimeout(() => {
                const element = document.getElementById(selectedSubsection);
                if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [selectedSubsection, currentContent]);

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
            <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 shadow-sm">
                <div className="sticky top-0 p-6 md:p-8 max-h-screen overflow-y-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Termeni și Condiții</h1>
                    <nav className="space-y-1" aria-label="Secțiuni termeni și condiții">
                        {sections.map((section) => {
                            const isSelected = selectedSection === section.id;
                            const hasSubsections = SECTIONS_WITH_SUBMENU.includes(section.id);
                            const sectionSubsections = hasSubsections ? extractSubsections(section.content) : [];

                            return (
                                <div key={section.id}>
                                    <button
                                        onClick={() => handleSectionClick(section.id)}
                                        className={`text-left w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                            isSelected
                                                ? "bg-custom-blue text-white shadow-md"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-custom-blue"
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            isSelected ? "bg-white" : "bg-custom-blue opacity-0 group-hover:opacity-100"
                                        }`}></span>
                                        {section.title}
                                    </button>
                                    {/* Submeniu pentru secțiuni cu capitole */}
                                    {isSelected && hasSubsections && sectionSubsections.length > 0 && (
                                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-custom-blue/30 pl-2">
                                            {sectionSubsections.map((subsection) => (
                                                <button
                                                    key={subsection.id}
                                                    onClick={() => handleSubsectionClick(subsection.id)}
                                                    className={`text-left w-full px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                                                        selectedSubsection === subsection.id
                                                            ? "bg-custom-blue/20 text-custom-blue font-semibold"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-custom-blue"
                                                    }`}
                                                >
                                                    {subsection.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    // Extrage textul din children (poate fi string sau array)
                                    const getText = (children: any): string => {
                                        if (typeof children === 'string') return children;
                                        if (Array.isArray(children)) {
                                            return children.map(getText).join('');
                                        }
                                        if (children?.props?.children) {
                                            return getText(children.props.children);
                                        }
                                        return String(children);
                                    };
                                    const text = getText(children);
                                    const id = text
                                        .toLowerCase()
                                        .normalize('NFD')
                                        .replace(/[\u0300-\u036f]/g, '')
                                        .replace(/[^a-z0-9]+/g, '-')
                                        .replace(/^-+|-+$/g, '');
                                    return <h2 id={id} {...props}>{children}</h2>;
                                }
                            }}
                        >
                            {currentContent}
                        </ReactMarkdown>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsContent;
