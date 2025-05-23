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
    const [isAgreed, setIsAgreed] = useState<boolean>(true);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

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
        setIsAgreed(true);
        setIsSubscribed(false);
    };

    return (
        <>
            <Navbar/>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <header className="mb-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-8">Redirecționează 3,5%</h1>
                    <p className="text-base text-gray-600 leading-relaxed mb-6">
                        Completează formularul de mai jos cu datele tale personale și semnează-l până la <strong>25 mai
                        2025</strong>.
                    </p>
                </header>

                {successMessage && (
                    <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
                        {errorMessage}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <p className="text-sm font-bold text-gray-600 mb-2">
                            Pentru ce perioadă dorești să redirecționezi? <span
                            className="text-red-500 ml-1 text-sm">*</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className={`py-2 px-4 text-sm font-bold border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer transition duration-300 ${
                                    selectedPeriod === '1'
                                        ? 'bg-white text-indigo-700 border-2 border-indigo-700'
                                        : 'hover:bg-gray-200 text-gray-800'
                                }`}
                                onClick={() => setSelectedPeriod('1')}
                            >
                                1 an
                            </button>
                            <button
                                type="button"
                                className={`py-2 px-4 text-sm font-bold border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer transition duration-300 ${
                                    selectedPeriod === '2'
                                        ? 'bg-white text-indigo-700 border-2 border-indigo-700'
                                        : 'hover:bg-gray-200 text-gray-800'
                                }`}
                                onClick={() => setSelectedPeriod('2')}
                            >
                                2 ani
                            </button>
                        </div>
                    </div>

                    {/* DATE PERSONALE */}
                    <section className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Date personale</h2>

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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded
                                               focus:outline-none focus:border-indigo-600
                                               transition-colors duration-300 text-center"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
                                />

                            </div>
                        </div>
                    </section>

                    {/* ADRESĂ DE DOMICILIU */}
                    <section className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Adresă de domiciliu</h2>
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300"
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
                                    className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-indigo-600 transition-colors duration-300 disabled:opacity-50"
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
                    <section className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Semnătură</h2>
                        <p className="text-sm font-bold text-gray-600 mb-2">Alege cum dorești să semnezi:</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className={`py-2 px-4 text-sm font-bold border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer transition duration-300 ${
                                    selectedSignature === 'suggested'
                                        ? 'bg-white text-indigo-700 border-2 border-indigo-700'
                                        : 'hover:bg-gray-200 text-gray-800'
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
                                className={`py-2 px-4 text-sm font-bold border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer transition duration-300 ${
                                    selectedSignature === 'manual'
                                        ? 'bg-white text-indigo-700 border-2 border-indigo-700'
                                        : 'hover:bg-gray-200 text-gray-800'
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
                            <div
                                className="mt-4 p-4 border border-gray-300 rounded bg-gray-100 flex flex-col items-center gap-4">
                                <SignatureCanvas
                                    ref={sigCanvas}
                                    penColor="black"
                                    canvasProps={{
                                        width: 500,
                                        height: 200,
                                        className: "border border-gray-300 rounded bg-white w-full max-w-xs",
                                    }}
                                />
                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-2 px-4 text-sm font-bold rounded cursor-pointer transition-colors duration-300 hover:bg-red-600"
                                    onClick={clearSignature}
                                >
                                    Șterge semnătura
                                </button>
                            </div>
                        )}
                    </section>

                    {/* ACORDURI */}
                    <section className="mb-6">
                        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-100">
                            <div className="flex items-center gap-2 text-base">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="flex-1">
                                    Sunt de acord cu{' '}
                                    <Link href="/terms" target="_blank" rel="noopener noreferrer"
                                          className="text-indigo-700 underline">
                                        Termenii
                                    </Link>{' '}
                                    și{' '}
                                    <Link href="/privacy" target="_blank" rel="noopener noreferrer"
                                          className="text-indigo-700 underline">
                                        Politica de Confidențialitate
                                    </Link>
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="mb-6">
                        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-100">
                            <div className="flex items-center gap-2 text-base">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    checked={isSubscribed}
                                    onChange={(e) => setIsSubscribed(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                                <label htmlFor="newsletter" className="flex-1">
                                    Da, îmi pasă și doresc să primesc vești pe email despre proiectele Asociației ONedu.
                                </label>
                            </div>
                        </div>
                    </section>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-custom-blue text-white py-4 px-6 text-lg font-bold border-none rounded-lg cursor-pointer text-center w-full hover:bg-custom-blue-dark transition-colors duration-300 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Trimite...' : 'Trimite Formularul'}
                    </button>
                </form>


                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full text-center">
                            <h2 className="text-2xl font-bold mb-4">Formularul a fost semnat cu succes!</h2>
                            <p className="mb-6 text-lg">
                                Îți mulțumim pentru generozitatea ta. Ți-am trimis o copie a formularului pe email-ul
                                comunicat de tine,
                                alături de certificatul tău de donator pentru educație.
                            </p>
                            <button
                                onClick={closeModal}
                                className="bg-custom-blue text-white px-6 py-3 text-lg font-bold rounded-lg hover:bg-custom-blue-dark transition-colors duration-300"
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
