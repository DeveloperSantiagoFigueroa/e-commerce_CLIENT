import React from 'react';

const Help = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🛠️ Ayuda y Soporte</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">📌 ¿Cómo comprar?</h3>
        <p className="text-gray-600 mt-2">
          1. Navega por las categorías o usa la barra de búsqueda.<br />
          2. Agrega los productos al carrito.<br />
          3. Procede al pago y completa los datos requeridos.<br />
          4. Recibirás la confirmación de tu compra en tu correo.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">🛒 ¿Cómo usar el carrito?</h3>
        <p className="text-gray-600 mt-2">
          - Puedes ver los productos agregados en la página del carrito.<br />
          - Ajusta las cantidades o elimina productos antes de pagar.<br />
          - El precio total se actualizará automáticamente.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">⭐ ¿Cómo agregar favoritos?</h3>
        <p className="text-gray-600 mt-2">
          - Haz clic en el ícono de corazón en la tarjeta del producto.<br />
          - Los productos guardados estarán en la sección "Favoritos".
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">📦 Opciones de envío</h3>
        <p className="text-gray-600 mt-2">
          - Puedes elegir "Envío a domicilio" e ingresar tu dirección.<br />
          - O seleccionar "Retiro en sucursal" si prefieres recogerlo.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">💳 Métodos de pago</h3>
        <p className="text-gray-600 mt-2">
          - Aceptamos tarjetas de crédito y débito.<br />
          - Todos los pagos son simulados para fines de prueba.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">📞 Contacto y soporte</h3>
        <p className="text-gray-600 mt-2">
          - Si tienes dudas o problemas, contáctanos en nuestro soporte.<br />
          - Responderemos lo más rápido posible.
        </p>
      </section>
    </div>
  );
};

export default Help;
