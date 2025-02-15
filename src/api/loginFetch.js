export const loginFetch = async (data) => {
    const url = 'https://e-commerce-server-stkl.onrender.com/api/auth/login';

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.msg || 'Error en el login'); // Asegura que lanza un mensaje de error
    }

    return result;
};
