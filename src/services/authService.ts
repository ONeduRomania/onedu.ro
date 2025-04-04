import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.BASE_API_URL;

export async function requestMagicLink(email: string) {
    const response = await fetch(`${API_BASE_URL}api/auth/request-magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Eroare la autentificare.");
    }

    return await response.json();
}