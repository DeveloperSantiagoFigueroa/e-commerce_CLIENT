import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SubNav from '../components/SubNav';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ModalRegister from '../components/ModalRegister';

const Layout = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <div>
            <Navbar 
                isRegisterModalOpen={isRegisterModalOpen} 
                openRegisterModal={openRegisterModal} 
                closeRegisterModal={closeRegisterModal} 
            />
            <SubNav openRegisterModal={openRegisterModal} />
            <Outlet />
            <Footer />
            {isRegisterModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 h-screen w-screen overflow-y-auto">
                    <div className="w-full h-full flex justify-center">
                        <ModalRegister onClose={closeRegisterModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;