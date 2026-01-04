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
        <section className="bg-gradient-to-br from-[#d2e2ff] to-[#e8f0ff] py-16 md:py-20 flex flex-col items-center text-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Află cât poate dona firma ta pentru educație</h2>
                <p className="text-lg md:text-xl text-gray-700 mb-12">
                    Modernizăm educația din România <strong className="text-gray-900">împreună</strong>.
                </p>
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 mb-10">
                    {/* Partea stângă cu inputuri */}
                    <div className="flex-1 flex flex-col items-center md:items-start bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 max-w-md">
                        <label className="text-base md:text-lg font-semibold text-gray-700 mb-3 w-full">Profit brut</label>
                        <div className="relative mb-6 w-full">
                            <input
                                type="number"
                                min="0"
                                id="profit"
                                className="w-full p-4 pr-12 text-base md:text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-custom-blue-light transition-all duration-300"
                                value={profit || ''}
                                placeholder="0"
                                onChange={(e) => setProfit(parseFloat(e.target.value) || 0)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold pointer-events-none">RON</span>
                        </div>

                        <label className="text-base md:text-lg font-semibold text-gray-700 mb-3 w-full">Suma sponsorizată în anul 2026</label>
                        <div className="relative mb-4 w-full">
                            <input
                                type="number"
                                min="0"
                                id="suma-sponsorizata"
                                className="w-full p-4 pr-12 text-base md:text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-custom-blue-light transition-all duration-300"
                                value={sumaSponsorizata || ''}
                                placeholder="0"
                                onChange={(e) => setSumaSponsorizata(parseFloat(e.target.value) || 0)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold pointer-events-none">RON</span>
                        </div>
                    </div>

                    {/* Partea dreaptă cu rezultatul */}
                    <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 md:p-10 max-w-md rounded-xl shadow-lg border-2 border-custom-blue">
                        <span className="text-4xl md:text-5xl font-bold text-custom-blue mb-3">{sumaDonare.toFixed(2)} RON</span>
                        <span className="text-lg md:text-xl text-gray-700 font-semibold">20% din impozitul pe profit</span>
                    </div>
                </div>

                <Link href="/contract" className="inline-block bg-custom-blue text-white px-8 py-4 text-lg font-bold rounded-lg transition-all duration-300 hover:bg-custom-blue-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                    Completează contractul acum
                </Link>
            </div>
        </section>
    );
};

export default SponsorshipCalculator;
