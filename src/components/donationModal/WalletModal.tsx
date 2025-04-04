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
        if (isOpen) {
            setIsSubscribed(true);
        }
    }, [isOpen]);

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
                            Plățile prin portofel digital sunt procesate prin MobilPay - Netopia Payments.
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
                                <label className="block text-sm font-bold mb-2">Telefon (opțional)</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-custom-blue border-gray-300"
                                />
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