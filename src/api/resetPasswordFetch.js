export const resetPasswordFetch = async ({ token, password }) => {
    console.log("🔹 Enviando solicitud con token:", token); // 👈 Verificar que el token es correcto
    try {
        const response = await fetch("https://e-commerce-server-stkl.onrender.com/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }), // 👈 Enviar token en el body
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.msg || "Error al restablecer la contraseña.");
        }

        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};
