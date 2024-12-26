import { useState, useEffect } from "react";
import "./Dash.css"; // Importa el archivo de estilos
import Artists from "./Artists/Artists";
import Tracks from "./Tracks/tracks";

function Dash() {

    return (
        <div className="dashboard-container">
            <Artists />
            <Tracks />
        </div>
    );
}

export default Dash;
