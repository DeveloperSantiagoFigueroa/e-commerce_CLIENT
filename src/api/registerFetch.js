export const registerFetch = async (data) => {
    const url = 'http://localhost:5000/api/auth/register';

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 201) throw result;

    return result;
};
