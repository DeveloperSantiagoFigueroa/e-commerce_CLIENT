import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getProductByIdFetch } from "../api/getProductByIdFetch";

const Favorites = () => {
    const { favorites, toggleFavorite } = useContext(AuthContext);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    // Cargar productos favoritos
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const products = await Promise.all(
                    favorites.map(async (id) => {
                        const product = await getProductByIdFetch(id);
                        return product;
                    })
                );
                setFavoriteProducts(products);
            } catch (error) {
                console.error("Error al obtener productos favoritos:", error);
            }
        };

        if (favorites.length > 0) {
            fetchFavorites();
        }
    }, [favorites]);

    // 🔥 Remover producto de favoritos usando toggleFavorite
    const handleRemoveFavorite = (id) => {
        toggleFavorite(id); // ✅ Alterna el estado global (lo quita si ya estaba agregado)
        setFavoriteProducts((prev) => prev.filter((p) => p._id !== id)); // ✅ Actualiza la UI en tiempo real
    };

    return (
        <>
            <div className="p-6 min-h-screen">
                <h1 className="text-3xl font-bold text-center text-gray-700">
                    Mis Favoritos ❤️
                </h1>

                {favoriteProducts.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">
                        No tienes productos en favoritos.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6 mt-6">
                        {favoriteProducts.map((product) => (
                            <div
                                key={product._id}
                                className="relative bg-white p-4 rounded-lg transition-all border border-gray-300"
                            >
                                {/* ❌ Botón para eliminar de favoritos */}
                                <button
                                    onClick={() => handleRemoveFavorite(product._id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-700 transition-all"
                                >
                                    ✕
                                </button>

                                <Link to={`/products/${product._id}`}>
                                    <img
                                        src={product.mainImage || "https://placehold.co/300x200"}
                                        alt={product.name || "Producto"}
                                        className="w-full h-32 object-contain rounded-md"
                                    />
                                    <h4 className="mt-2 text-center text-sm font-semibold">
                                        {product.name || "Producto sin nombre"}
                                    </h4>
                                    <p className="text-center text-pink-500 font-bold text-md">
                                        {product.price ? `$ ${product.price}` : "Precio no disponible"}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    
                )}
            </div>
        </>
    );
};

export default Favorites;
