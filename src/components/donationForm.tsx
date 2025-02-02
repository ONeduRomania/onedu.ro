"use client";
import React, {useState, ChangeEvent, useEffect} from 'react';
import {FaCreditCard, FaFileInvoice, FaUniversity, FaWallet} from 'react-icons/fa';
import SmartPayModal from './donationModal/SmartPayModal';
import TransferModal from './donationModal/TransferModal';
import CardModal from "@/components/donationModal/CardModal";
import WalletModal from "@/components/donationModal/WalletModal";

export function DonationForm() {
    const [amount, setAmount] = useState(100);
    const [frequency, setFrequency] = useState('lunar');
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [error, setError] = useState('');
    const [isSmartPayModal, setIsSmartPayModal] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isCardModal, setIsCardModal] = useState(false);
    const [isWalletModal, setIsWalletModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

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

        if (paymentMethod === 'Transfer bancar') {
            setIsSmartPayModal(true);
        } else if (paymentMethod === 'Date bancare') {
            setIsTransferModalOpen(true);
        } else if (paymentMethod === 'Card') {
            setIsCardModal(true);
        } else if (paymentMethod === 'Wallet') {
            setIsWalletModal(true);
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
                                frequency === 'lunar' ? 'bg-white text-black border-custom-blue' : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setFrequency('lunar')}
                        >
                            <strong>lunar</strong>
                        </button>
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border transition hover:border-custom-blue ${
                                frequency === 'o singura data' ? 'bg-white text-black border-custom-blue' : 'bg-gray-100 text-gray-600 border-gray-300'
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
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border flex flex-col items-center justify-center transition hover:border-custom-blue ${
                                paymentMethod === 'Card' ? 'bg-white text-black border-custom-blue' : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setPaymentMethod('Card')}
                        >
                            <FaCreditCard className="mb-1"/> Card
                        </button>
                        {isMobile && (
                            <button
                                className={`flex-1 p-2 text-sm rounded-lg border flex flex-col items-center justify-center transition hover:border-custom-blue ${
                                    paymentMethod === 'Wallet' ? 'bg-white text-black border-custom-blue' : 'bg-gray-100 text-gray-600 border-gray-300'
                                }`}
                                onClick={() => setPaymentMethod('Wallet')}
                            >
                                <FaWallet
                                    className="mb-1"/> {navigator.userAgent.includes('iPhone') ? 'Apple Pay' : 'Google Pay'}
                            </button>
                        )}
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border flex flex-col items-center justify-center transition hover:border-custom-blue ${
                                paymentMethod === 'Transfer bancar' ? 'bg-white text-black border-custom-blue' : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setPaymentMethod('Transfer bancar')}
                        >
                            <FaUniversity className="mb-1"/> Transfer bancar
                        </button>
                        <button
                            className={`flex-1 p-2 text-sm rounded-lg border flex flex-col items-center justify-center transition hover:border-custom-blue ${
                                paymentMethod === 'Date bancare' ? 'bg-white text-black border-custom-blue' : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                            onClick={() => setPaymentMethod('Date bancare')}
                        >
                            <FaFileInvoice className="mb-1"/> Date bancare
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

            <SmartPayModal
                isOpen={isSmartPayModal}
                onClose={() => setIsSmartPayModal(false)}
                amount={amount}
                frequency={frequency === 'lunar' ? 'Lunar' : 'OneTime'}
            />

            <CardModal
                isOpen={isCardModal}
                onClose={() => setIsCardModal(false)}
                amount={amount}
                frequency={frequency === 'lunar' ? 'Lunar' : 'OneTime'}
            />

            <WalletModal
                isOpen={isWalletModal}
                onClose={() => setIsWalletModal(false)}
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