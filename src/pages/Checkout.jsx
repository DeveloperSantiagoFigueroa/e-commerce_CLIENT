import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
    const { cart, clearCart } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [shippingMethod, setShippingMethod] = useState("pickup");
    const [formData, setFormData] = useState({
        fullName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        address: ""
    });

    //  Calc total
    const totalPrice = cart.reduce((acc, item) => acc + (parseFloat(item.product?.price) || 0) * item.quantity, 0);

    // Validaciones regex para el form
    const validateForm = () => {
        let newErrors = {};

        if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
            newErrors.fullName = "Nombre inválido (solo letras y espacios)";
        }

        if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
            newErrors.cardNumber = "Número de tarjeta inválido (16 dígitos)";
        }

        if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = "Formato inválido (MM/YY)";
        }

        if (!/^\d{3}$/.test(formData.cvv)) {
            newErrors.cvv = "CVV inválido (3 dígitos)";
        }

        if (shippingMethod === "home" && formData.address.trim().length < 5) {
            newErrors.address = "Ingresa una dirección válida";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejo de cambios en los inputs
    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "cardNumber") {
            value = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
        }

        if (name === "expiry") {
            value = value.replace(/\D/g, "");
            if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
        }

        setFormData({ ...formData, [name]: value });
    };

    // Simulacion de pago
    const handlePayment = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setLoading(true);
        setTimeout(() => {
            setPaymentStatus("success");
            alert("Pago realizado con éxito ✅");
            clearCart();
            setLoading(false);
        }, 2000);
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
                    💳 Pago con tarjeta
                </h2>

                <form onSubmit={handlePayment} className="flex flex-col gap-4">
                    <div>
                        <label className="text-gray-700 font-semibold">Nombre completo del titular</label>
                        <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Ej: Juan Pérez"
                            required
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold">Número de tarjeta</label>
                        <input 
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            maxLength="19"
                            className={`w-full border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="0000 0000 0000 0000"
                            required
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="text-gray-700 font-semibold">Expiración</label>
                            <input 
                                type="text" 
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                maxLength="5"
                                className={`w-full border ${errors.expiry ? "border-red-500" : "border-gray-300"} rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="MM/YY"
                                required
                            />
                            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                        </div>

                        <div className="w-1/2">
                            <label className="text-gray-700 font-semibold">CVV</label>
                            <input 
                                type="text" 
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                maxLength="3"
                                className={`w-full border ${errors.cvv ? "border-red-500" : "border-gray-300"} rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="123"
                                required
                            />
                            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                        </div>
                    </div>

                    {/* Opciones de envío */}
                    <div>
                        <label className="text-gray-700 font-semibold">Método de envío</label>
                        <div className="flex gap-4 mt-2">
                            <button 
                                type="button"
                                className={`w-1/2 p-2 rounded-lg border ${shippingMethod === "home" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                onClick={() => setShippingMethod("home")}
                            >
                                Envío a domicilio
                            </button>
                            <button 
                                type="button"
                                className={`w-1/2 p-2 rounded-lg border ${shippingMethod === "pickup" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                onClick={() => setShippingMethod("pickup")}
                            >
                                Retiro en sucursal
                            </button>
                        </div>
                    </div>

                    {shippingMethod === "home" && (
                        <div>
                            <label className="text-gray-700 font-semibold">Dirección de envío</label>
                            <input 
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej: Calle 123, Ciudad"
                                required
                            />
                        </div>
                    )}

                    {/* **Resumen de compra** */}
                    <div className="bg-gray-200 p-4 rounded-lg mt-4">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">🛒 Resumen del pedido</h3>
                        {cart.map((item) => (
                            <p key={item.product._id}>{item.product.name} x{item.quantity} - ${item.product.price * item.quantity}</p>
                        ))}
                        <hr className="my-2" />
                        <p className="font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>
                    </div>

                    <button type="submit" className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all">
                        {loading ? "Procesando pago..." : "Pagar"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
