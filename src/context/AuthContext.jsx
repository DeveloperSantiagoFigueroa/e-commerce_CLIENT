import { createContext, useEffect, useState } from 'react';
import { getMeFetch } from '../api/getMeFetch';
import { addFavouriteFetch, getFavoritesFetch } from '../api/getFavoritesFetch';
import { addToCartFetch } from '../api/addToCartFetch';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]); // ✅ Agregamos estado de favoritos
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

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
                setFavorites(user.favorites || []); // ✅ Cargamos los favoritos del usuario
                setCart(userData.cart || []);
            } catch (err) {
                console.log('❌ Error al obtener usuario:', err);
                localStorage.removeItem('token'); // ✅ Si el token es inválido, lo borramos
                setUser(null);
            }

            setLoading(false);
        })();
    }, []);

    // ✅ Actualizar favoritos en tiempo real
    const toggleFavorite = async (productId) => {
        try {
            const response = await addFavouriteFetch(productId);
            setFavorites(response.favorites); // ✅ Sincroniza con la respuesta del backend
        } catch (err) {
            console.error('Error al actualizar favoritos:', err);
        }
    };

    const addToCart = async (productId) => {
        try {
            const updatedCart = await addToCartFetch(productId);
            setCart(updatedCart.cart); // ✅ Actualiza el estado del carrito
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };

    // ✅ Login: actualiza `user` y `favorites`
    const login = async (token) => {
        try {
            const userData = await getMeFetch(token);
            setUser(userData);
            setFavorites(userData.favorites || []); // ✅ También cargamos los favoritos
            localStorage.setItem('token', token);
        } catch (err) {
            console.log('Error al obtener usuario:', err);
        }
    };

    const logout = () => {
        setUser(null);
        setFavorites([]); // ✅ Reseteamos favoritos al cerrar sesión
        localStorage.clear();
    };

    const data = {
        user,
        setUser,
        favorites,
        setFavorites,
        toggleFavorite, // ✅ Agregamos la función de favoritos
        login,
        logout,
        cart,
        setCart,
        addToCart,
    };

    if (loading) return null;
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
