import { useState, useEffect } from "react";
import "./Tracks.css"; // Importa el archivo de estilos

function Track() {
    const [tracksData, setTracksData] = useState(null); // Estado para almacenar los datos del perfil
    const [timeRange, setTimeRange] = useState("short_term"); // Estado para el rango de tiempo

    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    useEffect(() => {
        // Función para obtener el perfil del usuario
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${backendUrl}/user/tracks?time_range=${timeRange}`, {
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
        <div className="title-track-container mt-10 mr-4">
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
                    <div key={index} className="-mb-10 md:mb-0">
                        <iframe
                            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                            className="w-[280px] h-[150px] md:w-[350px] md:h-[170px]"
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

export default Track;
