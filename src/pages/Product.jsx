import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByIdFetch } from '../api/getProductByIdFetch';
const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductByIdFetch(id); // ✅ Pasar `id`
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading)
        return (
            <div className="my-40 text-center">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="animate-ping"
                        >
                        </svg>
                    </div>
                </div>
            </div>
        );
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="m-5 flex flex-col gap-4 justify-between md:gap-10 md:mx-40">
            <div className="relative">
                <img
                    src={product.mainImage}
                    alt={product.name}
                    className="rounded-[10px] h-40 object-contain w-full"
                />

                {/* ❤️ Ícono de favoritos (sin funcionalidad aún) */}
                <button className="absolute top-2 right-2 bg-red-600 h-[40px] w-[40px] rounded-[100%] text-white hover:text-red-500 transition-all text-[25px]">
                    <i className="bi bi-heart  rounded-[100%]"></i>
                </button>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-[30px]">{product.name}</h2>
                <p className="text-gray-700 text-[14px]">
                    {product.description}
                </p>
                <p className="font-bold text-[20px]">$USD {product.price}</p>
            </div>

            <button className="bg-green-400 rounded-[8px] text-white px-2 py-3 cursor-pointer">
                Agregar al carrito
            </button>
        </div>
    );
};

export default Product;
