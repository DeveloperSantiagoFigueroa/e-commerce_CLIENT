import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resetPasswordFetch } from '../api/resetPasswordFetch.js'; // Función para enviar datos al backend

const ResetPassword = () => {
    const { token } = useParams(); // Obtiene el token de la URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
    
        console.log("Token que se enviará:", token); // Verificar si el token llega
    
        if (!token) {
            setError("Token no válido.");
            setLoading(false);
            return;
        }
    
        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            setLoading(false);
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }
    
        try {
            const res = await resetPasswordFetch({ token, password });
            setSuccess(res.msg || "Contraseña restablecida con éxito.");
        } catch (err) {
            setError(err.message || "Error al restablecer la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#1b1b51] to-[#761663] flex flex-col px-6 gap-5 md:px-50 lg:px-90 xl:px-120 h-screen w-full overflow-y-auto">
            <div className="flex justify-end h-[50px] mt-5 md:mt-35">
                <Link
                    to="/"
                    className="bi bi-x-circle text-red-500 text-[40px] cursor-pointer transition-transform duration-300 transform hover:rotate-90 flex items-center justify-center w-[50px] aspect-square md:-mt-10"
                />
            </div>

            <h1 className="text-white font-medium text-center text-[35px] -mt-8">
                Restablecer Contraseña
            </h1>
            <hr className="text-white" />

            <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10">Nueva Contraseña:</p>
                    <input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                        required
                    />
                </div>

                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10">Confirmar Contraseña:</p>
                    <input
                        type="password"
                        placeholder="Repite la contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all focus:shadow-[0px_0px_20px_0px_rgba(245,39,145,1)]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`text-white bg-pink-600 rounded-[5px] p-3 transition-all hover:shadow-[0px_0px_20px_1px_rgba(245,39,145,1)] ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Restablecer Contraseña'}
                </button>
            </form>

            {error && <p className="text-white bg-red-500 p-2 text-center font-medium">{error}</p>}
            {success && <p className="text-white bg-green-500 p-2 text-center font-medium">{success}</p>}

            <div className="flex flex-col mb-10">
                <Link to="/" className="text-gray-400 text-center underline">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default ResetPassword;