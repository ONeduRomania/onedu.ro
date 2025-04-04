export const submitDonation = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    amount: number,
    frequency: string,
    isSubscribed: boolean,
    paymentMethod: string,
    selectedBank: string
) => {
    const payload: Record<string, any> = {
        nume: lastName,
        prenume: firstName,
        email,
        suma: amount,
        frecventa: frequency,
        metoda_plata: paymentMethod
    };

    if (paymentMethod === 'netopia') {
        if (!phone.trim()) {
            throw new Error("Telefonul este obligatoriu pentru Netopia.");
        }
        payload.telefon = phone;
    } else {
        payload.banca = selectedBank;
        if (phone.trim()) {
            payload.telefon = phone;
        }
    }

    try {
        const response = await fetch(`http://localhost:5000/api/donations/submit`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        });

        console.log("Raw API Response:", response);

        let data;
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }
            console.error('Eroare API:', data);
            throw new Error(data.message || data || 'Eroare necunoscută.');
        }

        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }
        return data;

    } catch (error) {
        console.error('Eroare la fetch:', error);
        throw error;
    }
};
