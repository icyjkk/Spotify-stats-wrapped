import { useState, useEffect } from "react";
import "./Artists.css"; // Importa el archivo de estilos

function Artists() {
    const [artistsData, setArtistsData] = useState(null); // Estado para almacenar los datos del perfil
    const [timeRange, setTimeRange] = useState("short_term"); // Estado para el rango de tiempo

    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    useEffect(() => {
        // Función para obtener el perfil del usuario
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${backendUrl}/user/artists?time_range=${timeRange}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // Obtener el token del localStorage
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Error al obtener el perfil");
                }

                const data = await response.json();
                console.log(data)
                setArtistsData(data); // Almacena los datos del usuario en el estado
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchUserProfile(); // Llama a la función
    }, [timeRange]); // Solo se ejecuta una vez al montar el componente

    return (
        <div className="title-artist-container">
            <div className="title-container">
                <p className="title-text">TOP 10 ARTISTS</p>
                <select
                    className="time-range-select"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="short_term">Last 4 weeks</option>
                    <option value="medium_term">Last 6 months</option>
                    <option value="long_term">Lifetime</option>
                </select>
            </div>
            <div className="artists-container">
                {artistsData && artistsData.items && artistsData.items.slice(0, 10).map((artist, index) => (
                    <div key={index}>
                        <iframe
                            src={`https://open.spotify.com/embed/artist/${artist.id}?utm_source=generator`}
                            width="350"
                            height="170"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        />
                    </div>

                ))}
            </div>
        </div>

    );
}

export default Artists;
