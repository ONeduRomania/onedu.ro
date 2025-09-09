import React from 'react';
import ContactItem from './ContactItem';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { AiFillBank } from "react-icons/ai";

const ContactInfoSection = () => {
    return (
        <>

            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6 text-center" role="alert">
                <strong className="font-bold">Important: </strong>
                <span className="block sm:inline">
                    Începând cu <strong>ianuarie 2026</strong>, odată cu lansarea <strong>Portalului de Suport ONedu</strong>,
                    adresa de email <em>contact@onedu.ro</em> nu va mai fi disponibilă.
                    Toată comunicarea se va face exclusiv prin portal.
                </span>
            </div>

            <section className="flex flex-wrap justify-center gap-6 my-12">
                <ContactItem
                    Icon={FiMail}
                    label="Scrie-ne la"
                    info="contact@onedu.ro"
                    link="mailto:contact@onedu.ro"
                />
            </section>

            {/*/!* Titlu pentru Alte Informații *!/*/}
            {/*<h3 className="text-2xl font-bold text-center mb-8">Alte informații de contact</h3>*/}

            {/*/!* Secțiunea Alte Informații *!/*/}
            {/*<section className="flex flex-wrap justify-center gap-6 my-12">*/}
            {/*    <ContactItem*/}
            {/*        Icon={FaRegNewspaper}*/}
            {/*        label="Presă"*/}
            {/*        info="comunicare@onedu.ro"*/}
            {/*    />*/}
            {/*    <ContactItem*/}
            {/*        Icon={IoMdPeople}*/}
            {/*        label="Resurse umane"*/}
            {/*        info="hr@onedu.ro"*/}
            {/*    />*/}
            {/*    <ContactItem*/}
            {/*        Icon={AiFillBank}*/}
            {/*        label="Financiar"*/}
            {/*        info="financiar@onedu.ro"*/}
            {/*    />*/}
            {/*</section>*/}
        </>
    );
};

export default ContactInfoSection;
