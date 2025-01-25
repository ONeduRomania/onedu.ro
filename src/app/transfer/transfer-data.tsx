"use client";

import React from "react";
import Image from "next/image";

const TransferData = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mt-8 mb-6">

            <div className="flex-1 px-4 md:pl-24">
                <p className="text-sm font-bold text-gray-900 mb-1">Beneficiar</p>
                <p className="text-lg font-extrabold text-black mb-4">Asociația ONedu</p>

                <p className="text-sm font-bold text-gray-900 mb-1">Cod fiscal</p>
                <p className="text-lg font-extrabold text-black mb-4">49039313</p>

                <p className="text-sm font-bold text-gray-900 mb-1">Banca</p>
                <p className="text-lg font-extrabold text-black mb-4">Banca Transilvania</p>

                <p className="text-sm font-bold text-gray-900 mb-1">IBAN (cont RON)</p>
                <p className="text-lg font-extrabold text-black mb-4">RO49 BTRL RONC RT0C O956 3601</p>

                <p className="text-sm font-bold text-gray-900 mb-1">IBAN (cont EUR)</p>
                <p className="text-lg font-extrabold text-black mb-4">RO93 BTRL EURC RT0C O956 3601</p>

            </div>

            <div className="flex-1 flex flex-col justify-center items-center hidden md:flex">
                <Image
                    width={500}
                    height={300}
                    src={`${process.env.BASE_IMAGE_URL}scanbilete.jpg`}
                    alt="Imagine Transfer Bancar"
                    className="w-full max-w-[500px] h-auto object-cover rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default TransferData;
