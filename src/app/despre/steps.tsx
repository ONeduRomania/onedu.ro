// app/components/Despre/DigitalizationSection.tsx
import React from 'react';

interface StepProps {
    number: string;
    title: string;
    description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center">
            <span className="text-4xl font-bold text-custom-blue mb-4 block">{number}</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
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
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16">Cum digitalizăm România?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <Step key={index} number={step.number} title={step.title} description={step.description} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DigitalizationSection;
