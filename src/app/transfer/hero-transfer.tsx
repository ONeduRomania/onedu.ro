"use client";

import React from "react";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="py-12" style={{ backgroundColor: "#d2e2ff" }}>
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6">Transfer bancar</h1>
                <p className="text-black text-xl">
                    Investește lunar în educație printr-o donație recurentă online,{" "}
                    <Link href="/doneaza" className="hover:underline">
                        de aici
                    </Link>.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
