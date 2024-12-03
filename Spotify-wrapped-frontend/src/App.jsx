import { useState, useEffect } from "react";
import { redirectToSpotify, getAccessToken } from "./utils/authCodeWithPkce";

function App() {
    const [accessToken, setAccessToken] = useState(null); // Estado para almacenar el token de acceso

    useEffect(() => {
        // Paso 1: Verificar si ya hay un token almacenado
        const authenticate = async () => {
            const storedToken = sessionStorage.getItem("accesToken");
            if (storedToken) {
                console.log("Token recuperado de sessionStorage:", storedToken);
                setAccessToken(storedToken);
                return;
            }

            // Paso 2: Verificar si hay un "code" en la URL y un "codeVerifier" en el session.
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const codeVerifier = sessionStorage.getItem('codeVerifier');
            
            if (code && codeVerifier) {
                try {
                    // Paso 3: Intercambiar el "code" por un token
                    const token = await getAccessToken(code, codeVerifier);
                    console.log(token.access_token)
                    // Guardar el token en el estado y en sessionStorage
                    setAccessToken(token.access_token);
                    sessionStorage.setItem("accesToken", token.access_token);

                    // Paso 4: Limpiar la URL eliminando el parámetro "code"
                    window.history.replaceState({}, document.title, "/");
                } catch (error) {
                    console.error("Error al intercambiar el código por un token:", error);
                }
            } 
        };

        authenticate();
    }, []); // El array vacío asegura que esto solo se ejecute al montar el componente

    return (
        <>
            <h1>Spotify Login</h1>
            {accessToken ? (
                <p>Token obtenido: {accessToken}</p>
            ) : (
                <button
                    onClick={redirectToSpotify}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#1DB954",
                        border: "none",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "30px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                        alt="Spotify logo"
                        style={{ width: "20px", height: "20px", marginRight: "10px" }}
                    />
                    Continue with Spotify
                </button>
            )}
        </>
    );
}

export default App;
