// components
import { Navbar, Footer } from "@/components";
import Hero from "@/components/pageContent/hero";
import React from "react";
import ContactInfoSection from "@/app/contact/ContactInfoSection";


export default function Homepage() {
    return (
        <>
            <Navbar />
            <Hero
                title="📨 Contact"
                subtitle=""
            />
            <ContactInfoSection />
            <Footer />
        </>
    );
}
