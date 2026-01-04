import React, { useState, useEffect } from 'react';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    frequency: string;
}

export function WalletModal({ isOpen, onClose, amount, frequency }: WalletModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

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

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Formular trimis');

        const payload = {
            nume: lastName,
            prenume: firstName,
            email,
            telefon: phone,
            suma: amount,
            frecventa: frequency,
            newsletter: isSubscribed,
        };

        try {
            const response = await fetch('http://localhost:5000/api/donations/wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Eroare API:', errorText);
                alert('Eroare la trimiterea cererii.');
            } else {
                const data = await response.json();
                const redirectUri = data.redirectUri;
                if (redirectUri) {
                    window.location.href = redirectUri;
                } else {
                    alert('Link-ul de redirecționare nu a fost găsit.');
                }
            }
        } catch (error) {
            console.error('Eroare la fetch:', error);
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
                    className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 z-10"
                    onClick={onClose}
                    aria-label="Închide"
                >
                    <span className="text-xl leading-none">×</span>
                </button>
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <div className="flex-1 bg-custom-blue-light p-4 rounded-xl border-2 border-gray-300 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Donația ta</h3>
                            <p className="text-base">
                                Donație: {amount} RON{frequency === 'Lunar' ? ' / lună' : ''}
                            </p>
                            <small className="text-sm text-gray-600">
                                Plățile prin portofel digital sunt procesate prin MobilPay - Netopia Payments.
                            </small>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-300">
                            <div className="bg-white p-1 rounded-lg inline-block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://mny.ro/np-black-0.svg?id=142505"
                                    alt="Netopia Payments"
                                    className="h-4 md:h-5 w-auto"
                                />
                            </div>
                        </div>
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
                                        className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-800"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2">Nume</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-custom-blue"
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
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-custom-blue"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Telefon (opțional)</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-custom-blue"
                                />
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="subscribe-wallet"
                                        checked={isSubscribed}
                                        onChange={() => setIsSubscribed(!isSubscribed)}
                                        className="mt-0.5 w-5 h-5 text-custom-blue border-gray-300 rounded focus:ring-2 focus:ring-custom-blue focus:ring-offset-0 bg-white"
                                    />
                                    <span className="text-sm text-gray-800 leading-relaxed">
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

export default WalletModal;