import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getProductsFetch } from '../api/getProductsFetch';
import Products from '../components/Products';

const Featured = () => {
    const [products, setProducts] = useState([]);

    // ✅ Cargar productos aleatorios
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getProductsFetch();
                const shuffled = allProducts.sort(() => 0.5 - Math.random()); // Mezcla aleatoria
                setProducts(shuffled.slice(0, 6)); // Muestra solo 6
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#ff2ed4]">
                    Productos Destacados
                </h2>

                {/* ✅ Swiper.js - Carrusel de productos aleatorios */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{ delay: 800, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="w-auto max-w-4xl mx-auto"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                                <img
                                    src={product.mainImage}
                                    alt={product.name}
                                    className="w-40 h-40 object-contain rounded-md"
                                />
                                <h3 className="text-lg font-semibold mt-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 font-bold mb-5">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ✅ Lista de todos los productos */}
            <div className="mt-10">
                <Products />
            </div>
        </>
    );
};

export default Featured;
