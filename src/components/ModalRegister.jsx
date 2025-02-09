import React, { useContext, useState } from 'react';
import { registerFetch } from '../api/registerFetch';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const ModalRegister = ({ onClose, openLoginModal }) => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(formData.email)) {
            setError('El email no es válido');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const res = await registerFetch(formData);
            await login(res.token);
            localStorage.setItem('token', res.token);
            setSuccess(res.msg);
            setError(false);
            onClose();
        } catch (error) {
            setError(error.msg);
            setSuccess(false);
        }
    };

    const handleLoginClick = () => {
        onClose();
        openLoginModal();
    };

    return (
        <div className="bg-gradient-to-b from-[#2b2b7b] to-[#761663] flex flex-col px-6 gap-5 md:px-50 lg:px-90 xl:px-120 h-screen w-full overflow-y-auto">
            <div className="flex justify-end h-[50px] mt-5">
                <i
                    onClick={onClose}
                    className="bi bi-x-circle text-red-500 text-[40px] cursor-pointer transition-transform duration-300 transform hover:rotate-90 flex items-center justify-center w-[50px] aspect-square"
                ></i>
            </div>

            <h1 className="text-white font-medium text-center text-[35px] -mt-8">
                Registrate
            </h1>
            <hr className="text-white" />

            <div className="flex flex-col gap-7">
                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10">Nombre:</p>
                    <input
                        type="text"
                        placeholder="Nombre.."
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="border-2 border-pink-600 px-2 py-1 w-full  rounded-[5px] outline-none transition-all z-0 focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                    />
                </div>

                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10 ">Apellido:</p>
                    <input
                        type="text"
                        placeholder="Apellido.."
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="border-2 border-pink-600 px-2 py-1 w-full  rounded-[5px] outline-none transition-all z-0 focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                    />
                </div>

                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10 ">Email:</p>
                    <input
                        type="email"
                        placeholder="tu@correo.."
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-2 border-pink-600 px-2 py-1 w-full  rounded-[5px] outline-none transition-all z-0 focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                    />
                </div>

                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10 ">Contraseña:</p>
                    <input
                        type="password"
                        placeholder="Contraseña.."
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border-2 border-pink-600 px-2 py-1 w-full  rounded-[5px] outline-none transition-all z-0 focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                    />
                </div>

                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10 ">Repetir contraseña:</p>
                    <input
                        type="password"
                        placeholder="Contraseña.."
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="border-2 border-pink-600 px-2 py-1 w-full  rounded-[5px] outline-none transition-all z-0 focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                    />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="text-white bg-pink-600 rounded-[5px] p-3 transition-all hover:shadow-[0px_0px_20px_1px_rgba(245,39,145,1)]"
            >
                Registrarse
            </button>
            {error && (
                <p className="text-white bg-red-500 p-2 text-center font-medium">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-white bg-green-500 p-2 text-center font-medium">
                    {success}
                </p>
            )}

            <div className="flex flex-col mb-10">
                <button onClick={handleLoginClick} className="cursor-pointer text-gray-400 text-center underline">
                    Ya tengo cuenta
                </button>
                <Link to='/forgot-password' onClick={onClose} className='text-gray-400 text-center underline'>Ólvide mi contraseña</Link>
            </div>
        </div>
    );
};

export default ModalRegister;
