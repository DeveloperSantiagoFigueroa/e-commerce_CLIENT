export const getProductsFetch = async () => {
    const url = "http://localhost:5000/api/products";
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
