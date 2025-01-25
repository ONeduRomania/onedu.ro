// app/components/Contact/ContactInfoSection.tsx
import React from 'react';
import ContactItem from './ContactItem';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { AiFillBank } from "react-icons/ai";

const ContactInfoSection = () => {
    return (
        <>
            {/* Prima Secțiune de Contact */}
            <section className="flex flex-wrap justify-center gap-6 my-12">
                <ContactItem
                    Icon={FiMail}
                    label="Scrie-ne la"
                    info="secretariat@onedu.ro"
                    link="mailto:secretariat@onedu.ro"
                />
                <ContactItem
                    Icon={FiPhone}
                    label="Sună-ne la"
                    info="+40 753 491 030"
                    link="tel:+40753491030"
                />
            </section>

            {/* Titlu pentru Alte Informații */}
            <h3 className="text-2xl font-bold text-center mb-8">Alte informații de contact</h3>

            {/* Secțiunea Alte Informații */}
            <section className="flex flex-wrap justify-center gap-6 my-12">
                <ContactItem
                    Icon={FaRegNewspaper}
                    label="Presă"
                    info="comunicare@onedu.ro"
                />
                <ContactItem
                    Icon={IoMdPeople}
                    label="Resurse umane"
                    info="hr@onedu.ro"
                />
                <ContactItem
                    Icon={AiFillBank}
                    label="Financiar"
                    info="financiar@onedu.ro"
                />
            </section>
        </>
    );
};

export default ContactInfoSection;
