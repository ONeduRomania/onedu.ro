"use client";
import React, { useState, useEffect } from 'react';
import { Judete } from '@/data/judete';
import Link from 'next/link';

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [judet, setJudet] = useState('');
    const [phone, setPhone] = useState('');
    const [gdprConsent, setGdprConsent] = useState(false);
    const [errors, setErrors] = useState<{ 
        firstName?: string; 
        lastName?: string; 
        email?: string; 
        judet?: string;
        gdprConsent?: string;
        birthDate?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            // Reset form when modal closes
            setFirstName('');
            setLastName('');
            setEmail('');
            setBirthDay('');
            setBirthMonth('');
            setBirthYear('');
            setJudet('');
            setPhone('');
            setGdprConsent(false);
            setErrors({});
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

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const validateForm = () => {
        const newErrors: { 
            firstName?: string; 
            lastName?: string; 
            email?: string; 
            judet?: string;
            gdprConsent?: string;
            birthDate?: string;
        } = {};

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

        if (!judet) {
            newErrors.judet = "Județul este obligatoriu.";
        }

        if (!gdprConsent) {
            newErrors.gdprConsent = "Trebuie să accepți prelucrarea datelor cu caracter personal.";
        }

        // Validare vârstă minimă 16 ani
        if (birthDay && birthMonth && birthYear) {
            const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();
            
            const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
            
            if (actualAge < 16) {
                newErrors.birthDate = "Trebuie să ai minim 16 ani pentru a te abona la newsletter.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // TODO: Replace with actual API endpoint
            const response = await fetch(`${process.env.BASE_API_URL}api/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    birthDate: (birthDay && birthMonth && birthYear) 
                        ? `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}` 
                        : null,
                    judet,
                    phone: phone || null,
                    gdprConsent: true,
                }),
            });

            if (response.ok) {
                alert('Te-ai abonat cu succes la newsletter!');
                onClose();
            } else {
                const data = await response.json();
                alert(data.message || 'A apărut o eroare. Te rugăm să încerci din nou.');
            }
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            alert('A apărut o eroare. Te rugăm să încerci din nou.');
        } finally {
            setIsSubmitting(false);
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
                className={`bg-white p-4 md:p-8 rounded-t-xl md:rounded-xl w-full max-w-md 
                  shadow-lg relative flex flex-col 
                  transition-transform duration-300 transform 
                  ${isOpen ? 'translate-y-0' : 'translate-y-full'} 
                  pointer-events-auto max-h-[90vh] overflow-y-auto`}
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2"
                    onClick={onClose}
                    aria-label="Închide"
                >
                    <span className="text-xl leading-none">×</span>
                </button>

                <h2 className="text-2xl font-bold text-custom-blue mb-6">Rămâi la curent</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-800">
                            Prenume <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 placeholder:text-gray-400 ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Introdu prenumele"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-800">
                            Nume <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 placeholder:text-gray-400 ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Introdu numele"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-800">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 placeholder:text-gray-400 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="exemplu@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-800">
                            Data nașterii <span className="text-gray-600 text-xs">(opțional)</span>
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={birthDay}
                                onChange={(e) => setBirthDay(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 bg-white"
                            >
                                <option value="">Zi</option>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                    <option key={day} value={day.toString().padStart(2, '0')}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={birthMonth}
                                onChange={(e) => setBirthMonth(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 bg-white"
                            >
                                <option value="">Lună</option>
                                {[
                                    { value: '01', label: 'Ianuarie' },
                                    { value: '02', label: 'Februarie' },
                                    { value: '03', label: 'Martie' },
                                    { value: '04', label: 'Aprilie' },
                                    { value: '05', label: 'Mai' },
                                    { value: '06', label: 'Iunie' },
                                    { value: '07', label: 'Iulie' },
                                    { value: '08', label: 'August' },
                                    { value: '09', label: 'Septembrie' },
                                    { value: '10', label: 'Octombrie' },
                                    { value: '11', label: 'Noiembrie' },
                                    { value: '12', label: 'Decembrie' },
                                ].map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 bg-white"
                            >
                                <option value="">An</option>
                                {Array.from({ length: 100 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return year;
                                }).map((year) => (
                                    <option key={year} value={year.toString()}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.birthDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-800">
                            Județ <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={judet}
                            onChange={(e) => setJudet(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 bg-white ${
                                errors.judet ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Selectează județul</option>
                            {Judete.map((judet) => (
                                <option key={judet.auto} value={judet.nume}>
                                    {judet.nume}
                                </option>
                            ))}
                        </select>
                        {errors.judet && (
                            <p className="text-red-500 text-sm mt-1">{errors.judet}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-800">
                            Telefon <span className="text-gray-600 text-xs">(opțional)</span>
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-custom-blue text-gray-900 placeholder:text-gray-400"
                            placeholder="07XXXXXXXX"
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gdprConsent}
                                onChange={(e) => setGdprConsent(e.target.checked)}
                                className="mt-0.5 w-5 h-5 text-custom-blue border-gray-300 rounded focus:ring-2 focus:ring-custom-blue focus:ring-offset-0"
                            />
                            <span className="text-sm text-gray-800 leading-relaxed">
                                Accept prelucrarea datelor mele cu caracter personal conform{" "}
                                <Link href="/privacy" className="text-custom-blue hover:underline font-semibold" target="_blank">
                                    politicii de confidențialitate
                                </Link>
                                . <span className="text-red-500 font-semibold">*</span>
                            </span>
                        </label>
                        {errors.gdprConsent && (
                            <p className="text-red-500 text-sm mt-2 ml-8">{errors.gdprConsent}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-custom-blue text-white font-semibold rounded-lg hover:bg-custom-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Se trimite...' : 'Abonează-te'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewsletterModal;

