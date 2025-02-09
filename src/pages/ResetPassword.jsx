import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordFetch } from "../api/resetPasswordFetch.js";
import { AuthContext } from "../context/AuthContext.jsx"; // 👈 Importamos el contexto de autenticación

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // 👈 Usamos la función de login del contexto

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

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

            // 🔹 Guardamos el token en localStorage e iniciamos sesión automáticamente
            localStorage.setItem("token", token);
            login(token); // 👈 Llamamos a la función login del contexto

            setSuccess(res.msg || "Contraseña restablecida con éxito.");
            
            // 🔹 Redirigir a la página principal después de 2 segundos
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {
            setError(err.message || "Error al restablecer la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#1b1b51] to-[#761663] flex flex-col px-6 gap-5 md:px-50 lg:px-90 xl:px-120 h-screen w-full overflow-y-auto">
            <h1 className="mt-10 text-white font-medium text-center text-[35px] ">
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
                        className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all"
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
                        className="border-2 border-pink-600 px-2 py-1 w-full rounded-[5px] outline-none transition-all"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`text-white bg-pink-600 rounded-[5px] p-3 transition-all ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Procesando..." : "Restablecer Contraseña"}
                </button>
            </form>

            {error && <p className="text-white bg-red-500 p-2 text-center">{error}</p>}
            {success && <p className="text-white bg-green-500 p-2 text-center">{success}</p>}
        </div>
    );
};

export default ResetPassword;
