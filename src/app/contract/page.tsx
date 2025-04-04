"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SponsorshipForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        cui: "",
        companyDetails: {},
        legalRepresentative: {},
        bankingDetails: {},
        contractValue: {},
    });
    const [showPopup, setShowPopup] = useState(false);

    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        await fetch("/api/generate-contract", {
            method: "POST",
            body: JSON.stringify(formData),
        });
        setShowPopup(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Navbar />
            <main className="flex-grow max-w-3xl mx-auto py-10 px-8">
                <Card className="shadow-md p-8 w-full">
                    <CardBody>
                        {step === 1 && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-800">Pasul 1/6: <span className="font-bold">CUI Companie</span></h2>
                                <h1 className="text-3xl font-bold mt-2">Alegerea Companiei</h1>
                                <p className="mt-4 bg-custom-light-blue text-custom-dark-blue p-4 rounded-lg">
                                    Dacă ai mai realizat un contract de sponsorizare pentru asociația <span className="font-bold">Dăruiește Viață</span>, datele companiei tale vor fi precompletate. Te rugăm doar să le actualizezi, dacă este nevoie.
                                </p>
                                <div className="mt-6 flex gap-4">
                                    <Input
                                        className="flex-grow text-lg px-4 py-3 border border-gray-300 rounded-lg"
                                        type="text"
                                        placeholder="Caută compania după CUI"
                                        value={formData.cui}
                                        onChange={(e) => setFormData({ ...formData, cui: e.target.value })}
                                    />
                                    <Button isIconOnly className="text-white bg-custom-blue-dark hover:bg-custom-blue">🔍</Button>
                                </div>
                                <p className="mt-4 text-gray-600 text-sm">
                                    Datele sunt cele publicate de Ministerul de Finanțe și ne sunt puse la dispoziție de <a href="https://openapi.ro" className="text-custom-blue-dark font-semibold">openapi.ro</a>
                                </p>
                                <Button onClick={handleNext} className="mt-6 bg-custom-blue-dark text-white text-lg py-3 px-6 rounded-lg hover:bg-custom-blue">Continuă</Button>
                            </>
                        )}
                    </CardBody>
                </Card>
            </main>
            <Footer />
        </div>
    );
}