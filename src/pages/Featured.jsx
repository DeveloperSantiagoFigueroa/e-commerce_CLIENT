import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getProductsFetch } from '../api/getProductsFetch';
import { getProductsByCategoryFetch } from '../api/getProductsByCategoryFetch';
import Products from '../components/Products';
import PublicidadAcademia from '../images/PublicidadAcademia.png';
import PublicidadHorsepower from '../images/PublicidadHorsepower.png';
const Featured = () => {
    const [sliderProducts, setSliderProducts] = useState([]);
    const [products, setProducts] = useState([]); // Productos mostrados en <Products />
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getProductsFetch();

                // Productos aleatorios solo para el slider
                setSliderProducts(
                    [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 6)
                );

                // Obtener categorías únicas
                const uniqueCategories = [
                    ...new Set(allProducts.map((p) => p.category)),
                ];
                setCategories(uniqueCategories);

                // Mostrar todos los productos inicialmente
                setProducts(allProducts);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            if (selectedCategory === '') {
                const allProducts = await getProductsFetch();
                setProducts(allProducts);
            } else {
                const filteredProducts = await getProductsByCategoryFetch(
                    selectedCategory
                );
                setProducts(filteredProducts);
            }
        };

        fetchCategoryProducts();
    }, [selectedCategory]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="w-full lg:w-3/4">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#ff2ed4]">
                    Productos Destacados
                </h2>

                {/* ✅ Swiper.js - Carrusel de productos aleatorios */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="w-auto max-w-4xl mx-auto"
                >
                    {sliderProducts.map((product) => (
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

                <div className="mt-6">
                    <label className="text-lg font-semibold text-gray-700">
                        Filtrar por categoría:
                    </label>
                    <select
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-10">
                    <Products category={selectedCategory} />
                </div>
            </div>

            <div className="w-full lg:w-1/4 hidden lg:block">
                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                        Publicidad
                    </h3>
                    
            
    
                    <img
                        src={PublicidadAcademia}
                        alt="Publicidad"
                        className="w-full rounded-md"
                    />
                </div>

                <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                        Publicidad
                    </h3>
                    <img
                        src={PublicidadHorsepower}
                        alt="Publicidad"
                        className="w-full rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Featured;
