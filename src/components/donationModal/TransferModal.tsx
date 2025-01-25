import React from 'react';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
}

export function TransferModal({ isOpen, onClose, amount }: TransferModalProps) {
    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center md:items-center items-end z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={handleOverlayClick}
        >
            <div
                className={`bg-white p-4 md:p-8 rounded-t-xl md:rounded-xl w-full max-w-md md:max-w-3xl shadow-lg relative flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} pointer-events-auto`}
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-4 right-4 text-2xl bg-none border-none cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <div className="flex-1">
                        <div className="bg-custom-blue-light p-4 rounded-xl mb-4">
                            <h3 className="text-lg font-semibold">Donația ta</h3>
                            <p className="text-base">
                                Donație: <strong>{amount} RON</strong>
                            </p>
                        </div>
                        <p className="text-sm italic text-gray-600">
                            Menționează emailul tău la detaliile plății pentru ca donația să fie asociată contului tău de donator.
                        </p>
                    </div>
                    <div className="flex-2">
                        <div className="text-sm leading-relaxed">
                            <p className="mb-2"><strong>Beneficiar:</strong> Asociația ONedu</p>
                            <p className="mb-2"><strong>Cod fiscal:</strong> 49039313</p>
                            <p className="mb-2"><strong>Banca:</strong> Banca Transilvania</p>
                            <p className="mb-2"><strong>IBAN (Cont RON):</strong> RO49 BTRL RONC RT0C O956 3601</p>
                            <p className="mb-2"><strong>IBAN (Cont EURO):</strong> RO93 BTRL EURC RT0C O956 3601</p>
                        </div>
                        <button
                            className="w-full mt-4 bg-custom-blue text-white p-3 rounded-lg font-bold hover:bg-custom-blue-dark"
                            onClick={onClose}
                        >
                            Am înțeles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransferModal;