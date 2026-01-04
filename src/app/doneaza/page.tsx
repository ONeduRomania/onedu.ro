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
                title="2.8 milioane de elevi din România nu au acces la educație digitală"
                subtitle="Părinții trebuie să scoată bani din buzunar anual pentru a putea asigura acces elevilor la educația digitală. Ajută-ne să construim un ecosistem de soluții digitale pentru educație, gratuite pentru elevi, părinți și profesori."
            >
                <DonationForm/>
            </Hero>

            <ContentSection
                images={[`${process.env.BASE_IMAGE_URL}team-group/bkm_centru.jpg`, `${process.env.BASE_IMAGE_URL}team-group/tgmures_abc.jpg`]}
                altTexts={['bkm_centru', 'tgmures_team']}
                title="Modernizăm educația împreună"
                text="În 2019, doi elevi din Galați au pornit o mișcare civică pentru a aduce educația din România în era digitală. Astăzi, această viziune se transformă într-o misiune națională: dezvoltăm, pas cu pas, infrastructura, resursele materiale și soluțiile digitale care vor susține școlile, profesorii, elevii și părinții.
                Suntem în plin proces de construire a hub-ului nostru educațional și lucrăm intens la primele soluții digitale. Împreună cu parteneri și susținători, punem bazele unui viitor digital pentru generațiile de azi și de mâine."
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
