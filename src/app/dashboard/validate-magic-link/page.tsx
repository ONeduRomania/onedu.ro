
export default function ValidateMagicLinkPage() {
    return (
        <div>
            <p>Validarea link-ului magic...</p>
        </div>
    );
}

// "use client";
//
// import React, { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
//
// export default function ValidateMagicLinkPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const token = searchParams.get("token");
//
//     useEffect(() => {
//         const validateMagicLink = async () => {
//             if (!token) {
//                 alert("Token-ul lipsește sau este invalid.");
//                 router.push("/dashboard/login");
//                 return;
//             }
//
//             try {
//                 const response = await fetch(
//                     `${process.env.BASE_API_URL}api/auth/validate-magic-link?token=${token}`
//                 );
//                 const data = await response.json();
//
//                 if (response.ok) {
//                     localStorage.setItem("token", data.token);
//
//                     const redirectURL = data.isAdmin ? "/dashboard/admin" : "/dashboard";
//                     router.push(redirectURL);
//                 } else {
//                     alert(data.message || "❌ Link-ul este invalid sau expirat.");
//                     router.push("/dashboard/login");
//                 }
//             } catch (error) {
//                 console.error("❌ Eroare la validarea link-ului magic:", error);
//                 alert("❌ A apărut o eroare la validarea link-ului magic.");
//                 router.push("/dashboard/login");
//             }
//         };
//
//         validateMagicLink();
//     }, [router, token]);
//
//     return <p>Validarea link-ului magic...</p>;
// }
