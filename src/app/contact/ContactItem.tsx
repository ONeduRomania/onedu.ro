// app/components/Contact/ContactItem.tsx
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
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex items-center gap-4 w-full max-w-xs">
            <Icon className="text-custom-blue text-3xl" />
            <div>
                <span className="block text-sm text-gray-600 font-bold">{label}</span>
                {link ? (
                    <Link href={link} className="text-custom-blue font-semibold hover:underline">
                        {info}
                    </Link>
                ) : (
                    <p className="text-gray-700">{info}</p>
                )}
            </div>
        </div>
    );
};

export default ContactItem;
