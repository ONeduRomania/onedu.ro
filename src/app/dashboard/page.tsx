"use client";

import React from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { Navbar, Footer } from "@/components";

const DashboardPage: React.FC = () => {
    return (
        <PrivateRoute allowedRoles={["user", "donator", "admin"]}>
            <Navbar />
            <div>
                <h1>Bine ai venit în Dashboard</h1>
                <p>Aici poți accesa funcționalitățile disponibile pentru utilizatori.</p>
            </div>
            <Footer />
        </PrivateRoute>
    );
};

export default DashboardPage;
