"use client";
import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import FilterSection from './FilterSection';
import ProjectCard from './ProjectCard';
import Pagination from './Pagination';
import { Navbar, Footer } from "@/components";
import axios from 'axios';

interface Project {
    id: string;
    title: string;
    category: string;
    status: string;
    date: string;
    image: string;
}

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/projects');
                setProjects(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error('Eroare la încărcarea proiectelor:', err);
                setError('Nu am putut încărca proiectele.');
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const getImageUrl = (img: string) => {
        if (!img) return 'https://placehold.co/800x450/e2e8f0/64748b?text=Proiect';
        if (img.startsWith('http')) return img;
        return img.startsWith('/') ? img : `/${img}`;
    };

    const projectsWithImage = projects.map((p) => ({ ...p, image: getImageUrl(p.image) }));

    const [filter, setFilter] = useState<string>('Toate');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const projectsPerPage = 16;

    const filteredProjects = projectsWithImage.slice(1).filter((project) => {
        if (filter === 'Toate') return true;
        return project.status === filter;
    });

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <section className="min-h-[50vh] flex items-center justify-center">
                    <div className="animate-pulse w-full max-w-4xl mx-auto px-4">
                        <div className="h-64 bg-gray-200 rounded-xl mb-8" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-gray-200 rounded-xl" />
                            ))}
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <section className="min-h-[50vh] flex flex-col items-center justify-center px-4">
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="btn-primary">
                        Încearcă din nou
                    </button>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <HeroSection heroProject={projectsWithImage[0]} />
            <FilterSection
                currentFilter={filter}
                onFilterChange={setFilter}
                filters={['Toate', ...Array.from(new Set(projects.map((p) => p.status).filter(Boolean))).sort()]}
            />
            <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                            <p className="text-lg md:text-xl text-gray-600 font-medium">Nu există proiecte în această categorie.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {currentProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Paginare */}
            {filteredProjects.length > projectsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={handlePrevPage}
                    onNext={handleNextPage}
                />
            )}
            <Footer />
        </>
    );
};

export default ProjectsPage;