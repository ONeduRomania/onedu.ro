"use client";

import Script from "next/script";
import React from "react";

export default function GlobalScripts() {
    return (
        <>
            {/* CookieYes */}
            <Script
                id="cookieyes"
                type="text/javascript"
                src="https://cdn-cookieyes.com/client_data/065537713e9f3f75679a8979/script.js"
                async
            />

            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-72E9MLT5DC"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-72E9MLT5DC');
        `}
            </Script>
        </>
    );
}
