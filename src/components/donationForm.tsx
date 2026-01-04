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
    const [paymentMethod, setPaymentMethod] = useState('Date bancare');
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

    const handleDonationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (amount < 10) {
            setError('Suma minimă pentru donație este de 10 lei.');
            return;
        }

        // Blocare temporară pentru Card și Transfer bancar
        if (paymentMethod === 'Card' || paymentMethod === 'Transfer bancar') {
            alert('Această modalitate de plată este temporar indisponibilă. Vă rugăm să folosiți "Date bancare".');
            return;
        }

        if (paymentMethod === 'Date bancare') {
            setIsTransferModalOpen(true);
        } else if (paymentMethod === 'Wallet') {
            setIsWalletModal(true);
        }
    };

    return (
        <>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <div className="bg-amber-50 border-l-4 border-amber-400 text-amber-800 px-3 py-2 rounded mb-4 text-xs sm:text-sm" role="alert">
                    <strong className="font-semibold">Notă: </strong>
                    Donațiile sunt momentan disponibile doar prin <strong>ordin de plată</strong>, utilizând datele bancare afișate.
                </div>
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
                            className={`flex-1 p-2.5 text-sm rounded-lg border-2 font-semibold transition-all duration-200 ${
                                frequency === 'lunar' 
                                    ? 'bg-custom-blue text-white border-custom-blue shadow-md' 
                                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                            }`}
                            onClick={() => setFrequency('lunar')}
                        >
                            lunar
                        </button>
                        <button
                            className={`flex-1 p-2.5 text-sm rounded-lg border-2 font-semibold transition-all duration-200 ${
                                frequency === 'o singura data' 
                                    ? 'bg-custom-blue text-white border-custom-blue shadow-md' 
                                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                            }`}
                            onClick={() => setFrequency('o singura data')}
                        >
                            o singură dată
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                        Modalitate donație
                    </label>
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button
                            className={`flex-1 p-2 text-xs rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 min-w-[80px] opacity-50 cursor-not-allowed ${
                                paymentMethod === 'Card' 
                                    ? 'bg-gray-300 text-gray-500 border-gray-300' 
                                    : 'bg-gray-100 text-gray-400 border-gray-200'
                            }`}
                            onClick={() => {}}
                            disabled
                            title="Temporar indisponibil"
                        >
                            <FaCreditCard className="mb-1 text-base"/> 
                            <span className="font-semibold text-xs">Card</span>
                        </button>
                        {isMobile && (
                            <button
                                className={`flex-1 p-2 text-xs rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 min-w-[80px] ${
                                    paymentMethod === 'Wallet' 
                                        ? 'bg-custom-blue text-white border-custom-blue shadow-md' 
                                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                                }`}
                                onClick={() => setPaymentMethod('Wallet')}
                            >
                                <FaWallet className="mb-1 text-base"/> 
                                <span className="font-semibold text-xs">{navigator.userAgent.includes('iPhone') ? 'Apple Pay' : 'Google Pay'}</span>
                            </button>
                        )}
                        <button
                            className={`flex-1 p-2 text-xs rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 min-w-[80px] opacity-50 cursor-not-allowed ${
                                paymentMethod === 'Transfer bancar' 
                                    ? 'bg-gray-300 text-gray-500 border-gray-300' 
                                    : 'bg-gray-100 text-gray-400 border-gray-200'
                            }`}
                            onClick={() => {}}
                            disabled
                            title="Temporar indisponibil"
                        >
                            <FaUniversity className="mb-1 text-base"/> 
                            <span className="font-semibold text-center text-xs">Transfer bancar</span>
                        </button>
                        <button
                            className={`flex-1 p-2 text-xs rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 min-w-[80px] ${
                                paymentMethod === 'Date bancare' 
                                    ? 'bg-custom-blue text-white border-custom-blue shadow-md' 
                                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-custom-blue hover:bg-custom-blue-light'
                            }`}
                            onClick={() => setPaymentMethod('Date bancare')}
                        >
                            <FaFileInvoice className="mb-1 text-base"/> 
                            <span className="font-semibold text-center text-xs">Date bancare</span>
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full p-4 bg-custom-blue text-white font-bold rounded-lg mt-4 hover:bg-custom-blue-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-base cursor-pointer"
                    onClick={handleDonationClick}
                >
                    Donează online
                </button>
            </div>

            <SmartPayModal
                isOpen={isSmartPayModal}
                onClose={() => setIsSmartPayModal(false)}
                amount={amount}
                frequency={frequency === 'lunar' ? 'lunar' : 'one_time'}
            />

            <CardModal
                isOpen={isCardModal}
                onClose={() => setIsCardModal(false)}
                amount={amount}
                frequency={frequency === 'lunar' ? 'lunar' : 'one_time'}
            />

            <WalletModal
                isOpen={isWalletModal}
                onClose={() => setIsWalletModal(false)}
                amount={amount}
                frequency={frequency === 'lunar' ? 'lunar' : 'one_time'}
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