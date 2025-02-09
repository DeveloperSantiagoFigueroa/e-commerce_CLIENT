import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getProductsFetch } from "../api/getProductsFetch";

// Cantidad de productos por página
const itemsPerPage = {
  lg: 15, // 3 filas con 5 productos cada una = 15
  md: 12, // 4 filas con 3 productos cada una = 12
  sm: 10, // 5 filas con 2 produtos cada una = 10
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage.lg);

  // Fetch de productos con manejo de errores
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchProducts = async () => {
      try {
        const data = await getProductsFetch(controller.signal);
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // Manejo responsive con debounce
  const updateItemsPerPage = useCallback(() => {
    const width = window.innerWidth;
    setItemsPerPageState(
      width >= 1024 ? itemsPerPage.lg :
      width >= 768 ? itemsPerPage.md :
      itemsPerPage.sm
    );
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [updateItemsPerPage]);

  // Cálculos memorizados
  const totalPages = useMemo(
    () => Math.ceil(products.length / itemsPerPageState),
    [products.length, itemsPerPageState]
  );

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPageState;
    return products.slice(start, start + itemsPerPageState);
  }, [currentPage, itemsPerPageState, products]);

  // Resetear página al cambiar tamaño
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPageState]);

  // Componentes de estado
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-gradient-to-b from-[#ff2ad9] to-[#2b2b7b]">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
      />
    </div>
  );
};

// Componente de tarjeta separado
const ProductCard = ({ product }) => (
  <div className="bg-white border p-4 rounded shadow-lg">
    <img
      src={product.mainImage}
      alt={product.name}
      className="w-full h-40 object-cover mb-2"
    />
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-gray-500 text-sm">{product.description}</p>
    <p className="text-pink-500 font-bold text-lg">$USD {product.price}</p>
  </div>
);

// Componente de paginación separado
const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
  <div className="flex justify-center items-center mt-6 space-x-4">
    <PaginationButton
      onClick={onPrev}
      disabled={currentPage === 1}
    >
      ← Anterior
    </PaginationButton>

    <span className="font-semibold text-lg">
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

// Botón reutilizable
const PaginationButton = ({ onClick, disabled, children }) => (
  <button
    className={`px-4 py-2 rounded ${
      disabled ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-700"
    } text-white transition-colors`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Products;