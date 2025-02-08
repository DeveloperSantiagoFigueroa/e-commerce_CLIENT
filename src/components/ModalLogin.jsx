import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginFetch } from '../api/loginFetch'; // Importa la función que hace la petición al backend

const ModalLogin = ({ onClose }) => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginFetch(formData);

            if (!res.token) {
                throw new Error(res.msg || 'Credenciales incorrectas');
            }

            await login(res.token);
            setSuccess(res.msg || 'Inicio de sesión exitoso');
            setError(''); // Resetea el mensaje de error
            onClose();
        } catch (err) {
            setError(err.message); // Captura correctamente el mensaje de error
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#2b2b7b] to-[#761663] flex flex-col px-6 gap-5 md:px-50 lg:px-90 xl:px-120 h-screen w-full overflow-y-auto">
            <div className="flex justify-end h-[50px] mt-5 md:mt-35">
                <i
                    onClick={onClose}
                    className="bi bi-x-circle text-red-500 text-[40px] cursor-pointer transition-transform duration-300 transform hover:rotate-90 flex items-center justify-center w-[50px] aspect-square"
                ></i>
            </div>

            <h1 className="text-white font-medium text-center text-[35px] -mt-8 ">
                Ingresar
            </h1>
            <hr className="text-white" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10">Email:</p>
                    <input
                        type="email"
                        placeholder="tu@correo.."
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all z-0 focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                    />
                </div>

                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10">Contraseña:</p>
                    <input
                        type="password"
                        placeholder="Contraseña.."
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all z-0 focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-pink-600 rounded-[5px] p-3 transition-all hover:shadow-[0px_0px_20px_1px_rgba(245,39,145,1)]"
                >
                    Iniciar sesión
                </button>
            </form>

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
                <a href="#" className="text-gray-400 text-center underline">
                    Olvidé mi contraseña
                </a>
                <a href="#" className="text-gray-400 text-center underline">
                    No tengo cuenta
                </a>
            </div>
        </div>
    );
};

export default ModalLogin;
