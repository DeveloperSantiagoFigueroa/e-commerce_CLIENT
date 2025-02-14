import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    addToCartFetch,
    removeFromCartFetch,
    clearCartFetch,
} from '../api/addToCartFetch';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, setCart } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    // ✅ Cargar carrito desde la API
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(
                    'http://localhost:5000/api/user/cart',
                    {
                        method: 'GET',
                        headers: { Authorization: token },
                    }
                );

                if (!response.ok)
                    throw new Error('Error al obtener el carrito');

                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    // 🔼🔽 **Actualizar cantidad en el carrito**
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await addToCartFetch(productId); // Se usa el mismo endpoint de agregar, la API debe manejar el incremento
            setCart(
                cart.map((item) =>
                    item.product._id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
        }
    };

    // ❌ **Eliminar un producto del carrito**
    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCartFetch(productId);
            setCart(cart.filter((item) => item.product._id !== productId));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    // 🗑 **Vaciar todo el carrito**
    const handleClearCart = async () => {
        try {
            await clearCartFetch();
            setCart([]); // Vacía el carrito en el estado
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    };

    // 💰 **Calcular total**
    const totalPrice = cart.reduce((acc, item) => {
        const price = parseFloat(item.product?.price) || 0;
        return acc + price * item.quantity;
    }, 0);

    if (loading) return <p className="text-center mt-6">Cargando carrito...</p>;

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-700">
                🛒 Mi Carrito
            </h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">
                    Tu carrito está vacío.
                </p>
            ) : (
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    {/* 📌 Lista de productos en el carrito */}
                    <div className="flex-grow">
                        {cart.map((item) => (
                            <div
                                key={item.product._id}
                                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                            >
                                {/* 📸 Imagen más grande en móviles */}
                                <img
                                    src={
                                        item.product.mainImage ||
                                        'https://placehold.co/120x120'
                                    }
                                    alt={item.product.name}
                                    className="w-24 h-24 sm:w-20 sm:h-20 object-contain rounded-md"
                                />

                                {/* 📌 Info del producto */}
                                <div className="flex flex-col items-center sm:items-start flex-grow sm:ml-4">
                                    <h4 className="text-lg font-semibold text-center sm:text-left">
                                        {item.product.name}
                                    </h4>
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        {item.product.price &&
                                        !isNaN(item.product.price)
                                            ? `$${parseFloat(
                                                  item.product.price
                                              ).toFixed(2)}`
                                            : 'Precio no disponible'}
                                    </p>
                                </div>

                                {/* 🔼🔽 Control de cantidad */}
                                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.product._id,
                                                item.quantity - 1
                                            )
                                        }
                                        className="bg-gray-300 px-3 py-2 rounded-md hover:bg-gray-400 transition text-lg"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 text-lg">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.product._id,
                                                item.quantity + 1
                                            )
                                        }
                                        className="bg-gray-300 px-3 py-2 rounded-md hover:bg-gray-400 transition text-lg"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* ❌ Botón de eliminar */}
                                <button
                                    onClick={() =>
                                        handleRemoveFromCart(item.product._id)
                                    }
                                    className="bg-red-500 md:ml-5 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-all mt-3 sm:mt-0"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* 📌 Resumen del pedido */}
                    <div className="w-full lg:w-[300px] bg-gray-200 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800">
                            Resumen
                        </h2>
                        <hr className="my-3" />

                        {/* 📌 Lista de productos en el resumen */}
                        <div className="mt-3 space-y-2">
                            {cart.map((item) => (
                                <div
                                    key={item.product._id}
                                    className="flex justify-between text-sm"
                                >
                                    <span className="text-gray-700">
                                        {item.product.name} x {item.quantity}
                                    </span>
                                    <span className="font-semibold">
                                        $
                                        {item.product.price
                                            ? (
                                                  parseFloat(
                                                      item.product.price
                                                  ) * item.quantity
                                              ).toFixed(2)
                                            : '0.00'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <hr className="my-3" />

                        {/* 💰 Subtotal Final */}
                        <div className="mt-3 flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        {/* ✅ Botón para pagar */}
                        <Link to='/pagar' className="block text-center mt-4 font-bold text-white bg-green-500 px-3 py-2 w-full rounded-lg hover:bg-green-600 transition-all">
                            Proceder al Pago
                        </Link>

                        {/* 🗑 Botón para vaciar carrito */}
                        <button
                            onClick={handleClearCart}
                            className="mt-2 font-bold text-white bg-red-500 px-3 py-2 w-full rounded-lg hover:bg-red-600 transition-all"
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
