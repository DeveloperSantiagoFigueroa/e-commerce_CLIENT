export const forgotPasswordFetch = async (data) => {
    const response = await fetch("https://e-commerce-server-stkl.onrender.com/api/auth/forgot-password", { // Asegúrate de que esta ruta es correcta
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");

    //  Evita error de JSON si la respuesta no es JSON
    if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
            const error = await response.json();
            throw new Error(error.msg || "Error desconocido.");
        } else {
            throw new Error("Error en el servidor, no es una respuesta válida.");
        }
    }

    return response.json();
};
