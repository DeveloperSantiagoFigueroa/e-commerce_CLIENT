import React, { useContext, useEffect, useState } from 'react';
import { getProductsFetch } from '../api/getProductsFetch';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// Productos por página en cada dispositivo
const ITEMS_PER_PAGE = {
    lg: 15, // Web: 3 filas x 5 productos
    md: 12, // Tablet: 4 filas x 3 productos
    sm: 10, // Celular: 5 filas x 2 productos
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE.lg);

    // Fetch de productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsFetch();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Cuando hice este codigo solo lo entendia dios y yo, ahora solo dios lo entiende
    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            setItemsPerPage(
                width >= 1024
                    ? ITEMS_PER_PAGE.lg
                    : width >= 768
                    ? ITEMS_PER_PAGE.md
                    : ITEMS_PER_PAGE.sm
            );
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    // Cálculo de paginación
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(start, start + itemsPerPage);

    // Resetear página si cambia el tamaño de pantalla
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);

    if (loading) return null;
    if (error) return <p className="text-center text-[30px]">Error: {error}</p>;

    return (
        <div className="p-4 bg-gradient-to-b from-[#ff2ad9] to-[#2b2b7b]">
            <ProductGrid products={currentProducts} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                onNext={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
            />
        </div>
    );
};

// **📌 Componente de la grilla de productos**
const ProductGrid = ({ products }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
);

// **📌 Componente de tarjeta de producto**
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, toggleFavorite, favorites } = useContext(AuthContext);
    const handleAddToCart = async (event) => {
        event.stopPropagation(); // ✅ Evita que haga `navigate` al hacer clic en el botón
        await addToCart(product._id);
    };

    const handleToggleFavorite = async (event) => {
        event.stopPropagation(); // ✅ Evita que haga `navigate` al hacer clic en el botón
        await toggleFavorite(product._id);
    };
    return (
        <div
            className="cursor-pointer bg-white p-4 rounded-[6px] shadow-lg flex flex-col justify-between"
            onClick={() => {
                navigate(`/products/${product._id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ Hace scroll arriba
            }}
        >
            <button
            //Quiero que este a la derecha de la tarjeta
                onClick={handleToggleFavorite}
                className={`cursor-pointer h-[35px] w-[35px]  hover:bg-red-300  rounded-full transition-all ${
                    favorites.includes(product._id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-red-500'
                }`}
            >
                <i
                    className={`bi ${
                        favorites.includes(product._id)
                            ? 'bi-heart-fill'
                            : 'bi-heart'
                    } text-[18px]`}
                ></i>
            </button>
            <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <p className="text-pink-500 font-bold text-lg">
                $USD {product.price}
            </p>
            <button
                className="bg-green-500 cursor-pointer text-white p-2 font-bold mt-2 rounded-[8px]"
                onClick={handleAddToCart} // ✅ Agrega al carrito
            >
                Agregar al carrito
            </button>
        </div>
    );
};

// **📌 Componente de paginación**
const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
    <div className="flex justify-center items-center mt-6 space-x-4">
        <PaginationButton onClick={onPrev} disabled={currentPage === 1}>
            ← Anterior
        </PaginationButton>

        <span className="font-semibold text-lg text-white">
            Página {currentPage} de {totalPages}
        </span>

        <PaginationButton
            onClick={onNext}
            disabled={currentPage === totalPages}
        >
            Siguiente →
        </PaginationButton>
    </div>
);

// **📌 Botón de paginación reutilizable**
const PaginationButton = ({ onClick, disabled, children }) => (
    <button
        className={`px-4 py-2 rounded ${
            disabled ? 'bg-gray-600' : 'bg-[#ff2ad9] hover:bg-[#ff61e3]'
        } text-white transition-colors`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Products;
