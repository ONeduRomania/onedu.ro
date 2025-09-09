'use client';

import { Navbar, Footer } from "@/components";
import Link from "next/link";
import React from "react";

export default function RedirectioneazaFwdPage() {
    return (
        <>
            <Navbar />

            <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
                <h1 className="text-3xl font-bold mb-4">Mulțumim pentru susținerea ta!</h1>
                <p className="text-lg mb-6">
                    Perioada dedicată completării formularului pentru redirecționarea a 3.5% din impozitul pe venit s-a încheiat.
                </p>
                <p className="text-lg mb-6">
                    Ne poți susține cu o{" "}
                    <Link
                        href="/doneaza"
                        className="bg-custom-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-custom-blue-dark transition-colors duration-300"
                    >
                        donație
                    </Link>{" "}
                    sau, dacă ai o firmă, prin{" "}
                    <Link
                        href="/sponsorizeaza"
                        className="bg-custom-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-custom-blue-dark transition-colors duration-300"
                    >
                        direcționarea a 20% din impozitul pe profit
                    </Link>.
                </p>
            </main>

            <Footer />
        </>
    );
}
