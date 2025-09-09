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
        metoda_plata: paymentMethod,
    };

    if (paymentMethod === 'smartpay') {
        payload.banca = selectedBank;
    }

    payload.telefon = phone?.trim() || '';
    if (paymentMethod === 'netopia' && !payload.telefon) {
        throw new Error("Telefonul este obligatoriu pentru Netopia.");
    }

    try {
        const response = await fetch(`http://localhost:5000/api/donations/submit`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        });

        const contentType = response.headers.get("content-type");
        let data;

        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        console.log(data);
        if (!response.ok) {
            console.error('Eroare API:', data);
            throw new Error(data?.message || data || 'Eroare necunoscută.');
        }

        return data;

    } catch (error) {
        console.error('Eroare la fetch:', error);
        throw error;
    }

};

export const getSmartPayBanks = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/donations/smartpay/banks`);

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Eroare la obținerea băncilor SmartPay.');
        }

        const data = await response.json();

        if (data.status !== 200 || !data.payload) {
            throw new Error('Răspuns invalid de la server.');
        }

        return data.payload;
    } catch (error) {
        console.error("Eroare la încărcarea băncilor SmartPay:", error);
        throw error;
    }
};

