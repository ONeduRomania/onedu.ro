"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ValidateMagicLinkPage() {
    const router = useRouter();

    useEffect(() => {
        const validateMagicLink = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get("token");

            if (!token) {
                alert("Token-ul lipsește sau este invalid.");
                router.push("/dashboard/login");
                return;
            }

            try {
                let NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/auth/validate-magic-link?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    router.push("/dashboard");
                } else {
                    alert(data.message || "Link-ul este invalid sau expirat.");
                    router.push("/dashboard/login");
                }
            } catch (error) {
                console.error("Eroare la validarea link-ului magic:", error);
                alert("A apărut o eroare la validarea link-ului magic.");
                router.push("/dashboard/login");
            }
        };

        validateMagicLink();
    }, [router]);


    return <p>Validarea link-ului magic...</p>;
}
