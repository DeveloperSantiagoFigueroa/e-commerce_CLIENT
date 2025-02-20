import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const SubNav = ({ openRegisterModal, openLoginModal }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="hidden sticky md:top-[67px]  lg:top-[86px] xl:top-[84px] z-40 -mt-1 bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] md:flex justify-center gap-25 p-4 text-white font-medium">
            <div className="flex gap-5">
                <Link
                    to="/destacados"
                    className="hover:text-[#ff2ed4] transition-all"
                >
                    Destacados
                </Link>
                <Link to="/contacto" className="hover:text-[#ff2ed4] transition-all">
                    Contacto
                </Link>
                <Link
                    to="/favoritos"
                    className="hover:text-[#ff2ed4] transition-all"
                >
                    Favoritos
                </Link>
                <Link to="/ayuda" className="hover:text-[#ff2ed4] transition-all">
                    Ayuda
                </Link>
            </div>

            <div className="flex gap-5">
                {/* Solo se muestra para ingresar o crear cuenta si no esta logeado */}
                {!user && (
                    <>
                        <button
                            onClick={openRegisterModal}
                            className="bg-[#ff2ed4] rounded-[20px] px-3 hover:bg-purple-800 transition-all"
                        >
                            Crea tu cuenta
                        </button>
                        <button
                            onClick={openLoginModal}
                            className="hover:text-[#ff2ed4] transition-all"
                        >
                            Ingresar
                        </button>
                    </>
                )}

                {/* Si esta logeado muestra Mis compras */}
                {user && (
                    <>
                        <p className="font-medium text-pink-500">{`${user.firstname} ${user.lastname}`}</p>
                        <a
                            href="#"
                            className="hover:text-[#ff2ed4] hover:cursor-not-allowed transition-all"
                        >
                            Mis compras
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubNav;
