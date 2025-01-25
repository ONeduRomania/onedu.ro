import React from 'react';
import Link from "next/link";

const RedirectioneazaCall: React.FC = () => {
    return (
        <div className="bg-white border-4 border-custom-blue-light rounded-xl p-8 shadow-lg text-center max-w-[100%] mx-auto mt-12">
            <h2 className="text-[1.4rem] font-bold text-custom-blue mb-4">
                Pentru salariații în anul 2024
            </h2>
            <p className="text-base text-gray-800 mb-6">
                Redirecționează 3,5% din impozitul pe venit și ajută-ne să continuăm planul pornit pentru educația din România.
            </p>
            <Link href="/formular230" className="bg-custom-blue text-white px-6 py-3 text-base font-bold rounded-md cursor-pointer transition-colors duration-300 hover:bg-custom-blue-dark">
                Completează formularul
            </Link>
        </div>
    );
};

export default RedirectioneazaCall;
