import React, { useState, useEffect } from 'react';
import {submitDonation} from "@/api/Donation";

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
    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; phone?: string }>({});


    useEffect(() => {
        if (isOpen) {
            setIsSubscribed(true);
        }
    }, [isOpen]);

    const validateForm = () => {
        const newErrors: { firstName?: string; lastName?: string; email?: string; phone?: string } = {};

        if (!firstName.trim()) {
            newErrors.firstName = "Prenumele este obligatoriu.";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Numele este obligatoriu.";
        }

        if (!email.trim()) {
            newErrors.email = "Email-ul este obligatoriu.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email-ul nu este valid.";
        }

        if (!phone.trim()) {
            newErrors.phone = "Numărul de telefon este obligatoriu.";
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = "Numărul de telefon trebuie să conțină 10 cifre.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const redirectToMobilPay = (redirectUri: string, envKey: string, data: string) => {
        console.log("📌 Pregătire redirecționare către MobilPay...");
        console.log("🔹 URL:", redirectUri);
        console.log("🔹 env_key:", envKey);
        console.log("🔹 data:", data);

        if (!redirectUri || !envKey || !data) {
            console.error("Datele necesare pentru redirecționare lipsesc!");
            alert("Datele pentru MobilPay nu sunt valide.");
            return;
        }

        const form = document.createElement("form");
        form.method = "POST";
        form.action = redirectUri;

        const envKeyInput = document.createElement("input");
        envKeyInput.type = "hidden";
        envKeyInput.name = "env_key";
        envKeyInput.value = envKey;
        form.appendChild(envKeyInput);

        const dataInput = document.createElement("input");
        dataInput.type = "hidden";
        dataInput.name = "data";
        dataInput.value = data;
        form.appendChild(dataInput);

        document.body.appendChild(form);
        form.submit();
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await submitDonation(firstName, lastName, email, phone, amount, frequency, isSubscribed, 'netopia', '');

            if (response.redirectUri && response.env_key && response.data) {
                redirectToMobilPay(response.redirectUri, response.env_key, response.data);
            } else {
                alert('Link-ul de redirecționare nu a fost găsit sau datele sunt incomplete.');
            }
        } catch (error) {
            console.error("Eroare la trimiterea donației:", error);
            alert('A apărut o eroare la trimiterea donației.');
        }
    };



    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center md:items-center items-end 
              z-[99999999] transition-opacity duration-300 
              ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={handleOverlayClick}
        >
            <div
                className={`bg-white p-4 md:p-8 rounded-t-xl md:rounded-xl w-full max-w-md md:max-w-3xl 
                  shadow-lg relative flex flex-col 
                  transition-transform duration-300 transform 
                  ${isOpen ? 'translate-y-0' : 'translate-y-full'} 
                  pointer-events-auto`}
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-4 right-4 text-2xl bg-none border-none cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <div className="flex-1 bg-custom-blue-light p-4 rounded-xl">
                        <h3 className="text-lg font-semibold">Donația ta</h3>
                        <p className="text-base">
                            Donație: {amount} RON{frequency === 'Lunar' ? ' / lună' : ''}
                        </p>
                        <small className="text-sm text-gray-600">
                            Plățile cu cardul sunt procesate prin MobilPay - Netopia Payments.
                        </small>
                    </div>
                    <div className="flex-2">
                        <h3 className="text-lg font-semibold">Detalii donație</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-4 flex-wrap mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Prenume</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-800 border-gray-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Nume</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Telefon</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    id="subscribe"
                                    checked={isSubscribed}
                                    onChange={() => setIsSubscribed(!isSubscribed)}
                                    className="w-5 h-5 border-gray-500 focus:ring-custom-blue"
                                />
                                <label htmlFor="subscribe" className="text-sm">
                                    Da, îmi pasă și doresc să primesc vești pe email despre proiectele Asociației ONedu.
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
