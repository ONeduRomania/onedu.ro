"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps): JSX.Element {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/dashboard/login");
            return;
        }

        const userData = JSON.parse(localStorage.getItem("user") || "{}");

        if (userData.role) {
            setUserRole(userData.role);
        } else {
            router.push("/dashboard/login");
        }

        setLoading(false);
    }, [router]);

    useEffect(() => {
        if (!loading && userRole && allowedRoles && !allowedRoles.includes(userRole)) {
          if (userRole === "donator") {
                router.push("/dashboard/donator");
            } else if (userRole === "admin") {
                router.push("/dashboard/admin");
            } else {
                router.push("/dashboard");
            }
        }
    }, [userRole, loading, allowedRoles, router]);

    if (loading) return <p>Se încarcă...</p>;

    return <>{children}</>;
}

export default PrivateRoute;
