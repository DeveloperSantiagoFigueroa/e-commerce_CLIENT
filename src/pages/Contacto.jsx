import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center md:mx-30 lg:mx-60">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📞 Contacto</h2>

      <p className="text-gray-600 mb-6">
        Si tienes preguntas o necesitas ayuda, envíanos un mensaje y te responderemos lo antes posible.
      </p>

      {submitted ? (
        <p className="text-green-600 text-center font-bold">¡Mensaje enviado con éxito! Te contactaremos pronto.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 font-semibold">Nombre</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Correo Electrónico</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tuemail@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Mensaje</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu mensaje aquí..."
              rows="4"
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Enviar Mensaje
          </button>
        </form>
      )}

      <div className="mt-8 text-center text-gray-600">
        <p><strong>Email:</strong> soporte@marketfree.com</p>
        <p><strong>Teléfono:</strong> +598 12 345 678</p>
        <p><strong>Horario:</strong> Lunes a Viernes - 9:00 AM a 6:00 PM</p>
      </div>
    </div>
  );
};

export default Contacto;
