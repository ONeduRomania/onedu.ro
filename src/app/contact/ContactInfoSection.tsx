import React from 'react';
import ContactItem from './ContactItem';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { AiFillBank } from "react-icons/ai";

const ContactInfoSection = () => {
    return (
        <div className="bg-white pt-2 md:pt-4 pb-4 md:pb-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Alert Section */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-5 md:p-6 rounded-lg mb-6 md:mb-8 shadow-md" role="alert">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm md:text-base text-amber-800 leading-relaxed">
                                <strong className="font-bold">Important: </strong>
                                Începând cu <strong>martie 2026</strong>, odată cu lansarea <strong>Portalului de Suport ONedu</strong>,
                                adresa de email <em>contact@onedu.ro</em> nu va mai fi disponibilă.
                                Toată comunicarea se va face exclusiv prin portal.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <section className="flex flex-wrap justify-center gap-6 md:gap-8">
                    <ContactItem
                        Icon={FiMail}
                        label="Scrie-ne la"
                        info="contact@onedu.ro"
                        link="mailto:contact@onedu.ro"
                    />
                </section>
            </div>
        </div>
    );
};

export default ContactInfoSection;
