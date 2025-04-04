"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { requestMagicLink } from "@/services/authService";
import { Navbar, Footer } from "@/components";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const response = await requestMagicLink(email);
            setMessage(response.message || "Link-ul de conectare a fost trimis pe e-mail.");
        } catch (err) {
            setError((err as Error).message || "Eroare la autentificare.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center py-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Contul tău de donator
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Introdu email-ul"
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-custom-blue focus:border-custom-blue"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-custom-blue text-white py-2 px-4 rounded-lg font-semibold hover:bg-custom-blue-dark transition duration-300"
                        >
                            Conectează-te
                        </button>
                    </form>
                    {message && (
                        <p className="mt-4 text-green-600 text-center font-medium">
                            {message}
                        </p>
                    )}
                    {error && (
                        <p className="mt-4 text-red-600 text-center font-medium">
                            {error}
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
