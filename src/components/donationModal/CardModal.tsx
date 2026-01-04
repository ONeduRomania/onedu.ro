import React, { useState, useEffect } from 'react';
import { submitDonation } from "@/api/Donation";

interface CardModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    frequency: string;
}

export function CardModal({ isOpen, onClose, amount, frequency }: CardModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const validateForm = () => {
        if (!firstName || !lastName || !email || !phone) return false;
        return true;
    };

    const handleOverlayClick = () => onClose();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const redirectToMobilPay = (redirectUri: string, envKey: string, data: string) => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = redirectUri;

        const envKeyInput = document.createElement("input");
        envKeyInput.type = "hidden";
        envKeyInput.name = "env_key";
        envKeyInput.value = envKey;

        const dataInput = document.createElement("input");
        dataInput.type = "hidden";
        dataInput.name = "data";
        dataInput.value = data;

        form.appendChild(envKeyInput);
        form.appendChild(dataInput);
        document.body.appendChild(form);
        form.submit();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Completează toate câmpurile obligatorii.");
            return;
        }

        try {
            const response = await submitDonation(
                firstName,
                lastName,
                email,
                phone,
                amount,
                frequency,
                isSubscribed,
                'netopia',
                ''
            );

            if (response.redirectUri && response.env_key && response.data) {
                redirectToMobilPay(response.redirectUri, response.env_key, response.data);
            } else {
                alert("Eroare la inițierea plății.");
            }
        } catch (err) {
            console.error(err);
            alert("A apărut o eroare.");
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
                className={`bg-white p-4 md:p-8 rounded-t-xl md:rounded-xl w-full max-w-md md:max-w-4xl
                shadow-lg relative flex flex-col transition-transform duration-300
                ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
                onClick={handleModalClick}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow
                    flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100"
                >
                    ×
                </button>

                <div className="flex flex-col gap-6 md:flex-row">
                    {/* LEFT COLUMN */}
                    <div className="flex-[2.2] bg-custom-blue-light p-6 rounded-xl border-2 border-gray-300 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Donația ta</h3>
                            <p className="text-base font-medium">
                                Donație: {amount} RON{frequency === 'lunar' ? ' / lună' : ''}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Plățile cu cardul sunt procesate prin MobilPay – Netopia Payments.
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-300">
                            <div className="bg-white p-2 rounded-lg inline-block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://mny.ro/np-black-0.svg?id=142505"
                                    alt="Netopia Payments"
                                    className="h-5 w-auto"
                                />
                            </div>
                        </div>
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
                                        onChange={e => setFirstName(e.target.value)}
                                        className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Nume</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Telefon</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg"
                                />
                            </div>

                            <div className="border rounded-lg p-4 mb-4">
                                <label className="flex gap-3 items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isSubscribed}
                                        onChange={() => setIsSubscribed(!isSubscribed)}
                                        className="mt-1"
                                    />
                                    <span className="text-sm">
                                        Da, îmi pasă și doresc să primesc vești pe email despre proiectele Asociației ONedu.
                                    </span>
                                </label>
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

export default CardModal;
