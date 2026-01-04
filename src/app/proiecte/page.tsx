"use client";
import React, { useState } from 'react';
import HeroSection from './HeroSection';
import FilterSection from './FilterSection';
import ProjectCard from './ProjectCard';
import Pagination from './Pagination';
import { Navbar, Footer } from "@/components";
import data from '@/data/projects.json';

interface Project {
    id: string;
    title: string;
    category: string;
    status: string;
    date: string;
    image: string;
}

const ProjectsPage: React.FC = () => {
    const projects: Project[] = data.projects;
    const heroProject: Project | undefined = projects[0];
    const remainingProjects: Project[] = projects.slice(1);

    const [filter, setFilter] = useState<string>('Toate');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const projectsPerPage = 16;

    const filteredProjects = remainingProjects.filter((project) => {
        if (filter === 'Toate') return true;
        return project.status === filter;
    });

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handleProjectClick = (id: string) => {
        window.location.href = `/proiecte/${id}`;
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <Navbar />

            <HeroSection heroProject={heroProject} handleProjectClick={handleProjectClick} />
            <FilterSection currentFilter={filter} onFilterChange={setFilter} />
            <section className="py-12 md:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-lg md:text-xl text-gray-700 font-medium">Nu există proiecte în această categorie.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {currentProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} onClick={handleProjectClick} />
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