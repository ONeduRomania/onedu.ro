import { User, Briefcase, Users } from 'lucide-react';
import Image from "next/image";
import React from "react";

export default function HRPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <header className="absolute top-6 flex flex-col items-center w-full">
                <Image
                    src={`${process.env.BASE_IMAGE_URL}logos/logo.webp`}
                    alt="Logo"
                    width={150}
                    height={40}
                    className="cursor-pointer"
                />
                <a href="hr/onboarding" className="mt-4 text-gray-600 hover:text-gray-800 text-lg font-semibold">
                    Către procesul de onboarding →
                </a>
            </header>

            <h2 className="text-3xl font-bold text-gray-900 mt-20">Alege calitatea ta</h2>

            <div className="mt-10 flex space-x-20">
                <a href="/hr/voluntar" className="flex flex-col items-center space-y-4 cursor-pointer hover:scale-105 transition"><User className="h-28 w-28 text-custom-blue" />
                    <span className="text-xl font-semibold text-custom-blue">Voluntar</span></a>

                <a href="/hr/parinte" className="flex flex-col items-center space-y-4 cursor-pointer hover:scale-105 transition"><Users className="h-28 w-28 text-custom-blue" />
                    <span className="text-xl font-semibold text-custom-blue">Părinte</span></a>

                <a href="/hr/aga" className="flex flex-col items-center space-y-4 cursor-pointer hover:scale-105 transition"><Briefcase className="h-28 w-28 text-custom-blue" />
                    <span className="text-xl font-semibold text-custom-blue">Membru asociat</span></a>
            </div>
        </div>
    );
}
