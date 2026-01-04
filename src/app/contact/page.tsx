import { Navbar, Footer } from "@/components";
import React from "react";
import ContactInfoSection from "@/app/contact/ContactInfoSection";


export default function Homepage() {
    return (
        <>
            <Navbar />
            {/* Hero Section */}
            <section className="w-full py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Contact</h1>
                </div>
            </section>
            <ContactInfoSection />
            <Footer />
        </>
    );
}
