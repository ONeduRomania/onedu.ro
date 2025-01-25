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
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-xl"
            onClick={() => onClick(project.id)}
        >
            <div className="relative w-full h-0 pb-[56.25%]">
                <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-6 text-center md:text-left">
                <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                <div className="flex justify-center md:justify-start gap-2 mb-3 flex-wrap">
                    <span className="bg-custom-blue text-white px-3 py-1 rounded-full text-sm">
                        {project.status}
                    </span>
                </div>
                <span className="text-gray-600 text-sm">{project.date}</span>
            </div>
        </div>
    );
};

export default ProjectCard;