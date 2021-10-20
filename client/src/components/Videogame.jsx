import React from "react";

function Game({img, name, genres}){
    return(
        <div>
            <h2>{name}</h2>
            <h5>{genres}</h5>
            <img src={img} alt='img not found' width = '200px' height= '200px'/>

        </div>
    );
};

export default Game;