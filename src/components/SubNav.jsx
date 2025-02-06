import React from 'react';

const SubNav = () => {
    return (
        <div className="hidden -mt-1 bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] md:flex justify-center gap-25 p-4 text-white font-medium">
            <div className='flex gap-5'>
                <a href="#">Destacado</a>
                <a href="#">Contacto</a>
                <a href="#">Favoritos</a>
                <a href="#">Ayuda</a>
            </div>

            <div className='flex gap-5'>
                <a href="#" className='bg-[#ff2ed4] rounded-[20px] px-3'>Crea tu cuenta</a>
                <a href="#">Ingresar</a>
                <a href="#">Mis compras</a>
            </div>
        </div>
    );
};

export default SubNav;
