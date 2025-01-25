// app/components/SponsorshipCalculator/SponsorshipCalculator.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const SponsorshipCalculator: React.FC = () => {
    // State pentru calculator
    const [profit, setProfit] = useState<number>(0);
    const [sumaSponsorizata, setSumaSponsorizata] = useState<number>(0);
    const sumaDonare = Math.max(0, 0.20 * (profit * 0.16) - sumaSponsorizata);

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.add('border-custom-blue');
        e.target.classList.remove('border-gray-300');
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.remove('border-custom-blue');
        e.target.classList.add('border-gray-300');
    };

    return (
        <section className="bg-[#D2E2FF] py-16 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-4">Află cât poate dona firma ta pentru educație</h2>
            <p className="text-lg text-gray-700 mb-8">
                Modernizăm educația din România <strong>împreună</strong>.
            </p>
            <div className="flex flex-col md:flex-row items-stretch justify-center max-w-4xl w-11/12 gap-8">
                {/* Partea stângă cu inputuri */}
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <label className="font-bold text-left mb-2">Profit brut</label>
                    <div className="relative mb-4 w-full max-w-[350px]">
                        <input
                            type="number"
                            min="0"
                            id="profit"
                            className="w-full p-3 pr-8 font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue appearance-none"
                            value={profit}
                            placeholder="RON"
                            onChange={(e) => setProfit(parseFloat(e.target.value) || 0)}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">RON</span>
                    </div>

                    <label className="font-bold text-left mb-2">Suma sponsorizată în anul 2024</label>
                    <div className="relative mb-4 w-full max-w-[350px]">
                        <input
                            type="number"
                            min="0"
                            id="suma-sponsorizata"
                            className="w-full p-3 pr-8 font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue appearance-none"
                            value={sumaSponsorizata}
                            placeholder="RON"
                            onChange={(e) => setSumaSponsorizata(parseFloat(e.target.value) || 0)}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">RON</span>
                    </div>
                </div>

                {/* Partea dreaptă cu rezultatul */}
                <div className="flex-1 flex flex-col justify-center items-center bg-white p-6 max-w-[400px] rounded-lg shadow-lg">
                    <span className="text-3xl font-bold text-custom-blue mb-2">{sumaDonare.toFixed(2)} RON</span>
                    <span className="text-lg text-gray-700">20% din impozitul pe profit</span>
                </div>
            </div>

            <Link href="/contract" className="mt-8 bg-custom-blue text-white px-6 py-3 rounded-md font-bold transition-colors duration-300 hover:bg-custom-blue-dark">
                Completează contractul acum
            </Link>
        </section>
    );
};

export default SponsorshipCalculator;
