export const getProductByIdFetch = async (id) => { 
    const url = `https://e-commerce-client-sable.vercel.app/api/products/${id}`;
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
