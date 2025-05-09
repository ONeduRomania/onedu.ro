"use client";

import React, {useState} from "react";
import styles from "./MerchPage.module.css";
import Image from "next/image";

import ProductsSection from "@/app/merch/products";
import DonationForm from "@/components/donationForm";
import Hero from "../../components/pageContent/hero";
import {Footer, Navbar} from "@/components";

const MerchPage = () => {

    return (

        <>
            <Navbar/>
            <Hero
                background="/image/gvr-people.jpg"
                title="Dă trendul cu noi"
                subtitle=""
            >
            </Hero>
            <ProductsSection/>
            <Footer/>
        </>
    );
};

export default MerchPage;
