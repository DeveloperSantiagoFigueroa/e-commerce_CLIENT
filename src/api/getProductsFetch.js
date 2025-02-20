export const getProductsFetch = async () => {
    const url = "https://e-commerce-server-stkl.onrender.com/api/products";
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(url, params);
    // (!response.ok) -> Osea que si la respuesta es diferente a los códigos de éxito (200-299) significa que algo malo paso
    if (!response.ok) {
        throw new Error("Error al obtener los productos");
    }

    return await response.json();
};
