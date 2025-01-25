// components
import {Navbar, Footer} from "@/components";
import Hero from "@/components/pageContent/hero";
import DonationForm from "@/components/donationForm";
import React from "react";
import ContentSection from "@/components/pageContent/content-section";
import ColumnSection from "@/components/pageContent/column-section";
import studentsStories from "../../data/studentsStories.json";


export default function Homepage() {
    return (
        <>
            <Navbar/>
            <Hero
                background={`${process.env.BASE_IMAGE_URL}team-group/gvr-people.jpg`}
                title="Modernizăm educația împreună."
                subtitle="Anual părinții scot bani din buzunar pentru accesul elevilor din România la educație. Ajută-ne să construim soluții digitale în educație și să renovăm împreună școli."
            >
                <DonationForm/>
            </Hero>

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/bkm_centru.jpg`, `${process.env.BASE_IMAGE_URL}team-group/tgmures_abc.jpg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Manifestul nostru"
                text="În 2019, doi elevi din Galați au inițiat o mișcare civică pentru a digitaliza educația din România. De atunci, această viziune s-a transformat într-o misiune națională: modernizarea educației prin infrastructură, resurse materiale și digitale. Lucrăm pentru a oferi soluții digitale inovatoare pentru elevi, părinți, profesori și școli. Împreună, construim un viitor digital pentru generațiile de azi și de mâine."
                layout="left"
            />

            <ColumnSection
                sectionTitle="Poveștile elevilor din România"
                cards={studentsStories}
                backgroundColor="bg-[#d2e2ff]"
            />

            {/*<ContentSection*/}
            {/*    images={['/image/team-group/bkm_centru.jpg', '/image/team-group/tgmures_abc.jpg']}*/}
            {/*    altTexts={['bkm_centru', 'tgmures_team']}*/}
            {/*    title="Cum vor arăta Școlile ONedu?"*/}
            {/*    text="Am pornit ca o mișcare civică în 2019 la inițiativa a doi elevi gălățeni, din dorința de a digitaliza educația din România. Din 2025 modernizăm educația pe toate planurile: infrastructură, resurse materiale și resurse digitale. Construim împreună soluții digitale pentru elevi, părinți, tineri, profesori, școli și modernizăm școlile României. Construim România educată."*/}
            {/*    layout="right"*/}
            {/*/>*/}

            <Footer/>
        </>
    );
}
