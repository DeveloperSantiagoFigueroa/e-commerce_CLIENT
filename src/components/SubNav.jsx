import React from 'react';

const SubNav = ({ openRegisterModal }) => {
    return (
        <div className="hidden -mt-1 bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] md:flex justify-center gap-25 p-4 text-white font-medium">
            <div className='flex gap-5'>
                <a href="#" className='hover:text-[#ff2ed4] transition-all'>Destacado</a>
                <a href="#" className='hover:text-[#ff2ed4] transition-all'>Contacto</a>
                <a href="#" className='hover:text-[#ff2ed4] transition-all'>Favoritos</a>
                <a href="#" className='hover:text-[#ff2ed4] transition-all'>Ayuda</a>
            </div>

            <div className='flex gap-5'>
                <button onClick={openRegisterModal} className='bg-[#ff2ed4] rounded-[20px] px-3 hover:bg-purple-800 transition-all'>
                    Crea tu cuenta
                </button>
                <a href="#" className='hover:text-[#ff2ed4] transition-all'>Ingresar</a>
                <a href="#" className='hover:text-[#ff2ed4] transition-all'>Mis compras</a>
            </div>
        </div>
    );
};

export default SubNav;