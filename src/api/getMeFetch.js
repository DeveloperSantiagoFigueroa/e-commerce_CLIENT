export const getMeFetch = async (token) => {
    const response = await fetch("http://localhost:5000/api/user/me", {
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
        favorites: data.favorites || [], // ✅ Asegura que siempre tenga un array
        cart: data.cart || [], // ✅ Asegura que siempre tenga un array
    };
};
