import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const MobileMenu = ({ isOpen, onClose, onRegisterClick, onLoginClick }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="lg:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] text-white shadow-lg z-50 overflow-y-auto" // Agrega overflow-y-auto
                >
                    {/* Botón de cierre (cruz) */}
                    <div className="flex justify-end p-4">
                        <i
                            className="bi bi-x text-white text-[50px] cursor-pointer hover:text-[#ff2ed4] transition-all"
                            onClick={onClose}
                        ></i>
                    </div>

                    {/* Opciones del menú */}

                    <ul className="flex flex-col text-start ml-10 gap-6 text-[20px] -mt-6">
                        {/* Sí no hay token en el localstorage (osea que no tiene sesión)
                        muestra los botones de Ingresar / Crear cuenta, caso contrario de que
                        si tenga un token y sesion ingresada, no los muestra. */}
                        {!user && (
                            <>
                                <button
                                    onClick={onLoginClick}
                                    className="flex cursor-pointer"
                                >
                                    <i className="bi bi-box-arrow-in-right text-[20px] mr-2 text-green-500"></i>
                                    Ingresar
                                </button>
                                <button
                                    onClick={onRegisterClick}
                                    className="flex cursor-pointer"
                                >
                                    <i className="bi bi-person-plus text-[20px] mr-2 text-green-500"></i>
                                    Crear cuenta
                                </button>
                            </>
                        )}
                        <Link to="/carrito">
                            <i className="bi bi-cart4 text-[20px] mr-2"></i>
                            Carrito
                        </Link>
                        <Link to="/favoritos">
                            <i className="bi bi-bag-heart text-[20px] mr-2"></i>
                            Favoritos
                        </Link>
                        <Link to="/mis-compras">
                            <i className="bi bi-wallet2 text-[20px] mr-2"></i>
                            Mis compras
                        </Link>
                        <Link to="/destacado">
                            <i className="bi bi-stars text-[20px] mr-2"></i>
                            Destacado
                        </Link>
                        <Link to="/contacto">
                            <i className="bi bi-telephone text-[20px] mr-2"></i>
                            Contacto
                        </Link>
                        <Link to="/ayuda">
                            <i className="bi bi-info-circle text-[20px] mr-2"></i>
                            Ayuda
                        </Link>
                        <Link to="/envios">
                            <i className="bi bi-truck text-[20px] mr-2"></i>
                            Envíos
                        </Link>
                        {/* El botón de cerrar sesión solo es visible para aquellos que si tienen una sesión iniciada */}
                        {user && (
                            <button
                                onClick={logout}
                                className="flex cursor-pointer"
                            >
                                <i className="bi bi-escape text-[20px] mr-2 text-red-500"></i>
                                Cerrar sesión
                            </button>
                        )}

                        <div className="flex flex-col text-gray-400 text-[15px] gap-5 border-t-1 border-gray-600 mr-10">
                            <Link
                                to="/reestablecer-contraseña"
                                className="mt-6"
                            >
                                Ólvide mi contraseña
                            </Link>
                            <Link to="/como-comprar">Como comprar</Link>
                            <Link to="/terminos-y-condiciones">
                                Términos y condiciones
                            </Link>
                            <Link to="/empresa" className="pb-5">
                                Acerca de nosotros
                            </Link>
                        </div>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
