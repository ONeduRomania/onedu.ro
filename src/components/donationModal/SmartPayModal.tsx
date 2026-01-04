import React, { useState, useEffect } from 'react';
import { getSmartPayBanks, submitDonation } from "@/api/Donation";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    frequency: string;
}

export function SmartPayModal({ isOpen, onClose, amount, frequency }: PaymentModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const [banks, setBanks] = useState<{ code: string; name: string }[]>([]);

    useEffect(() => {
        if (isOpen) {
            setIsSubscribed(true);
            getSmartPayBanks()
                .then((data) => setBanks(data))
                .catch(() => alert('Eroare la încărcarea băncilor SmartPay.'));
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = () => onClose();
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

    const validateForm = () => {
        if (!firstName || !lastName || !email || !selectedBank) return false;
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Completează toate câmpurile obligatorii.');
            return;
        }

        try {
            const data = await submitDonation(
                firstName,
                lastName,
                email,
                phone,
                amount,
                frequency,
                isSubscribed,
                'smartpay',
                selectedBank
            );

            if (data.redirectUri) {
                window.location.href = data.redirectUri;
            } else {
                alert('Link-ul de redirecționare nu a fost găsit.');
            }
        } catch (error) {
            console.error(error);
            alert('A apărut o eroare la trimiterea donației.');
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black/50 flex justify-center md:items-center items-end 
            z-[99999999] transition-opacity duration-300 
            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={handleOverlayClick}
        >
            <div
                className={`bg-white p-4 md:p-8 rounded-t-xl md:rounded-xl 
                w-full max-w-md md:max-w-4xl shadow-lg relative flex flex-col
                transition-transform duration-300
                ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
                onClick={handleModalClick}
            >
                {/* Close */}
                <button
                    className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    ×
                </button>

                <div className="flex flex-col gap-6 md:flex-row">
                    {/* LEFT COLUMN */}
                    <div className="flex-[2.2] bg-custom-blue-light p-6 rounded-xl border-2 border-gray-300">
                        <h3 className="text-lg font-semibold mb-2">Donația ta</h3>
                        <p className="text-base font-medium">
                            Donație: {amount} RON{frequency === 'Lunar' ? ' / lună' : ''}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Donațiile sunt procesate prin SmartPay de la SmartFintech.
                        </p>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex-[2.8]">
                        <h3 className="text-lg font-semibold mb-4">Detalii donație</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Prenume</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Nume</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Telefon (opțional)</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Selectează banca</label>
                                <select
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                >
                                    <option value="">Alege o bancă...</option>
                                    {banks.map(bank => (
                                        <option key={bank.code} value={bank.code}>
                                            {bank.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-start gap-3 mb-4">
                                <input
                                    type="checkbox"
                                    checked={isSubscribed}
                                    onChange={() => setIsSubscribed(!isSubscribed)}
                                    className="mt-1"
                                />
                                <span className="text-sm">
                                    Da, îmi pasă și doresc să primesc vești pe email despre proiectele Asociației ONedu.
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-custom-blue text-white p-3 rounded-lg font-bold hover:bg-custom-blue-dark"
                            >
                                Donează acum
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SmartPayModal;
