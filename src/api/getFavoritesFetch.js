export const getFavoritesFetch = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('https://e-commerce-server-stkl.onrender.com/api/user/favorite', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    if (!response.ok) throw new Error('Error al obtener favoritos');

    return await response.json();
};
export const addFavouriteFetch = async (productId) => {
    const token = localStorage.getItem("token");

    const response = await fetch("https://e-commerce-server-stkl.onrender.com/api/user/favorite", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token, 
        },
        body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al actualizar favoritos");
    }

    return await response.json();
};
