import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SubNav from '../components/SubNav';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ModalRegister from '../components/ModalRegister';
import ModalLogin from '../components/ModalLogin';
const Layout = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Añade este estado

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsMenuOpen(false); // Cierra el menú móvil
    };

    const closeRegisterModal = () => setIsRegisterModalOpen(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsMenuOpen(false); // 👈 Añade esta línea
    };
    const closeLoginModal = () => setIsLoginModalOpen(false);

    return (
        <div>
            <Navbar
                openRegisterModal={openRegisterModal}
                openLoginModal={openLoginModal}
                closeRegisterModal={closeRegisterModal} // Añade estas props
                closeLoginModal={closeLoginModal} // Añade estas props
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
            <SubNav
                openRegisterModal={openRegisterModal}
                openLoginModal={openLoginModal}
            />
            <Outlet />
            <Footer openRegisterModal={openRegisterModal} openLoginModal={openLoginModal} />
            {isRegisterModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 h-screen w-screen overflow-y-auto">
                    <div className="w-full h-full flex justify-center">
                        <ModalRegister onClose={closeRegisterModal} openLoginModal={openLoginModal} />
                    </div>
                </div>
            )}
            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 h-screen w-screen overflow-y-auto">
                    <div className="w-full h-full flex justify-center">
                        <ModalLogin onClose={closeLoginModal} openRegisterModal={openRegisterModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
