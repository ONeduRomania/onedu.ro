// src/components/DonationInfo.tsx
import React from 'react';

const SMSinfo: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-4">Informații despre donația recurentă prin SMS</h2>
            <p className="text-gray-700 mb-4">
                Poți opri donația lunară cu mesajele „EDUCATIE STOP” la 8844.
            </p>
            <p className="text-gray-700 mb-4">
                Donația prin SMS poate fi făcută doar pe teritoriul României.
            </p>
            <p className="text-gray-700">
                Valoarea donației prin SMS este de 2 euro pe lună. Pentru donațiile de pe abonament nu se percepe TVA. Pentru donațiile de pe cartelele preplătite, din rețelele Digi Mobil, Orange și Telekom România Mobile, TVA-ul a fost reținut la achiziționarea creditului. Pentru donațiile de pe cartelele preplătite în rețeaua Vodafone utilizatorii nu plătesc TVA. Campanie realizată cu sprijinul Digi Mobil, Orange România, Telekom România Mobile și Vodafone Romania.
            </p>
        </div>
    );
};

export default SMSinfo;
