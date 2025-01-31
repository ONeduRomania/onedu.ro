'use client';

import React from 'react';
import Link from 'next/link';

const InfoRedirect: React.FC = () => {

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = `${process.env.BASE_IMAGE_URL}docs/D230_AsociatiaONedu.pdf`;
        link.download = "Formular_230.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="w-full py-12 bg-custom-blue-light">
            <h2 className="text-2xl font-bold text-center text-[#333] mb-8">
                Vreau să completez și să depun singur Formularul 230
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col">
                    <p className="text-base text-[#555] mb-4">
                        <strong>Formularul poate fi depus în persoană</strong> la sediul ANAF de care aparții cu
                        domiciliul sau trimis prin curier sau prin poștă cu scrisoare recomandată.
                    </p>
                    <Link
                        href="https://static.anaf.ro/static/10/Anaf/AsistentaContribuabili_r/telefoane_judete/Regiuni.htm"
                        className="text-custom-blue font-bold text-base mb-4 hover:underline">
                        Vezi aici lista administrațiilor financiare
                    </Link>
                    <p className="text-base text-[#555] mb-6">
                        Descarcă formularul pre-completat cu datele Asociației ONedu apăsând pe butonul de mai
                        jos. <strong>Nu este nevoie să completezi și suma.</strong>
                    </p>
                </div>

                <div className="flex flex-col">
                    <p className="text-base text-[#555] mb-4">
                        <strong>Formularul poate fi depus și online</strong> prin <Link
                        href="https://pfinternet.anaf.ro/my.policy"
                        className="text-custom-blue font-bold text-base hover:underline">SPV (Spațiul Privat
                        Virtual)</Link> în cazul în care ai cont creat pe site-ul ANAF. Completează formularul
                        inteligent cu datele personale și datele Asociației, bifează suma de 3,5%, validează-l și
                        încarcă-l în SPV. Vei avea nevoie de aplicația Adobe Reader.
                    </p>
                    <p className="text-base text-[#555] mb-6">
                        Datele fiscale pe care trebuie să le completezi pentru noi sunt: <strong>Asociația
                        ONedu</strong>, cod identificare fiscală: <strong>49039313</strong>, cont bancar: <strong>RO49
                        BTRL RONC RT0C O956 3601</strong>.
                    </p>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={handleDownload}
                    className="bg-custom-blue text-white px-6 py-3 text-base font-bold rounded-lg cursor-pointer transition-colors duration-300 hover:bg-custom-blue-dark"
                > Descarcă formularul 230 pre-completat
                </button>
            </div>
        </section>
    );
};

export default InfoRedirect;
