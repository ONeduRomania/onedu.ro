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
        <div className="bg-white p-4 text-center rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg">
            <Image
                src={imageSrc}
                alt={name}
                width={80}
                height={80}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
            />
            <h3 className="text-base font-semibold text-gray-800 mb-1">{name}</h3>
            <p className="text-gray-600 text-sm">{role}</p>
            {project && <p className="text-gray-500 text-xs mt-1">{project}</p>}
        </div>
    );
};

const TeamSection: React.FC = () => {
    const teamMembers: TeamMemberProps[] = [
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/stefanP.jpg`,
            name: 'Andrei-Ștefan Poenaru',
            role: 'președinte',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/crina.png`,
            name: 'Crina Rusu',
            role: 'vicepreședinte',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/crina.png`,
            name: 'Diana Oloșutean',
            role: 'secretar',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/cristibogdan.jpg`,
            name: 'Bogdan Trandafir',
            role: 'asistent manager',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/claudiu.png`,
            name: 'Claudiu Chiorean',
            role: 'asistent manager',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/ralyT.jpg`,
            name: 'Raly Țonea',
            role: 'director resurse umane',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/florin.jpg`,
            name: 'Florin Baciu',
            role: 'coordonator voluntari',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/boss.png`,
            name: 'Darius Șerban',
            role: 'coordonator voluntari',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/bianca.png`,
            name: 'Bianca Țuligă',
            role: 'manager comunicare',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/alexciobo.webp`,
            name: 'Alexandru Ciobotaru',
            role: 'asistent manager comunicare',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/dariusMC.jpg`,
            name: 'Darius Merian',
            role: 'asistent comunicare',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/crina.png`,
            name: 'Maria Bărăuță',
            role: 'asistent comunicare',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/mariana.png`,
            name: 'Mariana Uhren',
            role: 'asistent comunicare',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/ioanao.webp`,
            name: 'Ioana Otilia Barabulă',
            role: 'copywriter',
        },
        {
            imageSrc: `${process.env.BASE_IMAGE_URL}team/crina.png`,
            name: 'Joselin Buș',
            role: 'copywriter',
        },
    ];

    return (
        <section className="bg-[#D2E2FF] py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Echipa Asociației ONedu</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
