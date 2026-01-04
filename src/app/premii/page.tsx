import {Navbar, Footer} from "@/components";
import React from "react";
import PremiuCard from './PremiuCard';
import premiiData from '@/data/premii.json';
import HeroPremii from './hero-premii';


export default function Homepage() {
    return (
        <>
            <Navbar/>
            <HeroPremii title="🏆 Premii" />
            <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {premiiData.map((premiu) => (
                            <PremiuCard key={premiu.id} premiu={premiu}/>
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}
