"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ donations: 0, sponsors: 0, forms: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${process.env.BASE_API_URL}api/dashboardstats/admin`);
                const data = await response.json();
                if (response.ok) {
                    setStats(data);
                }
            } catch (error) {
                console.error("Eroare la încărcarea statisticilor:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Donații confirmate</h2>
                    <p className="text-2xl font-bold text-blue-600">€ {stats.donations}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Sponsorizări 2025</h2>
                    <p className="text-2xl font-bold text-green-600">{stats.sponsors}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">Formulare 230 2025</h2>
                    <p className="text-2xl font-bold text-orange-600">{stats.forms}</p>
                </div>
            </div>
        </div>
    );
}
