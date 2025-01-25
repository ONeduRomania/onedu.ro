"use client";
import React, {useState, ChangeEvent} from 'react';
import {FaCreditCard, FaUniversity} from 'react-icons/fa';
import PaymentModal from './donationModal/PaymentModal';
import TransferModal from './donationModal/TransferModal';

export function DonationForm() {
    const [amount, setAmount] = useState(100);
    const [frequency, setFrequency] = useState('lunar');
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [error, setError] = useState('');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = '#16366d';
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = '#d3d3d3';
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setAmount(value);
        if (value < 10) {
            setError('Suma minimă pentru donație este de 10 lei.');
        } else {
            setError('');
        }
    };

    const handleDonationClick = () => {
        if (amount < 10) {
            setError('Suma minimă pentru donație este de 10 lei.');
            return;
        }

        if (paymentMethod === 'Card') {
            setIsPaymentModalOpen(true);
        } else if (paymentMethod === 'Transfer') {
            setIsTransferModalOpen(true);
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                        Suma donată (minim 10lei)
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            className="flex-1 p-2 border rounded-lg font-bold text-lg focus:outline-none focus:border-blue-800 border-gray-300"
                            min="10"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <span className="absolute right-3 text-gray-500">RON</span>
                    </div>
                    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                        Frecvența donației
                    </label>
                    <div className="flex gap-2">
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border transition hover:border-custom-blue ${
                                frequency === 'lunar'
                                    ? 'bg-white text-black border-custom-blue'
                                    : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setFrequency('lunar')}
                        >
                            <strong>lunar</strong>
                        </button>
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border transition hover:border-custom-blue ${
                                frequency === 'o singura data'
                                    ? 'bg-white text-black border-custom-blue'
                                    : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setFrequency('o singura data')}
                        >
                            <strong>o singura dată</strong>
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                        Modalitate donație
                    </label>
                    <div className="flex gap-2">
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border flex items-center justify-center transition hover:border-custom-blue${
                                paymentMethod === 'Card'
                                    ? 'bg-white text-black border-custom-blue'
                                    : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setPaymentMethod('Card')}
                        >
                            <FaCreditCard className="mr-2"/> Card
                        </button>
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border flex items-center justify-center transition hover:border-custom-blue ${
                                paymentMethod === 'Transfer'
                                    ? 'bg-white text-black border-custom-blue'
                                    : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setPaymentMethod('Transfer')}
                        >
                            <FaUniversity className="mr-2"/> Transfer
                        </button>
                    </div>
                </div>

                <button
                    className="w-full p-3 bg-custom-blue text-white font-bold rounded-lg mt-2 hover:bg-custom-blue-dark transition"
                    onClick={handleDonationClick}
                >
                    Donează online
                </button>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                amount={amount}
                frequency={frequency === 'lunar' ? 'Lunar' : 'OneTime'}
            />

            <TransferModal
                isOpen={isTransferModalOpen}
                onClose={() => setIsTransferModalOpen(false)}
                amount={amount}
            />
        </>
    );
}

export default DonationForm;