"use client";

import React from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { Navbar, Footer } from "@/components";

const DonatorDashboardPage: React.FC = () => {
    return (
        <PrivateRoute allowedRoles={["donator"]}>
            <Navbar />
            <div>
                <h1>🌟 Donator Dashboard</h1>
                <p>Mulțumim pentru sprijinul tău! Aici poți vedea donațiile și sponsorizările tale.</p>
            </div>
            <Footer />
        </PrivateRoute>
    );
};

export default DonatorDashboardPage;
