import { useState, useEffect } from "react";
import "./Dash.css"; // Importa el archivo de estilos
import User from "./User/User";

function Dash() {

    return (
        <div className="dashboard-container">
                <User></User>   
        </div>
    );
}

export default Dash;
