'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    category: string;
    status: string;
    date: string;
    image: string;
}

interface ProjectCardProps {
    project: Project;
    onClick?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Link href={`/proiecte/${project.id}`} className="group block">
            <article className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-custom-blue/20">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 right-3">
                        <span className="bg-custom-blue/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm">
                            {project.status}
                        </span>
                    </div>
                </div>
                <div className="p-5 md:p-6">
                    <span className="text-gray-500 text-sm font-medium">{project.category}</span>
                    <h3 className="text-lg md:text-xl font-bold mt-2 mb-3 text-gray-900 group-hover:text-custom-blue transition-colors duration-300 line-clamp-2">
                        {project.title}
                    </h3>
                    <span className="text-gray-500 text-sm">{project.date}</span>
                </div>
            </article>
        </Link>
    );
};

export default ProjectCard;
