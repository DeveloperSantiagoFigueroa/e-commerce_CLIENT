import React from 'react';

const ModalLogin = ({ onClose }) => {
    return (
        <div className="bg-gradient-to-b from-[#2b2b7b] to-[#761663] flex flex-col px-6 gap-5 md:px-50 lg:px-90 xl:px-120 h-screen w-full overflow-y-auto">
            <div className="flex justify-end h-[50px] mt-5">
                <i onClick={onClose} className="bi bi-x-circle text-red-500 text-[40px] cursor-pointer transition-transform duration-300 transform hover:rotate-90 flex items-center justify-center w-[50px] aspect-square"></i>
            </div>

            <h1 className="text-white font-medium text-center text-[35px] -mt-8">
                Iniciar Sesión
            </h1>
            <hr className="text-white" />

            <div className="flex flex-col gap-7">
                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10">Email:</p>
                    <input type="email" placeholder="tu@correo.." className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all" />
                </div>

                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10 ">Contraseña:</p>
                    <input type="password" placeholder="Contraseña.." className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all" />
                </div>
            </div>

            <button className="text-white bg-pink-600 rounded-[5px] p-3 transition-all hover:shadow-md">
                Ingresar
            </button>

            <div className="flex flex-col mb-10">
                <a href="#" className="text-gray-400 text-center underline">
                    Olvidé mi contraseña
                </a>
            </div>
        </div>
    );
};

export default ModalLogin;
