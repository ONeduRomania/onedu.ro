'use client';

import React, { useState } from 'react';

const events = ["Eveniment 1", "Eveniment 2", "Eveniment 3", "Eveniment 4"];

const FormularContractVoluntariat: React.FC = () => {
    // === Pas 1: Date personale ===
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [event, setEvent] = useState('');

    // === Pas 2: Adresă ===
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    // câmpuri opționale
    const [block, setBlock] = useState('');
    const [staircase, setStaircase] = useState('');
    const [floor, setFloor] = useState('');
    const [apartment, setApartment] = useState('');
    // câmpuri obligatorii
    const [locality, setLocality] = useState('');
    const [county, setCounty] = useState('');

    // === Pas 3: Date din buletin ===
    const [cnp, setCnp] = useState('');
    // pe rândul doi:
    const [idSeries, setIdSeries] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [issuedBy, setIssuedBy] = useState('');
    const [issuedDate, setIssuedDate] = useState('');

    // === Pas suplimentar pentru minori: Date părinte ===
    const [parentLastName, setParentLastName] = useState('');
    const [parentFirstName, setParentFirstName] = useState('');
    // adresa părintelui:
    const [parentStreet, setParentStreet] = useState('');
    const [parentNumber, setParentNumber] = useState('');
    const [parentLocality, setParentLocality] = useState('');
    const [parentCounty, setParentCounty] = useState('');
    // câmpuri opționale:
    const [parentBlock, setParentBlock] = useState('');
    const [parentStaircase, setParentStaircase] = useState('');
    const [parentFloor, setParentFloor] = useState('');
    const [parentApartment, setParentApartment] = useState('');
    // CI părinte:
    const [parentIdSeries, setParentIdSeries] = useState('');
    const [parentIdNumber, setParentIdNumber] = useState('');

    // === Pas curent ===
    const [step, setStep] = useState(1);

    // Determinăm dacă persoana este minor (se compară anul curent cu anul din data nașterii)
    const isMinor =
        birthDate &&
        new Date().getFullYear() - new Date(birthDate).getFullYear() < 18;

    // Funcție de validare pentru pasul curent
    const validateStep = () => {
        if (step === 1) {
            if (!lastName || !firstName || !birthDate || !email || !phone || !event) {
                alert('Te rugăm să completezi toate câmpurile obligatorii din Date personale.');
                return false;
            }
        } else if (step === 2) {
            if (!street || !number || !locality || !county) {
                alert('Te rugăm să completezi toate câmpurile obligatorii din Adresă.');
                return false;
            }
        } else if (step === 3) {
            if (!cnp || !idSeries || !idNumber || !issuedBy || !issuedDate) {
                alert('Te rugăm să completezi toate câmpurile obligatorii din Datele din buletin.');
                return false;
            }
        } else if (step === 4 && isMinor) {
            // În cazul pasului pentru minori: Date părinte
            if (
                !parentLastName ||
                !parentFirstName ||
                !parentStreet ||
                !parentNumber ||
                !parentLocality ||
                !parentCounty ||
                !parentIdSeries ||
                !parentIdNumber
            ) {
                alert('Te rugăm să completezi toate câmpurile obligatorii din Datele părintelui.');
                return false;
            }
        }
        return true;
    };

    const nextStep = () => {
        if (!validateStep()) return;
        setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    // Funcție ce simulează un call API la final
    const handleGenerate = () => {
        // Datele pot fi colectate și trimise la API
        const formData = {
            personal: { lastName, firstName, birthDate, email, phone, event },
            address: { street, number, block, staircase, floor, apartment, locality, county },
            document: { cnp, idSeries, idNumber, issuedBy, issuedDate },
            parent: isMinor
                ? {
                    parentLastName,
                    parentFirstName,
                    parentAddress: {
                        street: parentStreet,
                        number: parentNumber,
                        block: parentBlock,
                        staircase: parentStaircase,
                        floor: parentFloor,
                        apartment: parentApartment,
                        locality: parentLocality,
                        county: parentCounty,
                    },
                    parentCI: { parentIdSeries, parentIdNumber },
                }
                : null,
        };
        console.log('Apel API cu datele: ', formData);
        alert('Contractul a fost generat și trimis pe mail.');
        // Aici se poate face un fetch/post la API
    };

    return (
        <div>
            {/* Header cu logo centrat */}
            <header className="flex justify-center py-4">
                <img src="/logo.png" alt="Logo" className="h-12" />
            </header>

            <div className="max-w-4xl mx-auto py-8 px-4">
                {step === 1 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Date personale</h2>
                        <div className="flex flex-col gap-4">
                            {/* Rând: Nume, Prenume, Data nașterii */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Nume"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Prenume"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="date"
                                    placeholder="Data nașterii"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            {/* Rând: Email, Telefon */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Telefon"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            {/* Evenimente */}
                            <p className="text-sm font-bold text-gray-600">Selectează evenimentul la care participi:</p>
                            <div className="flex flex-wrap gap-2">
                                {events.map((ev) => (
                                    <button
                                        key={ev}
                                        type="button"
                                        onClick={() => setEvent(ev)}
                                        className={`py-2 px-4 text-sm font-bold border border-gray-300 rounded-lg cursor-pointer transition duration-300 ${
                                            event === ev
                                                ? 'bg-white text-indigo-700 border-2 border-indigo-700'
                                                : 'hover:bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {ev}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={nextStep}
                                className="bg-custom-blue text-white py-3 px-8 rounded text-lg"
                            >
                                Pasul următor
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Adresă</h2>
                        <div className="flex flex-col gap-4">
                            {/* Rând: Stradă și Număr */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Stradă"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    className="flex-2 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Număr"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            {/* Rând: Câmpuri opționale: Bloc, Scara, Etaj, Apartament */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Bloc (opțional)"
                                    value={block}
                                    onChange={(e) => setBlock(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Scara (opțional)"
                                    value={staircase}
                                    onChange={(e) => setStaircase(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Etaj (opțional)"
                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Apartament (opțional)"
                                    value={apartment}
                                    onChange={(e) => setApartment(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                            </div>
                            {/* Rând: Localitate și Județ */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Localitate"
                                    value={locality}
                                    onChange={(e) => setLocality(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Județ"
                                    value={county}
                                    onChange={(e) => setCounty(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black py-3 px-6 rounded text-lg"
                            >
                                Înapoi
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-custom-blue text-white py-3 px-6 rounded text-lg"
                            >
                                Pasul următor
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Date din buletin</h2>
                        <div className="flex flex-col gap-4">
                            {/* Rând 1: CNP */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="CNP"
                                    value={cnp}
                                    onChange={(e) => setCnp(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            {/* Rând 2: Serie CI, Număr CI, Eliberat de, Data eliberării */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Serie CI"
                                    value={idSeries}
                                    onChange={(e) => setIdSeries(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Număr CI"
                                    value={idNumber}
                                    onChange={(e) => setIdNumber(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Eliberat de"
                                    value={issuedBy}
                                    onChange={(e) => setIssuedBy(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="date"
                                    placeholder="Data eliberării"
                                    value={issuedDate}
                                    onChange={(e) => setIssuedDate(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black py-3 px-6 rounded text-lg"
                            >
                                Înapoi
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-custom-blue text-white py-3 px-6 rounded text-lg"
                            >
                                Pasul următor
                            </button>
                        </div>
                    </div>
                )}

                {/* Dacă este minor, pasul 4 reprezintă Datele părintelui */}
                {step === 4 && isMinor && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Date părinte</h2>
                        <div className="flex flex-col gap-4">
                            {/* Rând: Nume și Prenume părinte */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Nume părinte"
                                    value={parentLastName}
                                    onChange={(e) => setParentLastName(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Prenume părinte"
                                    value={parentFirstName}
                                    onChange={(e) => setParentFirstName(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            {/* Rând: Adresa părinte */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Stradă"
                                    value={parentStreet}
                                    onChange={(e) => setParentStreet(e.target.value)}
                                    className="flex-2 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Număr"
                                    value={parentNumber}
                                    onChange={(e) => setParentNumber(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Localitate"
                                    value={parentLocality}
                                    onChange={(e) => setParentLocality(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Județ"
                                    value={parentCounty}
                                    onChange={(e) => setParentCounty(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            {/* Rând: Câmpuri opționale pentru adresa părintelui */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Bloc (opțional)"
                                    value={parentBlock}
                                    onChange={(e) => setParentBlock(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Scara (opțional)"
                                    value={parentStaircase}
                                    onChange={(e) => setParentStaircase(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Etaj (opțional)"
                                    value={parentFloor}
                                    onChange={(e) => setParentFloor(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Apartament (opțional)"
                                    value={parentApartment}
                                    onChange={(e) => setParentApartment(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                />
                            </div>
                            {/* Rând: CI părinte */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <input
                                    type="text"
                                    placeholder="Serie CI părinte"
                                    value={parentIdSeries}
                                    onChange={(e) => setParentIdSeries(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Număr CI părinte"
                                    value={parentIdNumber}
                                    onChange={(e) => setParentIdNumber(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black py-3 px-6 rounded text-lg"
                            >
                                Înapoi
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-custom-blue text-white py-3 px-6 rounded text-lg"
                            >
                                Pasul următor
                            </button>
                        </div>
                    </div>
                )}

                {/* Pas final: GDPR și instrucțiuni */}
                {((step === 4 && !isMinor) || (step === 5 && isMinor)) && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">GDPR și Instrucțiuni</h2>
                        <div className="bg-gray-100 p-4 rounded mb-8">
                            <p className="text-gray-700">
                                Prin generarea contractului, accepți politica GDPR și instructiunile privind protecția datelor.
                            </p>
                            <p className="mt-2 text-gray-700">
                                Contractul va fi generat și trimis pe adresa de email furnizată.
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-black py-3 px-6 rounded text-lg"
                            >
                                Înapoi
                            </button>
                            <button
                                onClick={handleGenerate}
                                className="bg-custom-blue text-white py-3 px-6 rounded text-lg"
                            >
                                Generare
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormularContractVoluntariat;
