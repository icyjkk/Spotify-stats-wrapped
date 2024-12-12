import { useState, useEffect } from "react";
import { redirectToSpotify, getAccessToken } from "./authCode";
import { useNavigate } from "react-router-dom";
import "./AuthHandler.css"; // Importa el archivo de estilos

function AuthHandler() {
    const [accessToken, setAccessToken] = useState(false); // Estado para almacenar el token de acceso
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            const storedToken = sessionStorage.getItem("accesToken");
            if (storedToken) {
                console.log("Token recuperado de sessionStorage:", storedToken);
                setAccessToken(true);
                return;
            }

            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const codeVerifier = sessionStorage.getItem("codeVerifier");

            if (code && codeVerifier) {
                try {
                    const token = await getAccessToken(code, codeVerifier);
                    console.log(token.access_token);
                    sessionStorage.setItem("accesToken", token.access_token);
                    setAccessToken(true);
                } catch (error) {
                    console.error("Error al intercambiar el código por un token:", error);
                }
            }
        };

        authenticate();
    }, []);

    // Efecto secundario para redirigir al dashboard si hay un token
    useEffect(() => {
        if (accessToken) {
            navigate("/dashboard");
        }
    }, [accessToken, navigate]);

    return (
        <div className="login-container">
            {!accessToken && (
                <button onClick={redirectToSpotify} className="spotify-button">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                        alt="Spotify logo"
                        className="spotify-logo"
                    />
                    Continue with Spotify
                </button>
            )}
        </div>
    );
}

export default AuthHandler;
