export const getMeFetch = async (token) => {
    const url = 'http://localhost:5000/api/user/me';
    const params = {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
};
