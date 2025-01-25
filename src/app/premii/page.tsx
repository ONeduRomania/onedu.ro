import {Navbar, Footer} from "@/components";
import Hero from "@/components/pageContent/hero";
import React from "react";
import PremiuCard from './PremiuCard';
import premiiData from '@/data/premii.json';


export default function Homepage() {
    return (
        <>
            <Navbar/>
            <Hero
                title="🏆 Premii"
                subtitle=""
            >
            </Hero>
            <div className="flex flex-wrap justify-center gap-8 mt-6 mb-6">
                {premiiData.map((premiu) => (
                    <PremiuCard key={premiu.id} premiu={premiu}/>
                ))}
            </div>
            <Footer/>
        </>
    );
}
