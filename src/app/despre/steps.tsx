// app/components/Despre/DigitalizationSection.tsx
import React from 'react';

interface StepProps {
    number: string;
    title: string;
    description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-xl text-center">
            <span className="text-4xl font-bold text-gray-800 mb-4 block">{number}</span>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const DigitalizationSection: React.FC = () => {
    const steps: StepProps[] = [
        {
            number: '01',
            title: 'Aducem conștientizare',
            description: 'Promovăm conceptele de educație digitală și management electronic în comunitate.',
        },
        {
            number: '02',
            title: 'Trasăm o hartă a soluțiilor digitale',
            description: 'Gândim și planificăm atent soluțiile digitale ce acoperă nevoile din educație și tineret.',
        },
        {
            number: '03',
            title: 'Construim ecosisteme digitale',
            description: 'Împreună acoperim nevoile comunității și digitalizăm România.',
        },
    ];

    return (
        <section className="bg-[#fdfdff] py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Cum digitalizăm România?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <Step key={index} number={step.number} title={step.title} description={step.description} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DigitalizationSection;
