import React from 'react';

const SMSCall: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Trimite <strong>SMS</strong> cu textul</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <span className="bg-custom-blue text-white px-4 py-2 rounded-md font-bold text-lg">EDUCATIE</span>
                <span className="font-bold text-2xl">la</span>
                <span className="font-bold text-3xl">8844</span>
                <span className="text-custom-blue font-bold">pentru <span className="text-custom-blue">2€ lunar</span></span>
            </div>
        </div>
    );
};

export default SMSCall;
