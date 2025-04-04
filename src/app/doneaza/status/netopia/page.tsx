"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const StatusNetopia = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        if (!orderId) return;

        const checkPaymentStatus = async () => {
            try {
                const response = await fetch(`${process.env.BASE_API_URL}api/donations/status/netopia`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId }),
                });

                const data = await response.json();

                if (data.success) {
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error("Eroare verificare plată Netopia:", error);
                setStatus("error");
            }
        };

        checkPaymentStatus();
    }, [orderId]);

    useEffect(() => {
        if (status === "success" || status === "error") {
            setTimeout(() => {
                router.push(status === "success" ? "/" : "/doneaza");
            }, 5000);
        }
    }, [status, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {status === "loading" && <p className="text-2xl font-semibold">Verificăm plata...</p>}
            {(status === "success" || status === "error") && (
                <div className="bg-white p-10 md:p-14 rounded-2xl shadow-2xl text-center max-w-lg animate-fade-in">
                    <h2 className={`text-4xl font-extrabold ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                        {status === "success" ? "Plată efectuată cu succes!" : "Plata nu a fost efectuată!"}
                    </h2>
                    <p className="text-lg text-gray-700 mt-4">
                        {status === "success"
                            ? "Mulțumim pentru donația ta! ❤️ Vei fi redirecționat automat în 5 secunde..."
                            : "Din păcate, plata nu a fost confirmată. Vei fi redirecționat automat în 5 secunde."}
                    </p>
                    <button
                        onClick={() => router.push(status === "success" ? "/" : "/doneaza")}
                        className="mt-6 px-6 py-3 bg-custom-blue text-white rounded-lg text-lg hover:bg-custom-blue-dark transition-all"
                    >
                        {status === "success" ? "Înapoi la pagina principală" : "Încearcă din nou"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatusNetopia;
