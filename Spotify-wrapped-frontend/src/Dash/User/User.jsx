import { useState, useEffect } from "react";
import "./User.css"; // Importa el archivo de estilos

function User() {
    const [userData, setUserData] = useState(null); // Estado para almacenar los datos del perfil

    useEffect(() => {
        // Función para obtener el perfil del usuario
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:3001/user/profile", {
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
                setUserData(data); // Almacena los datos del usuario en el estado
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchUserProfile(); // Llama a la función
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <div className="user-container">
            {userData && (
                <div className="user-details">
                    <img className="profile-image" src={userData.images[0].url} alt="User profile" />
                    <div className="text-container">
                        <h1 className="profile-name">{userData.display_name}</h1>
                        <p className="profile-email">{userData.email}</p>
                        <p className="profile-product">{userData.product.charAt(0).toUpperCase() + userData.product.slice(1)} user</p>
                        <div className="container">
                            <p className="profile-country">Country: {userData.country}</p>
                            <p className="profile-followers">Followers: {userData.followers.total}</p>
                        </div>
                    </div>
                    <a href={userData.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                            alt="Spotify logo"
                            className="logo"
                        />
                    </a>
                </div>
            )}
        </div>
    );
}

export default User;
