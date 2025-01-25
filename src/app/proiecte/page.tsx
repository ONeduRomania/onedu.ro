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

            <div className="mb-8 md:mb-0">
                <HeroSection heroProject={heroProject} handleProjectClick={handleProjectClick} />
            </div>
            <FilterSection currentFilter={filter} onFilterChange={setFilter} />
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {filteredProjects.length === 0 ? (
                        <p className="text-center text-gray-700">Nu există proiecte în această categorie.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
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