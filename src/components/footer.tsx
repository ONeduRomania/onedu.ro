'use client';
import React from 'react';
import Link from 'next/link';
import {FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok} from 'react-icons/fa';
import Image from "next/image";
import NTPLogo from 'ntp-logo-react';

const FOOTER_MENUS = {
    donate: [
        {href: '/doneaza', label: 'Donează online'},
        {href: '/transfer', label: 'Transfer bancar'},
        {href: '/redirectioneaza', label: 'Redirecționează 3.5%'},
        {href: '/sponsorizeaza', label: 'Sponsorizează 20%'},
    ],
    plan: [
        {href: 'https://support.onedu.ro', label: 'Suport beneficiari'},
        {href: 'https://contulmeu.onedu.ro', label: 'Contul meu ONedu'},
        {href: 'https://fiide10.ro', label: 'Hubul Fii de 10!'},
        {href: 'https://ivoluntar.org', label: 'Centrul iVoluntar'},

    ],
    organization: [
        {href: '/brand', label: 'Brandul ONedu'},
        {href: '/newsletter', label: 'Rămâi la curent'},
        {href: '/plan', label: 'Planul nostru'},
        {href: '/despre', label: 'Despre noi'},
        {href: '/blog', label: 'Blog'},
    ],
};

export function Footer() {
    return (
        <footer className="bg-custom-blue text-white p-8 text-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="mb-6">
                    <h3 className="font-bold mb-4 text-lg">Organizație</h3>
                    <ul className="list-none p-0 space-y-2">
                        {FOOTER_MENUS.organization.map((item, index) => (
                            <li key={index} className="text-sm">
                                <Link href={item.href} className="hover:text-custom-blue-light">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h3 className="font-bold mb-4 text-lg">Universul #ONedu</h3>
                    <ul className="list-none p-0 space-y-2">
                        {FOOTER_MENUS.plan.map((item, index) => (
                            <li key={index} className="text-sm">
                                <Link href={item.href} className="hover:text-custom-blue-light">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h3 className="font-bold mb-4 text-lg">Donează</h3>
                    <ul className="list-none p-0 space-y-2">
                        {FOOTER_MENUS.donate.map((item, index) => (
                            <li key={index} className="text-sm">
                                <Link href={item.href} className="hover:text-custom-blue-light">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6 flex justify-center items-center">
                    <NTPLogo color="#16366d" version="orizontal" secret="142505" />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center pt-4 border-t border-gray-500 mt-6">
                <div className="flex flex-row justify-center lg:justify-start items-center">
                    <div className="flex flex-row gap-4">
                        <Link href="/privacy" className="hover:underline">Confidențialitate</Link>
                        <Link href="/terms" className="hover:underline">Termeni</Link>
                        <Link href="/contact" className="hover:underline">Contact</Link>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4 lg:mt-0">
                    <span>Partener digitalizare</span>
                    <Link href="https://web365.ro" target="_blank">
                        <Image src={`${process.env.BASE_IMAGE_URL}logos/web365-logo.webp`} alt="Web365 Logo" width={80} height={80} />
                    </Link>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
                <Link href="https://facebook.com/ONeduRomania" className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff]">
                    <FaFacebook />
                </Link>
                <Link href="https://instagram.com/onedu.romania" className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff]">
                    <FaInstagram />
                </Link>
                <Link href="https://tiktok.com/@onedu.ro" className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff]">
                    <FaTiktok />
                </Link>
                <Link href="https://linkedin.com/company/onedu" className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff]">
                    <FaLinkedinIn />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
