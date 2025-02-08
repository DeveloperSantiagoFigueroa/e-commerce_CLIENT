import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { getMeFetch } from '../api/getMeFetch';
export const AuthContext = createContext();

//

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const user = await getMeFetch(token);
                setUser(user);
            } catch (err) {
                console.log("❌ Error al obtener usuario:", err);
                localStorage.removeItem("token"); // ✅ Si el token es inválido, lo borramos
                setUser(null);
            }

            setLoading(false);
        })();
    }, []);
    // Login
    const login = async (token) => {
        try {
            const userData = await getMeFetch(token); // ✅ Obtiene los datos del usuario
            setUser(userData);
            localStorage.setItem('token', token);
        } catch (err) {
            console.log('Error al obtener usuario:', err);
        }
    };

    const logout = () => {
        setUser(false);
        localStorage.clear();
    };

    // Los datos para utilizar en todo el sitio web
    const data = {
        user,
        setUser,
        login,
        logout,
    };

    if (loading) return null;
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
