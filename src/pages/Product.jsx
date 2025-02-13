import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductByIdFetch } from '../api/getProductByIdFetch';
import { getProductsFetch } from '../api/getProductsFetch';
import { addFavouriteFetch, getFavoritesFetch } from '../api/getFavoritesFetch';
import { AuthContext } from '../context/AuthContext';

const Product = () => {
    const { favorites, toggleFavorite } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductByIdFetch(id);
                setProduct(data);
                setSelectedImage(data.mainImage);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchMoreProducts = async () => {
            try {
                const data = await getProductsFetch();
                setProducts(data.filter((p) => p._id !== id));
            } catch (err) {
                console.error('Error al cargar más productos:', err);
            }
        };

        fetchProduct();
        fetchMoreProducts();
    }, [id]);

    const handleFavoriteClick = async () => {
        await toggleFavorite(id); // ✅ Llamamos directamente la función del contexto
    };
    

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-20 h-20 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );

    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="m-5 flex flex-col gap-8 md:mx-20 lg:mx-40 xl:mx-60">
            {/* ✅ Contenedor principal del producto */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Miniaturas en fila (sm, md) y columna (lg) */}
                <div className="hidden lg:flex flex-col gap-2 w-[120px]">
                    {[product.mainImage, ...product.images].map(
                        (img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Miniatura"
                                onClick={() => setSelectedImage(img)}
                                className={`w-full aspect-square object-cover rounded-md cursor-pointer border-2 ${
                                    selectedImage === img
                                        ? 'border-blue-500'
                                        : 'border-gray-300'
                                } transition-all hover:opacity-75`}
                            />
                        )
                    )}
                </div>

                {/* Imagen principal */}
                <div className="relative w-full lg:w-[600px]">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="rounded-[10px] w-full aspect-[16/9] object-contain"
                    />

                    {/* Ícono de favoritos */}
                    <button
                        onClick={handleFavoriteClick}
                        className={`cursor-pointer absolute top-2 right-2 h-[40px] w-[40px] flex items-center justify-center rounded-full transition-all ${
                            favorites.includes(id)
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-red-500'
                        }`}
                    >
                        <i
                            className={`bi ${
                                favorites.includes(id)
                                    ? 'bi-heart-fill'
                                    : 'bi-heart'
                            } text-[22px]`}
                        ></i>
                    </button>
                </div>

                {/* Miniaturas debajo de la imagen en móvil */}
                <div className="flex lg:hidden gap-2 justify-center mt-3">
                    {[product.mainImage, ...product.images].map(
                        (img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Miniatura"
                                onClick={() => setSelectedImage(img)}
                                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-md cursor-pointer border-2 ${
                                    selectedImage === img
                                        ? 'border-blue-500'
                                        : 'border-gray-300'
                                } transition-all hover:opacity-75`}
                            />
                        )
                    )}
                </div>

                {/* Información del producto */}
                <div className="flex flex-col gap-3 lg:w-[400px]">
                    <h2 className="font-bold text-[30px]">{product.name}</h2>
                    <p className="text-gray-700 text-[14px]">
                        {product.description}
                    </p>
                    <p className="font-bold text-[20px]">
                        $USD {product.price}
                    </p>

                    {/* Botón de agregar al carrito */}
                    <button className="bg-green-500 hover:bg-green-600 rounded-[8px] text-white px-4 py-3 cursor-pointer transition-all">
                        Agregar al carrito
                    </button>
                </div>
            </div>

            {/* ✅ Sección "Ver más productos" - Ahora SIEMPRE estará debajo */}
            <div className="w-full mt-20">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-5">
                    Ver más productos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.slice(0, 8).map((p) => (
                        <div
                            key={p._id}
                            className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all"
                            onClick={() => {
                                navigate(`/products/${p._id}`);
                                window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ Hace scroll al inicio
                            }}
                        >
                            <img
                                src={p.mainImage}
                                alt={p.name}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <h4 className="mt-2 text-center text-sm font-semibold">
                                {p.name}
                            </h4>
                            <p className="text-center text-pink-500 font-bold text-md">
                                $USD {p.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
