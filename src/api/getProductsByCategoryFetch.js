export const getProductsByCategoryFetch = async (category) => {
    const url = `https://e-commerce-server-stkl.onrender.com/api/products/category/${category}`;
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener productos por categoría");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getProductsByCategoryFetch:", error);
        return [];
    }
};
