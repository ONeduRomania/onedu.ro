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

        try {
            setError("");
            setMessage("");
            const response = await requestMagicLink(email);
            setMessage(response.message || "Link-ul magic a fost trimis pe email.");
        } catch (err) {
            setError((err as Error).message || "Eroare la autentificare.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-page">
                <h1>Autentificare Dashboard</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Introdu email-ul"
                            required
                        />
                    </div>
                    <button type="submit">Solicită Link Magic</button>
                </form>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
            <Footer />
        </>
    );
}
