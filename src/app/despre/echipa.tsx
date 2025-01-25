// app/components/Despre/TeamSection.tsx
import React from 'react';
import Image from 'next/image';

interface TeamMemberProps {
    imageSrc: string;
    name: string;
    role: string;
    project?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ imageSrc, name, role, project }) => {
    return (
        <div className="bg-white p-6 text-center rounded-xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
            <Image
                src={imageSrc}
                alt={name}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-600">{role}</p>
            {project && <p className="text-gray-500 text-sm">{project}</p>}
        </div>
    );
};

const TeamSection: React.FC = () => {
    const teamMembers: TeamMemberProps[] = [
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/stefan.png`,
            name: 'Andrei-Ștefan Poenaru',
            role: 'președinte',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/crina.png`,
            name: 'Crina Rusu',
            role: 'vicepreședinte',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/mariana.png`,
            name: 'Mariana Uhren',
            role: 'secretar',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/raly.png`,
            name: 'Raly Țonea',
            role: 'director resurse umane',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/claudiu.png`,
            name: 'Claudiu Chiorean',
            role: 'asistent manager',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/darius.png`,
            name: 'Darius Bordeanu',
            role: 'web developer',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/florin.png`,
            name: 'Florin Baciu',
            role: 'coordonator voluntari',
            project: 'TEDxAvram Iancu Street',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/bianca.png`,
            name: 'Bianca Țuligă',
            role: 'manager comunicare',
            project: 'TEDxAvram Iancu Street',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/darius-merian.jpg`,
            name: 'Darius Merian',
            role: 'manager comunicare',
            project: 'Gala Voluntariatului',
        },
    ];

    return (
        <section className="bg-[#D2E2FF] py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Echipa Asociației ONedu</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember
                            key={index}
                            imageSrc={member.imageSrc}
                            name={member.name}
                            role={member.role}
                            project={member.project}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
