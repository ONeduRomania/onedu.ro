"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/dashboard/login");
        }
    }, [router]);

    return <>{children}</>;
}

export default PrivateRoute;
