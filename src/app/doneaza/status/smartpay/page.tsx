import { Suspense } from "react";
import StatusSmartPay from "./StatusSmartpay";

export default function SmartPayStatusPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-xl">Se încarcă pagina de confirmare SmartPay...</div>}>
            <StatusSmartPay />
        </Suspense>
    );
}
