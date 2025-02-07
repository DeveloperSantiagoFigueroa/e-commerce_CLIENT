import React from 'react';
import Logo from '../images/Logo.webp';
import LogoQR from '../images/qr.webp';
const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] py-15">
            {/* Layout Desktop */}
            <div className="hidden md:flex justify-evenly text-white">
                <div className="">
                    <img src={Logo} className="w-20 mt-5" />
                </div>

                <div className="flex flex-col">
                    <a href="#" className="hover:underline">
                        Ayuda
                    </a>
                    <a href="#" className="hover:underline">
                        Crear cuenta
                    </a>
                    <a href="#" className="hover:underline">
                        Ingresar
                    </a>
                    <a href="#" className="hover:underline">
                        Soporte
                    </a>
                    <a href="#" className="hover:underline">
                        Ólvide mi contraseña
                    </a>
                </div>
                <div className="flex flex-col">
                    <a href="#" className="hover:underline">
                        Ofertas
                    </a>
                    <a href="#" className="hover:underline">
                        Envíos
                    </a>
                    <a href="#" className="hover:underline">
                        Términos y condiciones
                    </a>
                    <a href="#" className="hover:underline">
                        Reportar
                    </a>
                    <a href="#" className="hover:underline">
                        Como comprar
                    </a>
                </div>
                <div className="grid grid-cols-2 text-[25px] gap-0.5 items-center">
                    <i className="bi bi-whatsapp hover:cursor-pointer text-center"></i>
                    <i className="bi bi-instagram hover:cursor-pointer text-center"></i>
                    <i className="bi bi-twitter-x hover:cursor-pointer text-center"></i>
                    <i className="bi bi-facebook hover:cursor-pointer text-center"></i>
                    <img src={LogoQR} className="w-10 ml-3" />
                </div>
                <div className="flex flex-col">
                    <a href="#" className="hover:underline">
                        Política de privacidad
                    </a>
                    <a href="#" className="hover:underline">
                        Cookies
                    </a>
                    <a href="#" className="hover:underline">
                        Acerca de nosotros
                    </a>
                    <a href="#" className="hover:underline">
                        Contacto
                    </a>
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
