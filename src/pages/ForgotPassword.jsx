import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPasswordFetch } from '../api/forgotPasswordFetch.js';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: '' });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setLoading(true);
  
      if (!emailRegex.test(formData.email)) {
          setError("El email no es válido");
          setLoading(false);
          return;
      }
  
      try {
          const res = await forgotPasswordFetch(formData);
          setSuccess(res.msg || "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
      } catch (err) {
          setError(err.message || "Error desconocido."); // ✅ Ahora se muestra el mensaje real del backend
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
                Reestablecer contraseña
            </h1>
            <hr className="text-white" />

            <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
                <div className="text-white flex flex-col gap-1">
                    <p className="font-medium z-10">Email:</p>
                    <input
                        type="email"
                        placeholder="tu@correo..."
                        value={formData.email}
                        name="email"
                        onChange={handleInputChange}
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
                    {loading ? 'Enviando...' : 'Enviar enlace'}
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

export default ForgotPassword;
