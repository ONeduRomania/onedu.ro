'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok} from 'react-icons/fa';
import Image from "next/image";
import NTPLogo from 'ntp-logo-react';
import NewsletterModal from './NewsletterModal';

export function Footer() {
    const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

    return (
        <footer className="bg-custom-blue text-white relative" role="contentinfo">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
                {/* Top section - Iconuri sociale stânga, Metode de plată dreapta */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-4 border-b border-white/20">
                    {/* Iconuri sociale - stânga */}
                    <div className="flex gap-2" aria-label="Rețele sociale">
                        <Link 
                            href="https://facebook.com/ONeduRomania" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] focus:bg-[#d2e2ff] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-custom-blue transition-colors"
                            aria-label="Pagina noastră Facebook"
                        >
                            <FaFacebook />
                        </Link>
                        <Link 
                            href="https://instagram.com/onedu.romania" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] focus:bg-[#d2e2ff] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-custom-blue transition-colors"
                            aria-label="Pagina noastră Instagram"
                        >
                            <FaInstagram />
                        </Link>
                        <Link 
                            href="https://tiktok.com/@onedu.ro" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] focus:bg-[#d2e2ff] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-custom-blue transition-colors"
                            aria-label="Pagina noastră TikTok"
                        >
                            <FaTiktok />
                        </Link>
                        <Link 
                            href="https://linkedin.com/company/onedu" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-[#16366d] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#d2e2ff] focus:bg-[#d2e2ff] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-custom-blue transition-colors"
                            aria-label="Pagina noastră LinkedIn"
                        >
                            <FaLinkedinIn />
                        </Link>
                    </div>

                    {/* Buton Rămâi la curent - dreapta */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsNewsletterModalOpen(true)}
                            className="bg-white text-custom-blue px-4 py-2 rounded-lg font-semibold text-sm hover:bg-custom-blue-light focus:bg-custom-blue-light focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                            aria-label="Rămâi la curent"
                        >
                            Rămâi la curent
                        </button>
                    </div>
                </div>

                {/* Bottom section - Linkuri legale și Partener digitalizare */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <nav className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm" aria-label="Linkuri legale">
                        <Link 
                            href="/privacy" 
                            className="text-white hover:underline focus:outline-none focus:underline cursor-pointer transition-colors duration-200 hover:text-white/80"
                            aria-label="Politica de confidențialitate"
                        >
                            Confidențialitate
                        </Link>
                        <Link 
                            href="/terms" 
                            className="text-white hover:underline focus:outline-none focus:underline cursor-pointer transition-colors duration-200 hover:text-white/80"
                            aria-label="Condiții de utilizare"
                        >
                            Condiții de utilizare
                        </Link>
                        <Link 
                            href="/contact" 
                            className="text-white hover:underline focus:outline-none focus:underline cursor-pointer transition-colors duration-200 hover:text-white/80"
                            aria-label="Suport"
                        >
                            Suport
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-white/80">Partener digitalizare</span>
                        <Link 
                            href="https://web365.ro" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-custom-blue rounded"
                            aria-label="Web365 - Partener digitalizare"
                        >
                            <Image 
                                src={`${process.env.BASE_IMAGE_URL}logos/web365-logo.webp`} 
                                alt="Web365 Logo" 
                                width={80} 
                                height={80}
                                className="object-contain"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <NewsletterModal 
                isOpen={isNewsletterModalOpen}
                onClose={() => setIsNewsletterModalOpen(false)}
            />
        </footer>
    );
}

export default Footer;
