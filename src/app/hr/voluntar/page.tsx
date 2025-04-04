import React from "react";
import Image from "next/image";

export default function HRVoluntarPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <header className="w-full flex flex-col items-center mb-10">
                <Image
                    src={`${process.env.BASE_IMAGE_URL}logos/logo.webp`}
                    alt="Logo"
                    width={150}
                    height={40}
                    className="cursor-pointer"
                />
                <h1 className="text-3xl font-bold text-gray-900 mt-4">Informații pentru Voluntari</h1>
            </header>

            <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800">Regulamente și Politici Interne</h2>
                    <p className="text-gray-600 mt-2">Descărcați regulamentele și politicile interne pentru a vă
                        familiariza cu cerințele și așteptările noastre.</p>
                    <a href={`${process.env.BASE_IMAGE_URL}docs/regulamente/ri-cor.pdf`}
                       className="text-custom-blue font-semibold">Regulamentul intern</a>
                    <br/>
                    <a href={`${process.env.BASE_IMAGE_URL}docs/regulamente/politica-voluntariat.pdf`}
                       className="text-custom-blue font-semibold">Politica de
                        voluntariat</a>
                    <br/>
                    <a href={`${process.env.BASE_IMAGE_URL}docs/regulamente/cod-etica.pdf`}
                       className="text-custom-blue font-semibold">Codul de etică și
                        conduită profesională</a>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800">Template-uri de Contract</h2>
                    <p className="text-gray-600 mt-2">Consultați și descărcați template-urile contractelor pentru
                        voluntariat.</p>
                    <a href={`${process.env.BASE_IMAGE_URL}docs/hr/ctr-voluntariat.pdf`}
                                           className="text-custom-blue font-semibold">Descarcă
                    contractul</a>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800">Norme SSM</h2>
                    <p className="text-gray-600 mt-2">Informații despre normele de siguranță și sănătate în muncă
                        aplicabile voluntarilor.</p>
                    <a href={`${process.env.BASE_IMAGE_URL}docs/regulamente/norme-ssm.pdf`}
                       className="text-custom-blue font-semibold">Descarcă normele SSM</a>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800">Contact</h2>
                    <p className="text-gray-600 mt-2">Raluca-Maria Țonea este directorul de resurse umane.</p>
                    <p className="text-gray-600 mt-2">Pentru orice întrebări sau clarificări, contactați directorul de
                        resurse umane:</p>
                    <p className="text-gray-800 font-semibold">Email: <a href="mailto:raly@onedu.ro"
                                                                         className="text-custom-blue">raly@onedu.ro</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
