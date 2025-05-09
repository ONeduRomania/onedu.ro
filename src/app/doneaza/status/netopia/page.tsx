import { Suspense } from "react";
import StatusNetopia from "./StatusNetopia";

export default function NetopiaStatusPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-xl">Se încarcă pagina de plată...</div>}>
            <StatusNetopia />
        </Suspense>
    );
}
