import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Layout } from "@/components";
import GlobalScripts from "@/components/GlobalScripts";
import React, { Suspense } from "react";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Asociația ONedu",
    description:
        "Asociația ONedu este organizația tinerilor pentru digitalizarea educației din România",
    icons: {
        icon: "https://assets.onedu.ro/logos/favicon.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ro">
        <head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
        </head>
        <body className={roboto.className}>
        <Layout>
            <Suspense fallback={null}>
                <GlobalScripts />
            </Suspense>

            {children}
        </Layout>
        </body>
        </html>
    );
}
