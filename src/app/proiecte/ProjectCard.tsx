import React from "react";
import Image from "next/image";

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
    onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-200 hover:border-custom-blue group"
            onClick={() => onClick(project.id)}
        >
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>
            <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-900 group-hover:text-custom-blue transition-colors duration-300">{project.title}</h3>
                <div className="flex justify-start gap-2 mb-4 flex-wrap">
                    <span className="bg-custom-blue text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-md">
                        {project.status}
                    </span>
                </div>
                <span className="text-gray-600 text-sm md:text-base font-medium">{project.date}</span>
            </div>
        </div>
    );
};

export default ProjectCard;