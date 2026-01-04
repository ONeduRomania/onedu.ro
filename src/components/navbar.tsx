"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {FaHeart, FaChevronDown, FaUser} from "react-icons/fa";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";

const MENU_ITEMS = [
    {
        label: "Donează", href: "", subMenu: [
            {label: "Donează online", href: "/doneaza"},
            {label: "Transfer bancar", href: "/transfer"},
            // { label: "SMS", href: "/sms" },
            {label: "Redirecționează 3,5%", href: "/redirectioneaza"},
            {label: "Sponsorizează 20%", href: "/sponsorizeaza"}
            // { label: "Campania ta", href: "/campanii" },
        ]
    },
    {label: "Planul nostru", href: "/plan"},
    // { label: "Școala ONedu", href: "/scoala" },
    {label: "Sponsorizează 20%", href: "/sponsorizeaza"},
    {label: "Voluntariat", href: "https://docs.google.com/forms/d/e/1FAIpQLSc7C_yOO2HGJFpd2Ofm-h0trW3k8QBjw94ULHe3EBgeqXHEog/viewform?usp=sf_link"},
    {label: "Centrul iVoluntar", href: "https://ivoluntar.org"},
    // { label: "Merch", href: "/merch" },
    {
        label: "Despre noi", href: "", subMenu: [
            {label: "Despre noi", href: "/despre"},
            {label: "Brandul ONedu", href: "/brand"},
            // {label: "Proiecte", href: "/proiecte"},
            {label: "Premii", href: "/premii"},
            {label: "Rapoarte", href: "/rapoarte"},
            {label: "Susținători", href: "/parteneri"},
        ]
    },
    // {label: "Blog", href: "/blog"},
];

export function Navbar() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = (menu: string) => {
        if (!menuOpen) {
            clearTimeout(timeoutId);
            setOpenMenu(menu);
        }
    };

    const handleMouseLeave = () => {
        if (!menuOpen) {
            timeoutId = setTimeout(() => setOpenMenu(null), 200);
        }
    };

    const toggleSubMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <header className="relative z-50 w-full bg-transparent transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-1">
                <Link href="/">
                    <Image
                        src={`${process.env.BASE_IMAGE_URL}logos/logo.webp`}
                        alt="Logo"
                        width={80}
                        height={24}
                        className="cursor-pointer"
                    />
                </Link>

                <nav
                    className={`lg:flex lg:static lg:bg-transparent lg:shadow-none lg:ml-auto 
                        ${menuOpen
                        ? "absolute inset-x-0 top-full bg-white shadow-md z-40 max-h-screen opacity-100 transition-all duration-300 ease-in"
                        : "absolute inset-x-0 top-full bg-white shadow-md z-40 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-out"
                    }
                        lg:max-h-none lg:opacity-100 lg:overflow-visible
                    `}
                >
                    <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-1 p-4 lg:p-0 text-sm">
                        {MENU_ITEMS.map((item) => (
                            <li
                                key={item.href}
                                className="relative"
                                onMouseEnter={() => item.subMenu && handleMouseEnter(item.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.subMenu ? (
                                    <button
                                        onClick={() => toggleSubMenu(item.label)}
                                        className={`font-medium flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-200 transition ${
                                            openMenu === item.label ? "bg-gray-100" : ""
                                        }`}
                                    >
                                        {item.label}{" "}
                                        <FaChevronDown
                                            className={`text-sm transform transition-transform ${
                                                openMenu === item.label ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                ) : (
                                    <Link href={item.href}
                                          className="font-medium px-2 py-1 rounded-md hover:bg-gray-200 transition">
                                        {item.label}
                                    </Link>
                                )}
                                {item.subMenu && openMenu === item.label && (
                                    <ul
                                        className={`${
                                            menuOpen
                                                ? "block mt-2 p-2 rounded-lg"
                                                : "absolute top-[120%] left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md p-4 z-50 min-w-[200px]"
                                        }`}
                                    >
                                        {item.subMenu.map((subItem) => (
                                            <li
                                                key={subItem.href}
                                                className={`py-1.5 px-2 ${
                                                    menuOpen
                                                        ? "bg-transparent"
                                                        : "hover:bg-gray-200"
                                                } rounded-md text-sm font-medium`}
                                            >
                                                <Link
                                                    href={subItem.href}
                                                    className="block h-full w-full"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center">
                    {/* <Link href="https://contulmeu.onedu.ro" target="_blank" rel="noopener noreferrer">
                        <FaUser className="text-3xl cursor-pointer hover:bg-gray-200 p-2 rounded-md ml-4"/>
                    </Link> */}
                    <div className="flex items-center gap-4">
                        <Link href="/doneaza">
                            <button
                                className="ml-4 bg-custom-blue text-white px-3 py-1 rounded-md font-medium text-sm hover:bg-custom-blue-dark flex items-center">
                                <FaHeart className="hidden lg:inline-block mr-1"/>
                                Donează
                            </button>
                        </Link>

                        <button
                            className="block lg:hidden text-black"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? (
                                <XMarkIcon className="w-5 h-5"/>
                            ) : (
                                <Bars3Icon className="w-5 h-5"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;