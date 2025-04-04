"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, FileText, Heart, Handshake, FilePlus } from "lucide-react"; // Iconuri

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
    const router = useRouter();

    // useEffect(() => {
    //     const fetchAdminData = async () => {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             router.push("/dashboard/login");
    //             return;
    //         }
    //
    //         try {
    //             const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/users/me`, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //
    //             const data = await response.json();
    //             if (response.ok) {
    //                 setAdmin(data);
    //             } else {
    //                 router.push("/dashboard/login");
    //             }
    //         } catch (error) {
    //             console.error("Eroare la preluarea datelor admin:", error);
    //             router.push("/dashboard/login");
    //         }
    //     };
    //
    //     fetchAdminData();
    // }, [router]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Meniu lateral */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-bold">Admin ONedu</h2>
                    {admin ? (
                        <p className="text-sm text-gray-600">{admin.name} <br /> {admin.email}</p>
                    ) : (
                        <p className="text-sm text-gray-500">Se încarcă...</p>
                    )}
                </div>

                <nav className="flex flex-col space-y-4">
                    <Link href="/dashboard/admin" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Home size={20} /> <span>Dashboard</span>
                    </Link>
                    <Link href="/dashboard/admin/blog" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <FileText size={20} /> <span>Articole</span>
                    </Link>
                    <Link href="/dashboard/admin/donations" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Heart size={20} /> <span>Donații</span>
                    </Link>
                    <Link href="/dashboard/admin/sponsors" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <Handshake size={20} /> <span>Sponsorizări</span>
                    </Link>
                    <Link href="/dashboard/admin/forms230" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                        <FilePlus size={20} /> <span>Formulare 230</span>
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
