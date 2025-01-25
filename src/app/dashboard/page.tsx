"use client";

import React from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { Navbar, Footer } from "@/components";

const DashboardPage: React.FC = () => {
    return (
        <PrivateRoute>
            <Navbar />
            <div>
                <h1>Bine ai venit în Dashboard</h1>
                <p>Aici poți gestiona utilizatorii, articolele și sponsorizările.</p>
            </div>
            <Footer />
        </PrivateRoute>
    );
};

export default DashboardPage;
