'use client';

import {Navbar, Footer} from "@/components";
import Hero from "@/app/redirectioneaza/hero";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import studentsStories from "../../data/studentsStories.json";
import FormSubmission from "@/app/redirectioneaza/infoRedirect";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function RedirectioneazaPage() {
    // const router = useRouter();

    // useEffect(() => {
    //     router.push("/redirectioneaza/fwd");
    // }, [router]);

    return (
        <>
            <Navbar/>
            <Hero
                title="Școala n-ar trebui să fie sfârșitul creativității."
                subtitle="Cu 3,5% din impozitul tău, educația digitală readuce creativitatea acolo unde nu ar trebui să se piardă: în școală."
                youtubeUrl="https://youtu.be/3WvchgVIOqI"
                buttonText="Completează formularul"
                buttonLink="/formular230"
            />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/tedx2024.jpeg`, `${process.env.BASE_IMAGE_URL}team-group/bkm_centru.jpg`, `${process.env.BASE_IMAGE_URL}team-group/galaCOR2021.jpeg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="De ce se pierde creativitatea în școală?"
                text="Copiii intră în școală curioși, creativi și dornici să descopere. De multe ori însă, sistemul îi învață să reproducă informații, nu să creeze sau să gândească liber. Creativitatea nu dispare, ci rămâne nefolosită.
                <br/><br/>
                Educația digitală nu înseamnă ecrane în plus, ci un mod de a învăța care încurajează explorarea, colaborarea și creația. Este șansa de a transforma școala într-un spațiu unde creativitatea nu se oprește, ci crește."
                layout="left"
                backgroundColor="bg-white"
            />

            <ColumnSection
                sectionTitle="Poveștile elevilor din România"
                cards={studentsStories}
                backgroundColor="bg-[#d2e2ff]"
            />

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/AmaliaCD.jpeg`, `${process.env.BASE_IMAGE_URL}team-group/abc_GL_2019.jpg`, `${process.env.BASE_IMAGE_URL}team-group/clase.png`, `${process.env.BASE_IMAGE_URL}team-group/caravanaCluj_1.jpg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Unde merge investiția ta?"
                text='Cu fiecare formular, ecosistemul de <a href="/plan" class="text-custom-blue font-semibold hover:underline">soluții digitale</a> devine realitate pentru cei 3.8 milioane de elevi din toată țara.
                    Prin investiția ta, conectăm elevii cu viitorul. <br/><br/>
                    Pentru anul 2025, ne-am propus să construim soluțiile:
                    <br/>
                    - <b>Andrei</b>: asistent în alegerea liceului
                    <br/>
                    - <b>AmExamen</b>: un ecosistem dedicat examenelor naționale
                    <br/>
                    - <b>Eva</b>: competențe digitale de 10!'
                layout="right"
                backgroundColor="bg-gray-50"
            />

            <FormSubmission/>
            
            <section className="w-full py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
                        Detalii fiscale
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                        <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
                            <div>
                                <p className="mb-4">
                                    <strong className="text-gray-900">Formularul 230</strong> se completează de către persoanele fizice care realizează venituri din salarii. Procentul nu trebuie să depăşească plafonul de <strong className="text-custom-blue">3,5% din impozitul pe venit</strong>.
                                </p>
                            </div>
                            <div className="border-t border-gray-300 pt-6">
                                <p className="font-semibold text-gray-900 mb-3">Nu pot redirecționa 3,5% din impozitul pe venit:</p>
                                <ul className="list-disc list-inside space-y-2 ml-2">
                                    <li>PFA-urile</li>
                                    <li>Titularii de întreprinderi individuale și familiale</li>
                                    <li>Cei care obțin venituri din activități independente (profesii liberale)</li>
                                    <li>Cei care obțin venituri din drepturi de autor și pensii</li>
                                    <li>În general, cei care puteau face redirecționarea prin completarea formularului 230 sau a rubricii specifice din Declarația Unică (formularul 212)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}
