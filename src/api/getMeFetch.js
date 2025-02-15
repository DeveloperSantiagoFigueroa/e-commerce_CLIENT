export const getMeFetch = async (token) => {
    const response = await fetch("https://e-commerce-client-sable.vercel.app/api/user/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener el usuario");
    }

    const data = await response.json();
    return {
        ...data,
        favorites: data.favorites || [], 
        cart: data.cart || [], 
    };
};
