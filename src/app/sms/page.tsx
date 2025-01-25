import {Navbar, Footer} from "@/components";
import Hero from "@/components/pageContent/hero";
import React from "react";
import SMSCall from "@/app/sms/SMSCall";
import SMSinfo from "@/app/sms/SMSinfo";


export default function Homepage() {
    return (
        <>
            <Navbar/>
            <Hero
                title="Modernizăm educația împreună."
                subtitle="Anual părinții scot bani din buzunar pentru accesul elevilor din România la educație. Ajută-ne să construim soluții digitale în educație și să renovăm împreună școli."
            >
                <SMSCall/>
            </Hero>

            <SMSinfo/>
            <Footer/>
        </>
    );
}
