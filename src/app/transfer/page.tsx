// components
import { Navbar, Footer } from "@/components";
import React from "react";
import HeroTransfer from "@/app/transfer/hero-transfer";
import TransferData from "@/app/transfer/transfer-data";

export default function Homepage() {
    return (
        <>
            <Navbar />
            <HeroTransfer />
            <TransferData />
            <Footer />
        </>
    );
}
