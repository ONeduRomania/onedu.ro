import React from "react";
import Image from "next/image";

export default function HRParintePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <header className="w-full flex flex-col items-center mb-10">
                <Image
                    src={`${process.env.BASE_IMAGE_URL}logos/logo.webp`}
                    alt="Logo"
                    width={150}
                    height={40}
                    className="cursor-pointer"
                />
                <h1 className="text-3xl font-bold text-gray-900 mt-4">Informații pentru Adunarea Generală</h1>
            </header>

            <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800">Acces electronic la documentele Adunării Generale</h2>
                    <p className="text-gray-600 mt-2">Începând cu 2025, accesul la hotărâri și procese verbale se face prin email, la driveul la care vi s-a acordat acces. </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800">Convocatoare</h2>
                    <p className="text-gray-600 mt-2">Începând cu 2025, convocatoarele sunt comunicate prin poștă electronică. </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800">Contact</h2>
                    <p className="text-gray-800 font-semibold">Email: <a href="mailto:stefan@onedu.ro" className="text-custom-blue">stefan@onedu.ro</a></p>
                </section>
            </div>
        </div>
    );
}
