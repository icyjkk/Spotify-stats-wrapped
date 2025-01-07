import { useState, useEffect } from "react";
import Artists from "./Artists/Artists";
import Tracks from "./Tracks/Tracks";
function Dash() {


    return (
        <div className="flex flex-col md:flex-row md:justify-center justify-start items-center h-screen overflow-y-auto bg-black ">
            <Artists />
            <Tracks />
        </div>
    );

}

export default Dash;
