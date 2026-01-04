import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';

interface ContactItemProps {
    Icon: IconType;
    label: string;
    info: string;
    link?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ Icon, label, info, link }) => {
    return (
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6 md:p-8 flex items-center gap-5 w-full max-w-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-custom-blue group">
            <div className="bg-custom-blue-light p-4 rounded-full group-hover:bg-custom-blue transition-colors duration-300">
                <Icon className="text-custom-blue text-3xl md:text-4xl group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="flex-1">
                <span className="block text-sm md:text-base text-gray-600 font-semibold mb-2">{label}</span>
                {link ? (
                    <Link href={link} className="text-custom-blue font-bold text-base md:text-lg hover:text-custom-blue-dark hover:underline transition-colors duration-200">
                        {info}
                    </Link>
                ) : (
                    <p className="text-gray-800 font-medium text-base md:text-lg">{info}</p>
                )}
            </div>
        </div>
    );
};

export default ContactItem;
