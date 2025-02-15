const API_URL = "https://e-commerce-client-sable.vercel.app/api/user/cart"; // Ajusta la URL si es necesario

export const addToCartFetch = async (productId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
        throw new Error("Error al agregar al carrito");
    }

    return await response.json();
};

export const removeFromCartFetch = async (productId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
        throw new Error("Error al eliminar producto del carrito");
    }

    return await response.json();
};

export const clearCartFetch = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/clear`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });

    if (!response.ok) {
        throw new Error("Error al vaciar el carrito");
    }

    return await response.json();
};
