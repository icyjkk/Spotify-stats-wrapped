import { useState, useEffect } from "react";
import "./Tracks.css"; // Importa el archivo de estilos

function Track() {
    const [tracksData, setTracksData] = useState(null); // Estado para almacenar los datos del perfil
    const [timeRange, setTimeRange] = useState("short_term"); // Estado para el rango de tiempo

    useEffect(() => {
        // Función para obtener el perfil del usuario
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3001/user/tracks?time_range=${timeRange}`, {
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
                setTracksData(data); // Almacena los datos del usuario en el estado
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchUserProfile(); // Llama a la función
    }, [timeRange]); // Solo se ejecuta una vez al montar el componente

    return (
        <div className="title-track-container">
            <div className="title-container">
                <p className="title-text">TOP 10 TRACKS</p>
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
            <div className="track-container">
                {tracksData && tracksData.items && tracksData.items.slice(0, 10).map((track, index) => (
                    <div className="">
                        <iframe
                            key={index} // Clave única para cada iframe
                            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                            width="350"
                            height="170"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        />
                    </div>

                ))}
            </div>
        </div>

    );
}

export default Track;
