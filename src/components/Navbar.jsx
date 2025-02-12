import React, { useState, useEffect, useRef, useContext } from 'react';
import Logo from '../images/LogoHeader.webp';
import MobileMenu from '../components/MobileMenu.jsx';
import ModalLogin from '../components/ModalLogin.jsx';
import ModalRegister from '../components/ModalRegister.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { getProductsFetch } from '../api/getProductsFetch';
import { Link } from 'react-router-dom';

const Navbar = ({
    openRegisterModal,
    openLoginModal,
    isMenuOpen,
    setIsMenuOpen,
}) => {
    const { user, logout } = useContext(AuthContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);

    // Obtener productos al cargar el Navbar
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsFetch();
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);

    // Filtrar productos en tiempo real
    useEffect(() => {
        if (searchTerm.length > 0) {
            const results = products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, products]);

    // Cierra la búsqueda si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsExpanded(false);
            }
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 z-50 bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] md:bg-none md:bg-[#2b2b7b] flex items-center justify-evenly md:justify-between md:px-15 lg:py-1 lg:justify-center lg:gap-8">
            <div className="left">
                <i
                    className={`bi ${
                        isMenuOpen ? 'bi-x' : 'bi-list'
                    } text-white text-[45px] lg:hidden`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                ></i>
                <Link to="/" className="hidden lg:block">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="hidden lg:block w-60 p-3 cursor-pointer"
                    />
                </Link>
            </div>

            {/* 🔍 Búsqueda con expansión y resultados dinámicos */}
            <div ref={searchRef} className="relative">
                <div
                    className={`p-1 overflow-hidden ${
                        isExpanded
                            ? 'w-[210px] md:w-[390px] lg:w-[450px] xl:w-[600px]'
                            : 'w-[40px] md:w-[320px] xl:w-[500px]'
                    } h-[40px] bg-white shadow-lg rounded-full flex items-center duration-300 cursor-pointer`}
                    onClick={() => setIsExpanded(true)}
                >
                    <i className="bi bi-search text-center ml-2"></i>
                    <input
                        placeholder="Buscar productos..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="outline-none text-[15px] bg-transparent w-full text-black px-4"
                    />
                </div>

                {/* 🔽 Resultados de búsqueda */}
                {searchTerm && (
                    <div className="absolute bg-white shadow-lg w-full max-h-60 overflow-y-auto mt-1 z-50 rounded">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Link
                                    key={product._id}
                                    to={`/products/${product._id}`}
                                    className="block p-2 hover:bg-gray-200"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setSearchTerm(""); 
                                        window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Hace scroll arriba
                                      }}
                                >
                                    {product.name}
                                </Link>
                            ))
                        ) : (
                            <p className="p-2 text-gray-500">
                                No se encontraron resultados.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="right flex gap-7 relative">
                <div className="relative hidden md:block" ref={dropdownRef}>
                    <i
                        className="bi bi-person-circle text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    ></i>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 flex flex-col items-center">
                            {user ? (
                                <>
                                    <button
                                        onClick={logout}
                                        className="w-full px-4 py-2 text-black hover:bg-gray-300"
                                    >
                                        Cerrar sesión
                                    </button>
                                    <button className="w-full px-4 py-2 text-black hover:bg-gray-300">
                                        Cambiar contraseña
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={openLoginModal}
                                        className="w-full px-4 py-2 text-black hover:bg-gray-300"
                                    >
                                        Ingresar
                                    </button>
                                    <button
                                        onClick={openRegisterModal}
                                        className="w-full px-4 py-2 text-black hover:bg-gray-300"
                                    >
                                        Crear cuenta
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative hidden md:block">
                    <i className="bi bi-heart text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"></i>
                </div>

                <div className="relative">
                    <i className="bi bi-cart text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"></i>
                </div>
            </div>

            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onRegisterClick={openRegisterModal}
                onLoginClick={openLoginModal}
            />

            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#00000057] bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Navbar;
