'use client';

import React, {useState, useEffect, useRef} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {Navbar} from "@/components";
import {Footer} from "@/components";
import judeteData from '@/data/judete.json';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

interface Localitate {
    nume: string;
    simplu?: string;
}

interface Judet {
    auto: string;
    nume: string;
    localitati: Localitate[];
}

const Formular230Page: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('2');
    const [selectedCounty, setSelectedCounty] = useState<string>('');
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedSignature, setSelectedSignature] = useState<string>('suggested');
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [isDataAgreed, setIsDataAgreed] = useState<boolean | null>(null);

    const [lastName, setLastName] = useState<string>('');
    const [initialaTatalui, setInitialaTatalui] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [cnp, setCnp] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [block, setBlock] = useState<string>('');
    const [staircase, setStaircase] = useState<string>('');
    const [floor, setFloor] = useState<string>('');
    const [apartment, setApartment] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();

    const judete: Judet[] = (judeteData as { judete: Judet[] }).judete;

    useEffect(() => {
        if (selectedCounty) {
            const judet = judete.find((j) => j.nume === selectedCounty);
            if (judet) {
                const sortedCities = judet.localitati
                    .map((loc) => loc.nume)
                    .sort((a, b) => a.localeCompare(b));
                setCities(sortedCities);
            } else {
                setCities([]);
            }
            setSelectedCity('');
        } else {
            setCities([]);
        }
    }, [selectedCounty, judete]);

    const clearSignature = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        router.push('/');
    };

    const validateForm = (): boolean => {
        if (!lastName.trim() || !firstName.trim() || !initialaTatalui.trim()) {
            setErrorMessage('Nume, prenume și inițiala tatălui sunt obligatorii.');
            return false;
        }
        if (initialaTatalui.length !== 1) {
            setErrorMessage('Inițiala tatălui trebuie să fie o singură literă.');
            return false;
        }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage('Adresa de email nu este validă.');
            return false;
        }
        if (!cnp.match(/^\d{13}$/)) {
            setErrorMessage('CNP-ul trebuie să conțină exact 13 cifre.');
            return false;
        }
        if (phone && !/^(\+4)?07[0-9]{8}$/.test(phone)) {
            setErrorMessage('Numărul de telefon trebuie să fie valid (ex. 07XXXXXXXX sau +407XXXXXXXX).');
            return false;
        }
        if (!street.trim() || !number.trim()) {
            setErrorMessage('Strada și numărul sunt obligatorii.');
            return false;
        }
        if (!selectedCounty || !selectedCity) {
            setErrorMessage('Județul și orașul sunt obligatorii.');
            return false;
        }
        if (isDataAgreed === null) {
            setErrorMessage('Te rugăm să alegi dacă ești de acord sau nu cu comunicarea datelor către entitatea beneficiară.');
            return false;
        }
        if (!isAgreed) {
            setErrorMessage('Trebuie să accepți termenii și politica de confidențialitate.');
            return false;
        }

        setErrorMessage('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        let signatureBlob = null;

        if (selectedSignature === 'manual' && sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const signatureDataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
            const response = await fetch(signatureDataUrl);
            signatureBlob = await response.blob();
        }


        const formData = new FormData();
        formData.append("nume", lastName);
        formData.append("prenume", firstName);
        formData.append("initiala_tatalui", initialaTatalui);
        formData.append("cnp", cnp);
        formData.append("email", email);
        formData.append("telefon", phone);
        formData.append("strada", street);
        formData.append("numarul", number);
        formData.append("bloc", block);
        formData.append("scara", staircase);
        formData.append("etaj", floor);
        formData.append("apartament", apartment);
        formData.append("judet", selectedCounty);
        formData.append("oras", selectedCity);
        formData.append("perioada_redirectionare", selectedPeriod);
        formData.append("selectedSignature", selectedSignature);
        formData.append("isAgreed", isAgreed.toString());
        formData.append("isSubscribed", isSubscribed.toString());
        formData.append("isDataAgreed", isDataAgreed !== null ? isDataAgreed.toString() : '');
        if (signatureBlob) {
            formData.append("signature", signatureBlob, "signature.png");
        } else {
            formData.append("semnaturaText", `${firstName} ${lastName}`);
        }


        try {
            const response = await fetch(`${process.env.BASE_API_URL}api/formulare230/submit`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                await response.json();
                openModal();
                resetForm();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'A apărut o eroare la trimiterea formularului.');
            }
        } catch (error) {
            setErrorMessage('A apărut o eroare la trimiterea formularului.');
        } finally {
            setLoading(false);
        }
    };


    const resetForm = () => {
        setSelectedPeriod('2');
        setSelectedCounty('');
        setCities([]);
        setSelectedCity('');
        setSelectedSignature('suggested');
        setIsDrawing(false);
        clearSignature();
        setLastName('');
        setInitialaTatalui('');
        setFirstName('');
        setEmail('');
        setPhone('');
        setCnp('');
        setStreet('');
        setNumber('');
        setBlock('');
        setStaircase('');
        setFloor('');
        setApartment('');
        setIsAgreed(false);
        setIsSubscribed(false);
        setIsDataAgreed(null);
    };

    return (
        <>
            <Navbar/>
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Redirecționează 3,5%
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                        Completează formularul de mai jos cu datele tale personale și semnează-l până la{' '}
                        <strong className="text-custom-blue">25 mai 2026</strong>.
                    </p>
                </header>

                {successMessage && (
                    <div className="mb-6 p-4 text-green-800 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{successMessage}</span>
                        </div>
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-6 p-4 text-red-800 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{errorMessage}</span>
                        </div>
                    </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <p className="text-base font-semibold text-gray-800 mb-4">
                            Pentru ce perioadă dorești să redirecționezi? <span className="text-red-500 ml-1">*</span>
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                className={`py-3 px-6 text-sm font-semibold border-2 rounded-lg cursor-pointer transition-all duration-300 shadow-sm ${
                                    selectedPeriod === '1'
                                        ? 'bg-custom-blue text-white border-custom-blue shadow-md'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                                }`}
                                onClick={() => setSelectedPeriod('1')}
                            >
                                1 an
                            </button>
                            <button
                                type="button"
                                className={`py-3 px-6 text-sm font-semibold border-2 rounded-lg cursor-pointer transition-all duration-300 shadow-sm ${
                                    selectedPeriod === '2'
                                        ? 'bg-custom-blue text-white border-custom-blue shadow-md'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                                }`}
                                onClick={() => setSelectedPeriod('2')}
                            >
                                2 ani
                            </button>
                        </div>
                    </div>

                    {/* DATE PERSONALE */}
                    <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-custom-blue-light">
                            Date personale
                        </h2>

                        <div className="flex flex-wrap gap-4">
                            {/* Nume de familie */}
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="lastName" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Nume de familie <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    // pattern permite doar litere (românești), spații și câteva semne uzuale
                                    pattern="^[A-Za-zĂÂÎȘȚăâîșț \.'-]+$"
                                    title="Te rugăm să introduci doar litere și caractere uzuale ( -, ', . )."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>

                            {/* Inițiala tatălui */}
                            <div className="flex-none min-w-[150px] mb-4">
                                <label
                                    htmlFor="initiala_tatalui"
                                    className="text-sm font-bold text-gray-600 mb-1 block"
                                >
                                    Inițiala tatălui <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    id="initiala_tatalui"
                                    type="text"
                                    required
                                    maxLength={1}
                                    value={initialaTatalui}
                                    onChange={(e) => setInitialaTatalui(e.target.value)}
                                    pattern="^[A-Za-zĂÂÎȘȚăâîșț]$"
                                    title="Te rugăm să introduci o singură literă."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg
                                               focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue
                                               transition-all duration-200 shadow-sm hover:border-gray-400 text-center"
                                />
                            </div>

                            {/* Prenume */}
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="firstName" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Prenume <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    pattern="^[A-Za-zĂÂÎȘȚăâîșț \.'-]+$"
                                    title="Te rugăm să introduci doar litere și caractere uzuale ( -, ', . )."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {/* Email */}
                            <div className="flex-1 min-w-[200px] mb-4">
                                <label htmlFor="email" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Email <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    // HTML5 deja validează formatul email
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                            {/* Telefon (opțional) */}
                            <div className="flex-1 min-w-[200px] mb-4">
                                <label htmlFor="phone" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Telefon (opțional)
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    pattern="^\+?[0-9\s\-\(\)]{7,}$"
                                    title="Număr de telefon valid (minim 7 cifre). Ex: +40712345678"
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                        </div>

                        {/* CNP */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col mb-4 w-full">
                                <label htmlFor="cnp" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Cod Numeric Personal (CNP) <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    id="cnp"
                                    type="text"
                                    required
                                    value={cnp}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ''); // Permite doar cifre
                                        if (value.length <= 13) setCnp(value);
                                    }}
                                    pattern="\d{13}"
                                    maxLength={13}
                                    title="CNP-ul trebuie să conțină exact 13 cifre."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />

                            </div>
                        </div>
                    </section>

                    {/* ADRESĂ DE DOMICILIU */}
                    <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-custom-blue-light">
                            Adresă de domiciliu
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="street" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Stradă <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    id="street"
                                    type="text"
                                    required
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    pattern="^[A-Za-zĂÂÎȘȚăâîșț0-9\.\,\-\s]+$"
                                    title="Introdu doar litere, cifre și caractere uzuale (., -)."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="number" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Număr <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    id="number"
                                    type="text"
                                    required
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    pattern="^[0-9A-Za-z\/-]+$"
                                    title="Poți folosi cifre și caractere uzuale (/, -)."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="block" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Bloc
                                </label>
                                <input
                                    id="block"
                                    type="text"
                                    value={block}
                                    onChange={(e) => setBlock(e.target.value)}
                                    pattern="^[0-9A-Za-z]+$"
                                    title="Doar cifre și/sau litere. Poți lăsa gol dacă nu se aplică."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="staircase" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Scară
                                </label>
                                <input
                                    id="staircase"
                                    type="text"
                                    value={staircase}
                                    onChange={(e) => setStaircase(e.target.value)}
                                    pattern="^[0-9A-Za-z]+$"
                                    title="Doar cifre și/sau litere. Poți lăsa gol dacă nu se aplică."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="floor" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Etaj
                                </label>
                                <input
                                    id="floor"
                                    type="text"
                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                    pattern="^[0-9A-Za-z]+$"
                                    title="Doar cifre și/sau litere. Poți lăsa gol dacă nu se aplică."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="apartment" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Ap.
                                </label>
                                <input
                                    id="apartment"
                                    type="text"
                                    value={apartment}
                                    onChange={(e) => setApartment(e.target.value)}
                                    pattern="^[0-9A-Za-z]+$"
                                    title="Doar cifre și/sau litere. Poți lăsa gol dacă nu se aplică."
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="county" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Județ <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <select
                                    id="county"
                                    value={selectedCounty}
                                    onChange={(e) => setSelectedCounty(e.target.value)}
                                    required
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue transition-all duration-200 shadow-sm hover:border-gray-400 bg-white"
                                >
                                    <option value="">Alege județ...</option>
                                    {judete.map((judet) => (
                                        <option key={judet.auto} value={judet.nume}>
                                            {judet.nume}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 min-w-[120px] mb-4">
                                <label htmlFor="city" className="text-sm font-bold text-gray-600 mb-1 block">
                                    Oraș <span className="text-red-500 ml-1 text-sm">*</span>
                                </label>
                                <select
                                    id="city"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    required
                                    disabled={!cities.length}
                                    className="w-full p-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition-all duration-200 shadow-sm hover:border-gray-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">Alege oraș...</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* SEMNĂTURĂ */}
                    <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-custom-blue-light">
                            Semnătură
                        </h2>
                        <p className="text-sm font-medium text-gray-600 mb-4">Alege cum dorești să semnezi:</p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                className={`py-3 px-5 text-sm font-semibold border-2 rounded-lg cursor-pointer transition-all duration-300 shadow-sm ${
                                    selectedSignature === 'suggested'
                                        ? 'bg-custom-blue text-white border-custom-blue shadow-md'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                                }`}
                                onClick={() => {
                                    setSelectedSignature('suggested');
                                    setIsDrawing(false);
                                }}
                            >
                                Semnez utilizând sugestia (numele și prenumele meu)
                            </button>
                            <button
                                type="button"
                                className={`py-3 px-5 text-sm font-semibold border-2 rounded-lg cursor-pointer transition-all duration-300 shadow-sm ${
                                    selectedSignature === 'manual'
                                        ? 'bg-custom-blue text-white border-custom-blue shadow-md'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                                }`}
                                onClick={() => {
                                    setSelectedSignature('manual');
                                    setIsDrawing(true);
                                }}
                            >
                                Doresc să semnez folosind mouse-ul sau degetul
                            </button>
                        </div>

                        {isDrawing && (
                            <div className="mt-6 p-6 border-2 border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center gap-4 shadow-inner">
                                <SignatureCanvas
                                    ref={sigCanvas}
                                    penColor="black"
                                    canvasProps={{
                                        width: 500,
                                        height: 200,
                                        className: "border-2 border-gray-300 rounded-lg bg-white w-full max-w-xs shadow-sm",
                                    }}
                                />
                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-2.5 px-6 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-600 shadow-md hover:shadow-lg"
                                    onClick={clearSignature}
                                >
                                    Șterge semnătura
                                </button>
                            </div>
                        )}
                    </section>

                    {/* ACORDURI */}
                    <section className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                        <div className="space-y-5">
                            {/* Notificare ANAF */}
                            <div className="p-5 bg-amber-50 border-l-4 border-amber-400 rounded-lg shadow-sm">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-gray-800 leading-relaxed">
                                        În urma noilor reglementări, ANAF poate informa Asociația ONedu cu privire la sumele redirecționate de fiecare persoană fizică. Dacă ne oferi acordul tău, vom putea adăuga această contribuție în contul tău de donator și îți vom mulțumi personal pentru implicare.
                                    </p>
                                </div>
                            </div>

                            {/* Acord comunicare date */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <label className="text-sm font-semibold text-gray-800 block">
                                    Sunt de acord ca datele de identificare (nume, prenume și cod numeric personal/număr de identificare fiscală), precum și suma direcționată să fie comunicate entității beneficiare.
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="dataAgreement"
                                            checked={isDataAgreed === true}
                                            onChange={() => setIsDataAgreed(true)}
                                            className="h-5 w-5 text-custom-blue border-gray-300 focus:ring-2 focus:ring-custom-blue cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Sunt de acord</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="dataAgreement"
                                            checked={isDataAgreed === false}
                                            onChange={() => setIsDataAgreed(false)}
                                            className="h-5 w-5 text-custom-blue border-gray-300 focus:ring-2 focus:ring-custom-blue cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Nu sunt de acord</span>
                                    </label>
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    checked={isSubscribed}
                                    onChange={(e) => setIsSubscribed(e.target.checked)}
                                    className="h-5 w-5 text-custom-blue border-gray-300 rounded focus:ring-2 focus:ring-custom-blue mt-0.5 cursor-pointer"
                                />
                                <label htmlFor="newsletter" className="text-sm text-gray-700 cursor-pointer flex-1">
                                    Da, îmi pasă și doresc să primesc vești pe email despre proiectele Asociației ONedu.
                                </label>
                            </div>

                            {/* Termeni și Politică */}
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-custom-blue transition-colors">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                    className="h-5 w-5 text-custom-blue border-gray-300 rounded focus:ring-2 focus:ring-custom-blue mt-0.5 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer flex-1">
                                    Sunt de acord cu{' '}
                                    <Link href="/terms" target="_blank" rel="noopener noreferrer"
                                          className="text-custom-blue underline hover:text-custom-blue-dark font-medium">
                                        Termenii
                                    </Link>{' '}
                                    și{' '}
                                    <Link href="/privacy" target="_blank" rel="noopener noreferrer"
                                          className="text-custom-blue underline hover:text-custom-blue-dark font-medium">
                                        Politica de Confidențialitate
                                    </Link>
                                    <span className="text-red-500 ml-1 font-bold">*</span>
                                </label>
                            </div>
                        </div>
                    </section>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-custom-blue text-white py-4 px-8 text-lg font-bold border-none rounded-xl cursor-pointer text-center w-full shadow-lg hover:shadow-xl hover:bg-custom-blue-dark transition-all duration-300 transform hover:-translate-y-0.5 ${
                            loading ? 'opacity-50 cursor-not-allowed transform-none' : ''
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Trimite...
                            </span>
                        ) : (
                            'Trimite Formularul'
                        )}
                    </button>
                </form>


                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center transform transition-all">
                            <div className="mb-6">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                    <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                    Formularul a fost semnat cu succes!
                                </h2>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Îți mulțumim pentru generozitatea ta. Ți-am trimis o copie a formularului pe email-ul
                                    comunicat de tine, alături de certificatul tău de donator pentru educație.
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="bg-custom-blue text-white px-8 py-3 text-lg font-semibold rounded-xl hover:bg-custom-blue-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
                            >
                                Am înțeles
                            </button>
                        </div>
                    </div>
                )}

            </div>
            <Footer/>
        </>
    );
};

export default Formular230Page;
