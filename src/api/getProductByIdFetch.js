export const getProductByIdFetch = async (id) => { // Se agrega `id` como parámetro
    const url = `http://localhost:5000/api/products/${id}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(url, params);

    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }

    return await response.json();
};
