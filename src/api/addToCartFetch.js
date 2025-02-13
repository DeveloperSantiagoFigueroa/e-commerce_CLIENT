export const addToCartFetch = async (productId) => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/user/cart", {
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
