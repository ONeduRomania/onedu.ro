"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const StatusSmartPay = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const paymentId = searchParams.get("id");
    const status = searchParams.get("status");
    const message = searchParams.get("message");

    console.log("🔍 Search params:", { paymentId, status, message })

    const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        if (!paymentId || !status) return;

        const updatePaymentStatus = async () => {
            if (!paymentId) return;
            try {
                console.log("Sending request to backend:", {
                    orderId: paymentId,
                    status: status === "ACSC" ? "confirmed" : "failed",
                });

                const response = await fetch(`${process.env.BASE_API_URL}api/donations/status/smartpay`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: paymentId,
                        status: status === "ACSC" ? "confirmed" : "failed",
                    }),
                });

                const data = await response.json();
                console.log("Response from backend:", data);

                if (data.success) {
                    setPaymentStatus(status === "ACSC" ? "success" : "error");
                } else {
                    setPaymentStatus("error");
                }
            } catch (error) {
                console.error("Error updating SmartPay status:", error);
                setPaymentStatus("error");
            }
        };

        updatePaymentStatus();
    }, [paymentId, status]);

    useEffect(() => {
        if (paymentStatus === "success" || paymentStatus === "error") {
            setTimeout(() => {
                router.push(paymentStatus === "success" ? "/" : "/doneaza");
            }, 5000);
        }
    }, [paymentStatus, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {paymentStatus === "loading" && <p className="text-2xl font-semibold">Verificăm plata...</p>}

            {(paymentStatus === "success" || paymentStatus === "error") && (
                <div className="bg-white p-10 md:p-14 rounded-2xl shadow-2xl text-center max-w-lg animate-fade-in">
                    <h2 className={`text-4xl font-extrabold ${paymentStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                        {paymentStatus === "success" ? "Plată efectuată cu succes!" : "Plata nu a fost efectuată!"}
                    </h2>
                    <p className="text-lg text-gray-700 mt-4">
                        {paymentStatus === "success"
                            ? "Mulțumim pentru donația ta! ❤️ Vei fi redirecționat automat în 5 secunde..."
                            : "Din păcate, plata nu a fost confirmată. Vei fi redirecționat automat în 5 secunde."}
                    </p>
                    <button
                        onClick={() => router.push(paymentStatus === "success" ? "/" : "/doneaza")}
                        className="mt-6 px-6 py-3 bg-custom-blue text-white rounded-lg text-lg hover:bg-custom-blue-dark transition-all"
                    >
                        {paymentStatus === "success" ? "Înapoi la pagina principală" : "Încearcă din nou"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatusSmartPay;
