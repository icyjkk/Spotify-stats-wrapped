import { useState, useEffect } from "react";
import { redirectToSpotify, getAccessToken } from "./authCode";
import { useNavigate } from "react-router-dom";

function AuthHandler() {
    const [accessToken, setAccessToken] = useState(false); // Estado para almacenar el token de acceso
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            const storedToken = sessionStorage.getItem("accessToken");
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
                    sessionStorage.setItem("accessToken", token.access_token);
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
        <div className="flex justify-center items-center h-screen bg-blacks">
            {!accessToken && (
                <button onClick={redirectToSpotify} className="flex items-center justify-center bg-black text-white p-2 rounded-3xl font-medium text-lg cursor-pointer">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                        alt="Spotify logo"
                        className="w-8 h-8 mr-2"
                    />
                    Continue with Spotify
                </button>
            )}
        </div>
    );
}

export default AuthHandler;
