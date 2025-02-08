import React, { useState, useEffect, useRef, useContext } from 'react';
import Logo from '../images/LogoHeader.webp';
import MobileMenu from '../components/MobileMenu.jsx';
import ModalLogin from '../components/ModalLogin.jsx';
import ModalRegister from '../components/ModalRegister.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = ({
    openRegisterModal,
    openLoginModal,
    closeRegisterModal, // Recibe las props
    closeLoginModal, // Recibe las props
    isMenuOpen,
    setIsMenuOpen,
}) => {
    const { user, logout } = useContext(AuthContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);

    //TODO: Terminar esto
    const cartAmount = 0;
    const favouriteAmount = 0;

    const handleSearchClick = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Usa la prop pasada desde Layout
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Agrega y elimina un event listener para detectar clics fuera del campo.
    useEffect(() => {
        // Función que colapsa el campo de búsqueda si el clic fue fuera de él.
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
        
        <div className="bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] md:bg-none md:bg-[#2b2b7b] flex items-center justify-evenly md:justify-between md:px-15 lg:py-1 lg:justify-center lg:gap-8">
            <div className="left">
                {/* Al hacer click activa el toggleMenu que le cambia el valor al contrario que tenga. Si es verdadero pone una cruz, caso contrario el logo de list */}
                <i
                    className={`bi ${
                        isMenuOpen ? 'bi-x' : 'bi-list'
                    } text-white text-[45px] lg:hidden`}
                    onClick={toggleMenu}
                ></i>
                <img
                    src={Logo}
                    alt=""
                    className="hidden lg:block w-60 p-3 cursor-pointer"
                />
            </div>
            <div
                ref={searchRef}
                className={`p-1 overflow-hidden ${
                    isExpanded
                        ? 'w-[210px] md:w-[390px] lg:w-[450px] xl:w-[600px]'
                        : 'w-[40px] md:w-[320px] xl:w-[500px]'
                } h-[40px] bg-white shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300`}
                onClick={handleSearchClick}
            >
                <div>
                    <i className="bi bi-search text-center ml-2"></i>
                </div>
                <input
                    placeholder="Buscar"
                    type="text"
                    className="outline-none text-[15px] bg-transparent w-full text-black font-normal px-4"
                />
            </div>

            <div className="right flex gap-7 relative">
                <div className="relative hidden md:block" ref={dropdownRef}>
                    <i
                        className="bi bi-person-circle text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"
                        onClick={toggleDropdown}
                    ></i>

                    {isDropdownOpen && (
                        <div className="select-none absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 flex flex-col justify-center align-center items-center">
                            {user && (
                                <>
                                    <button
                                        onClick={logout}
                                        className=" w-[100%] cursor-pointer text-center px-4 py-2 text-black hover:bg-gray-300 transition-all"
                                    >
                                        Cerrar sesión
                                    </button>
                                    <button className=" w-[100%] cursor-pointer text-center px-4 py-2 text-black hover:bg-gray-300 transition-all">
                                        Cambiar contraseña
                                    </button>
                                </>
                            )}

                            {!user && (
                                <>
                                    <button onClick={openLoginModal} className=" w-[100%] cursor-pointer text-center px-4 py-2 text-black hover:bg-gray-300 transition-all">
                                        Ingresar
                                    </button>
                                    <button onClick={openRegisterModal} className=" w-[100%] cursor-pointer text-center px-4 py-2 text-black hover:bg-gray-300 transition-all">
                                        Crear cuenta
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative hidden md:block">
                    <p
                        className={`${
                            favouriteAmount > 0 ? '' : 'hidden'
                        } bg-white text-black text-center text-[14px] font-medium flex justify-center items-center w-5 h-5 rounded-full absolute right-5`}
                    >
                        {/* //TODO: Terminar esto */}
                        {favouriteAmount}
                    </p>
                    <i className="hidden md:block bi bi-heart text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"></i>
                </div>

                <div className="relative">
                    <p
                        className={`${
                            cartAmount > 0 ? '' : 'hidden'
                        } bg-white text-black text-center text-[14px] font-medium flex justify-center items-center w-5 h-5 rounded-full absolute right-5`}
                    >
                        {/* //TODO: Terminar esto */}
                        {cartAmount}
                    </p>
                    <i className="bi bi-cart text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"></i>
                </div>
            </div>
            {/* Pasa la función toggleMenu como prop onClose */}
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={toggleMenu}
                onRegisterClick={openRegisterModal}
                onLoginClick={openLoginModal}
            />

            {/* Overlay para cerrar el menú */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-[#00000057] bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMenu}
                ></div>
            )}
        </div>
    );
};

export default Navbar;
