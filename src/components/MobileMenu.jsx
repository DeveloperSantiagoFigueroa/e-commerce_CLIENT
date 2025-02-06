import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
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
                    <ul className="flex flex-col text-start ml-10 gap-6 text-[20px]">
                        <Link to="/carrito">Carrito</Link>
                        <Link to="/favoritos">Favoritos</Link>
                        <Link to="/mis-compras">Mis compras</Link>
                        <Link to="/destacado">Destacado</Link>
                        <Link to="/contacto">Contacto</Link>
                        <Link to="/ayuda">Ayuda</Link>
                        <Link to="/ingresar">Ingresar</Link>
                        <Link to="/registro">Crear cuenta</Link>
                        <Link to="/envios">Envíos</Link>
                        
                        <div className='flex flex-col text-gray-400 text-[15px] gap-5 border-t-1 border-gray-600 mr-10'>
                            <Link to="/reestablecer-contraseña" className='mt-6'>Ólvide mi contraseña</Link>
                            <Link to="/como-comprar">Como comprar</Link>
                            <Link to="/terminos-y-condiciones">Términos y condiciones</Link>
                            <Link to="/empresa" className='pb-5'>Acerca de nosotros</Link>
                        </div>
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
