import React from 'react';
import Logo from '../images/Logo.webp';
import LogoQR from '../images/qr.webp';
import { Link } from 'react-router-dom';
const Footer = ({openRegisterModal}) => {
    return (
        <footer className="bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] py-15 df">
            {/* Layout Desktop */}
            <div className="hidden md:flex justify-evenly text-white">
                <div className="">
                    <img src={Logo} className="w-20 mt-5" />
                </div>

                <div className="flex flex-col">
                    <Link to="/" className="hover:underline">
                        Ayuda
                    </Link>
                    <p onClick={openRegisterModal} className="hover:underline cursor-pointer">
                        Crear cuenta
                    </p>
                    <Link to='/' className="hover:underline">
                        Ingresar
                    </Link>
                    <Link to='/' className="hover:underline">
                        Soporte
                    </Link>
                    <Link to='/' className="hover:underline">
                        Ólvide mi contraseña
                    </Link>
                </div>
                <div className="flex flex-col">
                    <Link to='/' className="hover:underline">
                        Ofertas
                    </Link>
                    <Link to='/' className="hover:underline">
                        Envíos
                    </Link>
                    <Link to='/' className="hover:underline">
                        Términos y condiciones
                    </Link>
                    <Link to='/' className="hover:underline">
                        Reportar
                    </Link>
                    <Link to='/' className="hover:underline">
                        Como comprar
                    </Link>
                </div>
                <div className="grid grid-cols-2 text-[25px] gap-0.5 items-center">
                    <i className="bi bi-whatsapp hover:cursor-pointer text-center"></i>
                    <i className="bi bi-instagram hover:cursor-pointer text-center"></i>
                    <i className="bi bi-twitter-x hover:cursor-pointer text-center"></i>
                    <i className="bi bi-facebook hover:cursor-pointer text-center"></i>
                    <img src={LogoQR} className="w-10 ml-3" />
                </div>
                <div className="flex flex-col">
                    <Link to='/' className="hover:underline">
                        Política de privacidad
                    </Link>
                    <Link to='/' className="hover:underline">
                        Cookies
                    </Link>
                    <Link to='/' className="hover:underline">
                        Acerca de nosotros
                    </Link>
                    <Link to='/' className="hover:underline">
                        Contacto
                    </Link>
                </div>
            </div>

            {/* Layout Mobile */}
            <div className="md:hidden">
                <div className="flex justify-center gap-3 text-[30px] text-white">
                    <i className="bi bi-whatsapp"></i>
                    <i className="bi bi-instagram"></i>
                    <i className="bi bi-twitter-x"></i>
                    <i className="bi bi-facebook"></i>
                </div>

                <div className="flex justify-center">
                    <img src={Logo} className="w-20 mt-5" />
                </div>
            </div>
        </footer>

        
    );
};

export default Footer;
