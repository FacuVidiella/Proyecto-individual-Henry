import React from "react";
import { Link } from "react-router-dom";



export function LandingPage(){
    return (
        <div className='landing'>
            <img src='./videogame.png' alt='backgroundImage'/>
            <h1>Welcome to my page</h1>
            <button><Link to='/videogames'>Home page</Link></button>
        </div>

    )
}

export default LandingPage;